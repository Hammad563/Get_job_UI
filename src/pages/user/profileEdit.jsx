import { Button, Input, Option, Textarea } from "@material-tailwind/react";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProfileHeader from "../../components/profileHeader";
import { roles as roleOptions, experience } from "../../helpers/roles";
import Select from "react-select";
import {
  addExperience,
  deleteWorkExperience,
  fetchProfile,
  updateProfile,
} from "../../services/userProfileServices";
import { setProfile } from "../../redux/actions/profileActions";
import Script from "react-load-script";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Checkbox } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const ProfileEdit = () => {
  const dispatch = useDispatch();
  let userProfile = useSelector((state) => state.userProfile.profile);
  console.log("profile", userProfile);

  // Profile object
  const [name, setName] = useState(null);
  const [location, setLocation] = useState(null);
  const [roles, setRoles] = useState([]);
  const [exp, setExp] = useState(null);
  const [bio, setBio] = useState(null);
  const [github, setGithub] = useState(null);
  const [url, setUrl] = useState(null);
  const [skills, setSkills] = useState(null);
  const [achievements, setAchievements] = useState(null);
  const [finished, setFinished] = useState(null);
  // autocomplete location
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);
  const [settingInitial, setSettingInital] = useState(null);

  // work experience
  const [openWork, setOpenWork] = useState(false);
  const [company, setCompany] = useState(null);
  const [title, setTitle] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [workDesc, setWorkDesc] = useState(null);
  const [currentWork, setCurrentWork] = useState(false);
  const [companyUpdate, setCompanyUpdate] = useState(null);
  const [titleUpdate, setTitleUpdate] = useState(null);
  const [startDateUpdate, setStartDateUpdate] = useState(null);
  const [endDateUpdate, setEndDateUpdate] = useState(null);
  const [workDescUpdate, setWorkDescUpdate] = useState(null);
  const [currentWorkUpdate, setCurrentWorkUpdate] = useState(false);
  const cancelButtonRef = useRef(null);

  const setProfile = () => {};

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
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=AIzaSyCw-diwM8wvqk_d0JA5irKxCI3A62AVJsY&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef)
    );
  }, []);

  const handleChange = (selected) => {
    const newValuesArr = selected ? selected.map((item) => item.value) : [];
    setRoles(newValuesArr);
  };
  const handleExpChange = (selected) => {
    setExp(selected.value);
  };

  useEffect(() => {
    if (userProfile) {
      setName(userProfile.user && userProfile.user.name);
      let userRoleObject = [];
      userProfile.jobrole_list &&
        userProfile.jobrole_list.map((role) => {
          userRoleObject.push({ label: role, value: role });
        });
      setRoles(userRoleObject);
      let userExperience = {};
      if (userProfile.experience == -1) {
        userExperience = { label: "Do not specify", value: -1 };
      } else if (userProfile.experience == 0) {
        userExperience = { label: "< 1", value: 0 };
      } else if (userProfile.experience > 0 && userProfile.experience <= 5) {
        userExperience = {
          label: `${userProfile.experience} Year`,
          value: userProfile.experience,
        };
      } else if (userProfile.experience > 5 && userProfile.experience <= 10) {
        userExperience = { label: `> 5 Year`, value: 6 };
      } else if (userProfile.experience > 10)
        userExperience = { label: `> 10 Year`, value: 11 };
      setExp(userExperience);
      console.log("userexp", userExperience);
      setSettingInital(true);
      setBio(userProfile.bio);
      setUrl(userProfile.url);
      setQuery(userProfile.location_query);
      setCity(userProfile.city);
      setCountry(userProfile.country);
      setState(userProfile.state);
      setGithub(userProfile.github);
      setAchievements(userProfile.achievements);
    }
  }, [userProfile]);
  console.log("roles", roles);

  const setPrefs = async () => {
    let roleArray = [];

    roles.map((item) => {
      if (item && item.value) {
        roleArray.push(item.value);
      }
    });
    if (roleArray.length > 0) console.log("roleArray", roleArray);

    let res = await updateProfile(
      dispatch,
      name,
      roleArray.length > 0 ? roleArray : roles,
      exp,
      bio,
      github,
      url,
      skills,
      achievements,
      city,
      state,
      country,
      query
    );
    if (res) {
      setFinished({ success: true });
    } else setFinished({ success: false });
  };

  const addExperienceAsync = async () => {
    setOpenWork(false);
    let res = await addExperience(
      dispatch,
      userProfile.id,
      company,
      title,
      startDate,
      endDate,
      currentWork,
      workDesc
    );
    if (res) {
      setCompany(null);
      setCurrentWork(false);
      setEndDate(null);
      setStartDate(null);
      setTitle(null);
      await fetchProfile(dispatch);
    }
  };

  const deleteWorkExperienceAsync = async (id) => {
    let res = await deleteWorkExperience(dispatch, id);
    if (res) {
      setCompany(null);
      setCurrentWork(false);
      setEndDate(null);
      setStartDate(null);
      setTitle(null);
      await fetchProfile(dispatch);
    }
  };

  return (
    <>
      <Transition.Root show={openWork} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpenWork}
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
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          Adding Work Experience
                        </Dialog.Title>
                        <div className="mt-4">
                          <Input
                            onChange={(e) => setCompany(e.target.value)}
                            value={company}
                            type="name"
                            label="Company"
                          ></Input>
                        </div>
                        <div className="mt-3">
                          <Input
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            type="name"
                            label="Job Title"
                          ></Input>
                        </div>
                        <div className="mt-3">
                          <Input
                            onChange={(e) => setStartDate(e.target.value)}
                            value={startDate}
                            type="date"
                            label="Start Date"
                          ></Input>
                        </div>
                        {!currentWork ? (
                          <>
                            <div className="mt-3">
                              <Input
                                onChange={(e) => setEndDate(e.target.value)}
                                value={endDate}
                                type="date"
                                label="End Date"
                              ></Input>
                            </div>
                          </>
                        ) : null}
                        <Checkbox
                          onChange={(e) => setCurrentWork(!currentWork)}
                          value={currentWork}
                          label="Current Work"
                        />
                        <div className="mt-3">
                          <Textarea
                            value={workDesc}
                            onChange={(e) => setWorkDesc(e.target.value)}
                            label="Description"
                          ></Textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-sky-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={addExperienceAsync}
                    >
                      Add Work Experience
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setOpenWork(false)}
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
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Update your profile
          </h1>
        </div>
        <ProfileHeader></ProfileHeader>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div>
            {/* About */}
            <div className="md:grid md:grid-cols-3 md:gap-6">
              {/* Right side  */}
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h2 className="text-lg font-bold leading-6 text-gray-900">
                    About
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    Tell us about yourself!
                  </p>
                </div>
              </div>
              {/* Left side  */}
              <div className="mt-5 md:col-span-2 md:mt-0">
                <form>
                  <div className="shadow  sm:rounded-md">
                    <div className="space-y-4 bg-white px-4 py-6 sm:p-6">
                      <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-2 sm:col-span-2">
                          <Input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            type="name"
                            label="Full Name"
                          ></Input>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4 bg-white px-4 py-6 sm:p-6">
                      <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-2 sm:col-span-2">
                          <input
                            ref={autoCompleteRef}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Where are you based?"
                            value={query}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4 bg-white px-4 py-6 sm:p-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="grid">
                          <label
                            htmlFor="roles"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Select roles you are interested in
                          </label>
                          {settingInitial && (
                            <Select
                              defaultValue={roles && roles.length > 0 && roles}
                              onChange={handleChange}
                              name="roles"
                              className="basic-multi-select"
                              isMulti
                              options={roleOptions}
                            />
                          )}
                        </div>

                        <div className="grid">
                          <label
                            htmlFor="experience"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Years of experience
                          </label>
                          {settingInitial && (
                            <Select
                              defaultValue={exp}
                              onChange={handleExpChange}
                              name="experience"
                              className="basic-multi-select"
                              options={experience}
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-5 bg-white px-6 py-6 sm:p-6">
                      <div className="col-span-3 sm:col-span-3">
                        <Textarea
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          label="Bio"
                        ></Textarea>
                      </div>
                    </div>

                    <div className="space-y-4 bg-white px-4 py-6 sm:p-6">
                      <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-2 sm:col-span-2">
                          <Input
                            value={github}
                            onChange={(e) => setGithub(e.target.value)}
                            type="website"
                            label="Github"
                          ></Input>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 bg-white px-4 py-6 sm:p-6">
                      <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-2 sm:col-span-2">
                          <Input
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            type="website"
                            label="Website"
                          ></Input>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="mt-5 md:grid md:grid-cols-3 md:gap-6">
              {/* Right side  */}
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h2 className="text-lg font-bold leading-6 text-gray-900">
                    Experience
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    Please list your experiences
                  </p>
                </div>
              </div>
              {/* Left side  */}
              <div className="mt-5 md:col-span-2 md:mt-0">
                <form>
                  <div className="shadow  sm:rounded-md">
                    {userProfile &&
                      userProfile.work_experience &&
                      userProfile.work_experience.map((item, key) => {
                        return (
                          <div
                            key={key}
                            className="mt-5 overflow-hidden bg-white shadow sm:rounded-lg"
                          >
                            <div className="flex justify-between">
                              Experience #{key + 1}
                              <XMarkIcon
                                onClick={() => {
                                  deleteWorkExperienceAsync(item.id);
                                }}
                                className="h-6 w-6 cursor-pointer"
                                aria-hidden="true"
                              />
                            </div>
                            <div className="bg-gray-50 px-2 py-3 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-4">
                              <dt className=" text-sm font-medium text-gray-500">
                                <Input
                                  onChange={(e) =>
                                    setTitleUpdate(e.target.value)
                                  }
                                  defaultValue={item.title}
                                  value={titleUpdate}
                                  type="name"
                                  label="Job Title"
                                ></Input>
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:col-span-1 sm:mt-0">
                                <Input
                                  onChange={(e) => setCompany(e.target.value)}
                                  defaultValue={item.company}
                                  value={companyUpdate}
                                  type="name"
                                  label="Company"
                                ></Input>
                              </dd>
                            </div>
                            <div className="border-t border-gray-200">
                              <dl>
                                <div className="bg-gray-50 px-2 py-3 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-4">
                                  <dt className="text-sm font-medium text-gray-500">
                                    <Input
                                      onChange={(e) =>
                                        setStartDateUpdate(e.target.value)
                                      }
                                      value={startDateUpdate}
                                      defaultValue={item.start_date}
                                      type="date"
                                      label="Start Date"
                                    ></Input>
                                  </dt>
                                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-1 sm:mt-0">
                                    <Input
                                      onChange={(e) =>
                                        setEndDateUpdate(e.target.value)
                                      }
                                      value={endDateUpdate}
                                      defaultValue={item.start_date}
                                      type="date"
                                      label="End Date"
                                    ></Input>
                                  </dd>
                                </div>

                                <dt className="text-sm font-medium text-gray-500">
                                  <Checkbox
                                    onChange={(e) =>
                                      setCurrentWork(!currentWork)
                                    }
                                    value={currentWork}
                                    label="Current Work"
                                  />
                                </dt>

                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                                  <dd className="mt-0 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <Textarea
                                      value={workDescUpdate}
                                      defaultValue={item.description}
                                      onChange={(e) =>
                                        setWorkDescUpdate(e.target.value)
                                      }
                                      label="Description"
                                    ></Textarea>
                                  </dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-2 sm:gap-2 ">
                                  <dd className="mt-0 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <button className="inline-flex w-full justify-center rounded-md border border-transparent bg-sky-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">
                                      Update
                                    </button>
                                  </dd>
                                </div>
                              </dl>
                            </div>
                          </div>
                        );
                      })}

                    <Button
                      onClick={() => setOpenWork(true)}
                      size="sm"
                      variant="text"
                    >
                      + Add work experience
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            <div className="mt-1 md:grid md:grid-cols-3 md:gap-6">
              {/* Right side  */}
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h2 className="text-lg font-bold leading-6 text-gray-900">
                    Education
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    Please list your educations
                  </p>
                </div>
              </div>
              {/* Left side  */}
              <div className="mt-5 md:col-span-2 md:mt-0">
                <form>
                  <div className="shadow  sm:rounded-md">
                    <Button size="sm" variant="text">
                      + Add education
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            <div className="mt-1 md:grid md:grid-cols-3 md:gap-6">
              {/* Right side  */}
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h2 className="text-lg font-bold leading-6 text-gray-900">
                    Skills
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    This will allow companies to see your skills
                  </p>
                </div>
              </div>
              {/* Left side  */}
              <div className="mt-5 md:col-span-2 md:mt-0">
                <form>
                  <div className="shadow  sm:rounded-md">
                    <div className="space-y-4 bg-white px-4 py-6 sm:p-6">
                      <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-2 sm:col-span-2">
                          <Input type="skills" label="Skills"></Input>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="mt-5 md:grid md:grid-cols-3 md:gap-6">
              {/* Right side  */}
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h2 className="text-lg font-bold leading-6 text-gray-900">
                    Achievements
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    Showcase your achievements!
                  </p>
                </div>
              </div>
              {/* Left side  */}
              <div className="mt-5 md:col-span-2 md:mt-0">
                <form>
                  <div className="shadow  sm:rounded-md">
                    <div className="space-y-4 bg-white px-4 py-6 sm:p-6">
                      <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-3 sm:col-span-3">
                          <Textarea
                            value={achievements}
                            onChange={(e) => setAchievements(e.target.value)}
                            label="Achievements"
                          ></Textarea>
                        </div>
                        <Button onClick={setPrefs}>Save</Button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProfileEdit;
