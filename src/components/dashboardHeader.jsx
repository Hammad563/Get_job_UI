import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { Fragment } from "react";
import { Button } from "@material-tailwind/react";
import { logout } from "../services/authServices";
import { useDispatch, useSelector } from "react-redux";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const DashboardHeader = () => {
  const dispatch = useDispatch()
  let location = useLocation();
  let currentUser = useSelector( (state) => state.auth.user)
  let currentUserProfile = useSelector( (state) => state.userProfile.profile)


  const navigation = [
    { name: "Home", path: "/" },
    { name: "Profile", path: "/profile/overview" },
    { name: "Jobs Saved", path: "/savedjobs" },
    { name: "Jobs Applied", path: "/appliedjobs" },
  ];


  const logoutAsync = async () => {
     await logout(dispatch)
  }

  return (
    <div className="min-h-full">
      {
        currentUser ? <>
        <Disclosure as="nav" className="bg-sky-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0 text-white">Get Jobs</div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item) => (
                        <Link
                          to={item.path}
                          
                          key={item.name}
                          className={classNames(
                            item.path == location.pathname
                              ? "bg-sky-900 text-white"
                              : "text-gray-300 hover:bg-sky-600 hover:text-white",
                            "px-3 py-2 rounded-md text-sm font-medium"
                          )}
                          aria-current={
                            item.path == location.pathname ? "page" : undefined
                          }
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <button
                      type="button"
                      className="rounded-full bg-gray-400 p-1 text-gray-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="sr-only">View Notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-5">
                      <div>
                        <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="sr-only">Open User Menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                          ></img>
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>

                          <span className="block px-4 py-2 text-sm text-gray-900">
                                {currentUser.name}
                            </span>
                          </Menu.Item>
                          <Menu.Item>
                            <Link
                              className="block px-4 py-2 text-sm text-gray-700"
                              to="/profile/overview"
                             
                            >
                              Profile
                            </Link>
                          </Menu.Item>
                          <Menu.Item>
                            <Link
                              className="block px-4 py-2 text-sm text-gray-700"
                              to="/settings"
                             
                            >
                              Settings
                            </Link>
                          </Menu.Item>
                          <Menu.Item>
                            <Link
                              className="block px-4 py-2 text-sm text-gray-700"
                              to={`/company`}
                             
                            >
                              Companies
                            </Link>
                          </Menu.Item>
                          <Menu.Item>
                            <button onClick={logoutAsync} className="block px-4 py-2 text-sm text-gray-700">
                              Logout
                            </button>
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                    {/* Profile dropdown end */}
                  </div>
                </div>

                {/* Mobile menu button */}
                <div className="-mr-2 flex md:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-sky-800 p-2 text-gray-400 hover:bg-sky-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>   
              </div>
            </div>
            <Disclosure.Panel className="md:hidden">
                    <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                    {navigation.map((item) => (
                        <Link
                          to={item.path}
                        
                          key={item.name}
                          className={classNames(
                            item.path == location.pathname
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "px-3 py-2 rounded-md text-sm font-medium"
                          )}
                          aria-current={
                            item.path == location.pathname ? "page" : undefined
                          }
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                    <div className="border-t border-gray-700 pt-4 pb-3">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png" alt="" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">{currentUser.name}</div>
                    </div>
                    <button
                      type="button"
                      className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                  
                      
                            <Link
                              className="block px-4 py-2 text-sm text-white"
                              to="/profile/overview"
                              
                            >
                              Profile
                            </Link>
                         
                            <Link
                              className="block px-4 py-2 text-sm text-white"
                              to="/settings"
                              
                            >
                              Settings
                            </Link>
                         
                            <button className="block px-4 py-2 text-sm text-white">
                              Logout
                            </button>
                          
                  </div>
                </div>
            </Disclosure.Panel>

          </>
        )}
      </Disclosure>
        </> : ''
      }
    </div>
  );
};

export default DashboardHeader;
