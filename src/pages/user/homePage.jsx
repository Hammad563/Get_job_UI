import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Chip, Input } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { Menu, Transition, Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  BriefcaseIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  LinkIcon,
  MapPinIcon,
  PencilIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";
import { jobFeed, searchJobs } from "../../services/userServices";
import {
  createMarkup,
  date_formater,
  salaryHelper,
} from "../../helpers/componentHelpers";
import Pagination from "react-js-pagination";
import "./paginate.css";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const HomePage = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);

  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const [jobSelected, setJobSelected] = useState(null);
  const [searchResult, setSearchResult] = useState({ success: true, msg: "" });
  const [open, setOpen] = useState(false);

  // pagination
  const [totalJobCount, setTotalJobCount] = useState(0);
  // hits per page
  const [jobsPerPage] = useState(2);
  // number of pages
  const totalPages = Math.ceil(totalJobCount / jobsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    setCurrentPage(pageNumber);
    if (value && value.length > 0) {
      onSearch(pageNumber);
    } else {
      recentSearchFeed(pageNumber);
    }
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onSearch = async (pageNumber) => {
    // api to fetch search result
    let res = await searchJobs(
      dispatch,
      value,
      pageNumber ? pageNumber : currentPage
    );
    if (res) {
      if (res.jobs && res.jobs.length > 0) {
        setData(res.jobs);
        setTotalJobCount(res.count);
        setSearchResult({
          success: true,
          msg: "",
        });
        localStorage.setItem("recent_search", value);
      } else {
        setSearchResult({
          success: false,
          msg: "Could not find any results for your search",
        });
      }
    } else {
      setSearchResult({ success: false, msg: "Error fetching results" });
    }
  };

  const recentSearchFeed = async (pageNumber) => {
    let recentSearch = localStorage.getItem("recent_search");
    if (!recentSearch)
      return setSearchResult({
        success: false,
        msg: "Start searching for jobs!",
      });
    let res = await jobFeed(
      dispatch,
      recentSearch,
      pageNumber ? pageNumber : currentPage
    );
    if (res) {
      if (res.jobs && res.jobs.length > 0) {
        setData(res.jobs);
        setTotalJobCount(res.count);
        setSearchResult({
          success: true,
          msg: "Jobs based on your recent searches",
        });
      } else {
        setSearchResult({
          success: false,
          msg: "Could not find any results for your search",
        });
      }
    }
  };

  useEffect(() => {
    recentSearchFeed();
  }, []);

  console.log("data", data);

  return (
    <>
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className=" bg-white px-1 py-2 sm:p-3 mb-5">
          <div className="grid grid-cols-2 justify-between">
            <div className="grid">
              <input
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Job title, keywords"
                id="simple-search"
                type="text"
                value={value}
                onChange={onChange}
              />
            </div>
            <div className="grid">
              <button
                onClick={onSearch}
                className=" justify-self-end flex w-fit items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Find Jobs
              </button>
            </div>
          </div>
        </div>
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                  <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <Dialog.Panel className="pointer-events-auto relative w-screen max-w-4xl">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                          <button
                            type="button"
                            className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </Transition.Child>
                      <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                        <div className="px-4 sm:px-6">
                          <Dialog.Title className="text-xl font-bold text-gray-900">
                            {jobSelected && jobSelected.title}
                          </Dialog.Title>
                          <h3 className="text-md font-medium text-gray-700">
                            {jobSelected && jobSelected.company.name}
                          </h3>
                        </div>
                        <div className="relative mt-0 flex-1 px-4 sm:px-6">
                          {jobSelected && (
                            <>
                              <div className="mx-auto max-w-4xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
                                <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                                  <div className=" bg-white px-1 py-2 sm:p-3">
                                    <div className="grid grid-cols-2 ">
                                      <p className="text-base text-gray-900">
                                        {jobSelected.remote ? "Remote" : null}
                                      </p>
                                    </div>
                                  </div>
                                  <div className=" bg-white px-1 py-2 sm:p-3">
                                    <div className="grid grid-cols-2 ">
                                      {jobSelected.current_job_type}
                                    </div>
                                  </div>
                                  <div className=" bg-white px-1 py-2 sm:p-3">
                                    <div className="grid grid-cols-3 ">
                                      {jobSelected.location_query}
                                    </div>
                                  </div>
                                  <div className=" bg-white px-1 py-2 sm:p-3">
                                    <div className="grid grid-cols-3 ">
                                      <p className="text-base text-gray-900">
                                        {salaryHelper(jobSelected.salary_range)}
                                      </p>
                                    </div>
                                  </div>
                                  <div className=" bg-white px-1 py-2 sm:p-3">
                                    <div className="grid grid-cols-3 ">
                                      <p className="text-base text-gray-900">
                                        {jobSelected.experience}+ years
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* Options */}
                                <div className="mt-4 lg:row-span-3 lg:mt-0">
                                  <h2 className="sr-only">
                                    Product information
                                  </h2>
                                  <p className="text-3xl tracking-tight text-gray-900">
                                    {jobSelected.price}
                                  </p>

                                  {/* Reviews */}
                                  <div className="mt-6">
                                    <h3 className="">Number of applicants</h3>
                                    <div className="flex items-center">
                                      <p className="">10 applicants</p>
                                    </div>
                                  </div>

                                  <form className="mt-10">
                                    {/* Colors */}
                                    <h3 className="">Set Job Status</h3>

                                    <button
                                      type="submit"
                                      className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                      Apply
                                    </button>
                                  </form>
                                </div>

                                <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
                                  {/* Description and details */}
                                  <div>
                                    <h3 className="sr-only">Description</h3>

                                    <div className="space-y-6">
                                      <p className="text-base text-gray-900">
                                        <span
                                          dangerouslySetInnerHTML={createMarkup(
                                            jobSelected.description
                                          )}
                                        ></span>
                                      </p>
                                    </div>
                                  </div>

                                  <div className="mt-10">
                                    <h3 className="text-xl font-bold font-lg text-gray-900">
                                      Required qualifications and skills
                                    </h3>
                                    <div className="mt-4">
                                      <ul class="list-disc">
                                        {jobSelected.job_q &&
                                          jobSelected.job_q.map((item) => {
                                            return <li>{item}</li>;
                                          })}
                                      </ul>
                                    </div>
                                  </div>

                                  <div className="mt-10">
                                    <h2 className="text-xl font-bold font-lg text-gray-900">
                                      Benefits
                                    </h2>

                                    <div className="mt-4 space-y-6">
                                      {jobSelected.benefits.map((item) => {
                                        return (
                                          <Chip
                                            className="ml-2"
                                            value={item}
                                            color="gray"
                                          ></Chip>
                                        );
                                      })}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
        <>
          {searchResult && searchResult.success ? (
            <>
              {searchResult.msg && <h3>{searchResult.msg}</h3>}
              {data &&
                data.length > 0 &&
                data.map((j) => {
                  return (
                    <>
                      <div className="mb-8 lg:flex lg:items-center lg:justify-between divide-y py-2 px-2 border-2 rounded-md">
                        <div className="min-w-0 flex-1 ">
                          <h2 className="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-xl sm:tracking-tight ">
                            {j.company_name}
                          </h2>
                          <h4 className="text-xl  leading-4 text-gray-700 sm:truncate sm:text-xl sm:tracking-tight ">
                            {j.title}
                          </h4>
                          <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                              <BriefcaseIcon
                                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                aria-hidden="true"
                              />
                              {j.current_job_type}
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                              <MapPinIcon
                                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                aria-hidden="true"
                              />
                              {j.remote ? "Remote" : j.location_query}
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                              <CurrencyDollarIcon
                                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                aria-hidden="true"
                              />
                              {salaryHelper(j.salary_range)
                                ? salaryHelper(j.salary_range)
                                : "Not Provided"}
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                              <CalendarIcon
                                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                aria-hidden="true"
                              />
                              Posted on{" "}
                              {date_formater(j.created_on, "date_only")}
                            </div>
                          </div>
                        </div>
                        <div className="mt-5 flex lg:mt-0 lg:ml-4">
                          <span className="hidden sm:block"></span>
                          <span className="sm:ml-3">
                            <button
                              type="button"
                              className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              onClick={() => {
                                setJobSelected(j);
                                setOpen(true);
                              }}
                            >
                              <ChevronRightIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
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
                                      <ChevronRightIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </a>
                                  )}
                                </Menu.Item>
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        </div>
                      </div>
                    </>
                  );
                })}
            </>
          ) : (
            searchResult.msg
          )}
        </>

        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">2</span> of{" "}
                <span className="font-medium">{totalJobCount}</span> results
              </p>

              <Pagination
                activePage={currentPage}
                itemsCountPerPage={2}
                totalItemsCount={totalJobCount}
                pageRangeDisplayed={totalPages}
                onChange={handlePageChange}
                firstPageText={"First"}
                lastPageText={"Last"}
                prevPageText={"Prev"}
                nextPageText={"Next"}
                breakClassName={"page"}
                nextLinkClassName={"page"}
                disabledClass={"disabled"}
                activeClass={"active"}
                itemClass={"page"}
                innerClass={"container"}
              />
            </div>
            <div className=""></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
