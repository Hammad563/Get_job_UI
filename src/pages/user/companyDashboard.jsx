import { useSelector, useDispatch } from "react-redux";
import CompanyHeader from "../../components/companyDashboardHeader";
import { Fragment } from "react";
import {
  BriefcaseIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  LinkIcon,
  MapPinIcon,
  PencilIcon,
} from "@heroicons/react/20/solid";
import { Menu, Transition, Dialog } from "@headlessui/react";
import { useState, useRef, useEffect } from "react";
import {
  Button,
  Checkbox,
  Input,
  Option,
  Textarea,
  Chip
} from "@material-tailwind/react";
import Select from "react-select";
import { createJob, fetchCompanyJobs } from "../../services/companyServices";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import RichTextEditor from "../../components/richTextEditor";


const jobTypeOptions = [
  { label: "Full Time", value: "Full Time" },
  { label: "Part Time", value: "Part Time" },
  { label: "Internship", value: "Co_op" },
  { label: "On Call", value: "On_call" },
];

const benefitOptions = [
  { label: "Pension", value: "Pension" },
  { label: "Dental Care", value: "Dental Care" },
  { label: "Health Care", value: "Health Care" },
  { label: "Vision Care", value: "Vision Care" },
  { label: "401k", value: "401k" },
  { label: "Casual dress", value: "Casual dress" },
  { label: "Flexible", value: "Flexible" },
  { label: "Paid Time Off", value: "Paid Time Off" },
  { label: "RRSP Match", value: "RRSP Match" },
];

const expOptions = [
  { label: "No experience required", value: "0" },
  { label: "1+ years", value: 1 },
  { label: "2+ years", value: 2 },
  { label: "3+ years", value: 3 },
  { label: "4+ years", value: 4 },
  { label: "5+ years", value: 5 },
  { label: "10+ years", value: 10 },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const CompanyDashboard = () => {
  const dispatch = useDispatch();
  const cancelButtonRef = useRef(null);
  let { id } = useParams();
  const currentUser = useSelector((state) => state.auth.user);

  const [allJobs, setAllJobs] = useState(null);

  const [postJob, setPostJob] = useState(false);
  const [title, setTitle] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [country, setCountry] = useState(null);
  const [jobType, setjobType] = useState("");
  const [remote, setRemote] = useState(false);
  const [hireInCountry, setHireInCountry] = useState(false);
  const [exp, setExp] = useState(null);
  const [description, setDescription] = useState(null);
  const [query, setQuery] = useState("");
  const [refVisible, setRefVisible] = useState(false);
  const [fromSalary, setFromSalary] = useState(false);
  const [endSalary, setEndSalary] = useState(false);
  const [benefits, setBenefits] = useState([]);
  const [q, setJobQ] = useState("");
  const [qualifications, setQualifications] = useState([]);

  const addItem = (e) => {
    e.preventDefault()
    if (q) {
      setQualifications(qualifications, qualifications.push(q));
      setJobQ("");
    }
  }

  function deleteItem(e, val) {
    e.preventDefault();
    const name = val;
    setQualifications(
      qualifications.filter(function (item) {
        return item !== name;
      })
    );
  }

  const autoCompleteRef = useRef(null);
  let autoComplete;
  const loadScript = (url, callback) => {
    let script = document.createElement("script");
    script.type = "text/javascript";

    if (script.readyState) {
      script.onreadystatechange = function () {
        if (
          script.readyState === "loaded" ||
          script.readyState === "complete"
        ) {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      script.onload = () => callback();
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  };
  function handleScriptLoad(updateQuery, autoCompleteRef) {
    console.log("autocompleteref", autoCompleteRef);
    autoComplete = new window.google.maps.places.Autocomplete(
      autoCompleteRef.current,
      { types: ["(cities)"], componentRestrictions: { country: "ca" } }
    );
    autoComplete.setFields(["address_components", "formatted_address"]);
    autoComplete.addListener("place_changed", () =>
      handlePlaceSelect(updateQuery)
    );
  }

  async function handlePlaceSelect(updateQuery) {
    const addressObject = autoComplete.getPlace();
    const address = addressObject.address_components;
    for (const component of address) {
      const componentType = component.types[0];
      switch (componentType) {
        case "locality":
          setCity(component.long_name);
          break;
        case "administrative_area_level_1": {
          setState(component.short_name);
          break;
        }
        case "country": {
          setCountry(component.short_name);
        }
      }
    }

    const query = addressObject.formatted_address;
    updateQuery(query);
  }

  useEffect(() => {
    if (!refVisible) {
      return;
    }
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=AIzaSyCw-diwM8wvqk_d0JA5irKxCI3A62AVJsY&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef)
    );
  }, [refVisible]);

  const handleJobTypeChange = (selected) => {
    setjobType(selected.value);
  };
  const handleYrsOfExperience = (selected) => {
    setExp(selected.value);
  };

  const handleBenefitChange = (selected) => {
    const newValuesArr = selected ? selected.map((item) => item.value) : [];
    setBenefits(newValuesArr);
  };

  const fetchCompanyJobsAsync = async () => {
    let res = await fetchCompanyJobs(dispatch, id);
    if (res) {
      console.log("res", res);
      setAllJobs(res);
    }
  };
  useEffect(() => {
    fetchCompanyJobsAsync();
  }, []);
  const createNewJobAsync = async () => {
    let salary_data = []
    if(endSalary > 1){
      salary_data = [fromSalary, endSalary]
    }
    else if (fromSalary > 1){
      salary_data = [fromSalary]
    }else{
      salary_data = []
    }
     
    let res = await createJob(
      dispatch,
      id,
      title,
      city,
      state,
      country,
      query,
      jobType,
      exp,
      description,
      remote,
      hireInCountry,
      benefits,
      qualifications,
      salary_data
    );
    if (res) {
      console.log("res", res);
      setPostJob(false);
    }
  };

  console.log("benefeits", benefits);
  console.log("qualifcitons", qualifications)
  console.log("fromsalary", fromSalary)
  console.log("endSalary", endSalary)

  return (
    <>
      <CompanyHeader setPostJob={setPostJob}></CompanyHeader>
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <Transition.Root show={postJob} as={Fragment}>
          <Dialog
            as="div"
            className="relative mx-auto max-w-7xl z-50"
            initialFocus={cancelButtonRef}
            onClose={setPostJob}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                      <div className="mt-5 md:col-span-2 md:mt-0">
                        <form>
                          <div className="shadow  sm:rounded-md">
                            <div className="space-y-4 bg-white px-4 py-6 sm:p-6">
                              <div className="grid grid-cols-3 gap-6">
                                <div className="col-span-2 sm:col-span-2">
                                  <Input
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title}
                                    type="name"
                                    label="Job Title"
                                  ></Input>
                                </div>
                              </div>
                            </div>
                            <div className="space-y-4 bg-white px-4 py-6 sm:p-6">
                              <div className="grid grid-cols-3 gap-6">
                                <div className="col-span-2 sm:col-span-2">
                                  <input
                                    ref={(el) => {
                                      autoCompleteRef.current = el;
                                      setRefVisible(!!el);
                                    }}
                                    onChange={(event) =>
                                      setQuery(event.target.value)
                                    }
                                    placeholder="Where are you based?"
                                    value={query}
                                  ></input>
                                </div>
                              </div>
                            </div>
                            <div className="space-y-4 bg-white px-4 py-6 sm:p-6">
                              <div className="grid grid-cols-2 gap-6">
                                <div className="grid">
                                  <label
                                    htmlFor="jobType"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Job Type
                                  </label>
                                  <Select
                                    defaultValue={jobType}
                                    onChange={handleJobTypeChange}
                                    name="jobType"
                                    className="basic-multi-select"
                                    options={jobTypeOptions}
                                  />
                                </div>

                                <div className="grid">
                                  <label
                                    htmlFor="experience"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Years of experience
                                  </label>
                                  <Select
                                    defaultValue={exp}
                                    onChange={handleYrsOfExperience}
                                    name="experience"
                                    className="basic-multi-select"
                                    options={expOptions}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="space-y-5 bg-white px-6 py-6 sm:p-6">
                              <div className="col-span-3 sm:col-span-3">
                                <label
                                  htmlFor="description"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Job Description
                                </label>
                                <RichTextEditor
                                  onChange={setDescription}
                                  defaultValue={""}
                                  placeholder={
                                    "Please enter the description of the job, including duties and more about the job"
                                  }
                                />
                              </div>
                            </div>

                            <div className="space-y-5 bg-white px-6 py-6 sm:p-6">
                              <div className="grid grid-cols-2 gap-3">
                                <div className="grid">
                                  <label
                                    htmlFor="Qualifications"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Job Qualifications
                                  </label>
                                  <Input
                                    onChange={(e) => setJobQ(e.target.value)}
                                    value={q}
                                    type="Qualifications"
                                    label="Qualifications"
                                  ></Input>
                                </div>
                                <div className="grid text-center ">
                                  <button
                                    onClick={ (e) => addItem(e)}
                                    className="block px-4 py-2 text-sm text-gray-700"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="w-6 h-6"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 4.5v15m7.5-7.5h-15"
                                      />
                                    </svg>
                                  </button>
                                </div>
                                  <div class="grid">
                                    { 
                                      qualifications.length > 0 && qualifications.map( (item) => {
                                        return(
                                          <div class="bg-white px-4 py-2 sm:p-6"> 
                                              <Chip variant="gradient" value={item}
                                              dismissible={{
                                                onClose: (e) => deleteItem(e,item),
                                              }}
                                              >
                                              </Chip>

                                          </div>
                                        )
                                      })
                                    }
                                  </div>

                              </div>
                            </div>
                            <div className="space-y-4 bg-white px-4 py-6 sm:p-6">
                              <div className="grid grid-cols-2 gap-6">
                                <div className="grid">
                                  <label
                                    htmlFor="salaryFrom"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    From Salary $
                                  </label>
                                  <Input
                                    onChange={(e) =>
                                      setFromSalary(e.target.value)
                                    }
                                    value={fromSalary}
                                    type="number"
                                    label="From"
                                  ></Input>
                                </div>
                                <div className="grid">
                                  <label
                                    htmlFor="endSalary"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    End Salary $
                                  </label>
                                  <Input
                                    onChange={(e) =>
                                      setEndSalary(e.target.value)
                                    }
                                    value={endSalary}
                                    type="number"
                                    label="Max"
                                  ></Input>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-2 bg-white px-4 py-6 sm:p-6">
                              <div className="grid grid-cols-1 gap-6">
                                <div className="grid">
                                  <label
                                    htmlFor="benefits"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Benefits
                                  </label>
                                  <Select
                                    defaultValue={benefits}
                                    onChange={handleBenefitChange}
                                    name="Benefits"
                                    className="basic-multi-select"
                                    isMulti
                                    options={benefitOptions}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="space-y-2 bg-white px-4 py-6 sm:p-6">
                              <div className="grid grid-cols-2 gap-6">
                                <Checkbox
                                  id="remote"
                                  onChange={() => setRemote(!remote)}
                                  value={remote}
                                  label="Is this job Remote?"
                                />
                              </div>

                              <Checkbox
                                name="hireInCountry"
                                onChange={() =>
                                  setHireInCountry(!hireInCountry)
                                }
                                value={hireInCountry}
                                label="Accept applicants only from country specified?"
                              />
                            </div>

                            <div className="space-y-2 bg-white px-4 py-6 sm:p-6">
                              <div className="grid grid-cols-3 gap-6">
                                <div className="col-span-2 sm:col-span-2"></div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-sky-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={createNewJobAsync}
                      >
                        Post Job in Queue
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => setPostJob(false)}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
        {allJobs
          ? allJobs.length > 0
            ? allJobs.map((job) => {
                return (
                  <>
                    <Link to={`${job.id}`} state={{ job: job }}>
                      <div className="mb-8 lg:flex lg:items-center lg:justify-between divide-y py-2 px-2 border-2 rounded-md">
                        <div className="min-w-0 flex-1 ">
                          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight ">
                            {job.title}
                          </h2>
                          <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                              <BriefcaseIcon
                                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                aria-hidden="true"
                              />
                              {job.current_job_type}
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                              <MapPinIcon
                                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                aria-hidden="true"
                              />
                              {job.remote ? "Remote" : job.location_query}
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                              <CurrencyDollarIcon
                                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                aria-hidden="true"
                              />
                              $120k &ndash; $140k
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                              <CalendarIcon
                                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                aria-hidden="true"
                              />
                              Created on{" "}
                              {moment(job.created_at).format(
                                "YYYY/MM/DD, h:mm a"
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="mt-5 flex lg:mt-0 lg:ml-4">
                          <span className="hidden sm:block">
                            <button
                              type="button"
                              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                              <PencilIcon
                                className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                                aria-hidden="true"
                              />
                              Delete
                            </button>
                          </span>
                          <span className="sm:ml-3">
                            <button
                              type="button"
                              className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                              <CheckIcon
                                className="-ml-1 mr-2 h-5 w-5"
                                aria-hidden="true"
                              />
                              Publish
                            </button>
                          </span>
                          {/* Dropdown */}
                          <Menu as="div" className="relative ml-3 sm:hidden">
                            <Menu.Button className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                              More
                              <ChevronDownIcon
                                className="-mr-1 ml-2 h-5 w-5 text-gray-500"
                                aria-hidden="true"
                              />
                            </Menu.Button>

                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-200"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="absolute right-0 z-10 mt-2 -mr-1 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <Menu.Item>
                                  {({ active }) => (
                                    <a
                                      href="#"
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700"
                                      )}
                                    >
                                      Edit
                                    </a>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <a
                                      href="#"
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700"
                                      )}
                                    >
                                      View
                                    </a>
                                  )}
                                </Menu.Item>
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        </div>
                      </div>
                    </Link>
                  </>
                );
              })
            : "You have no active jobs published right now."
          : "Loading"}
      </div>
    </>
  );
};

export default CompanyDashboard;
