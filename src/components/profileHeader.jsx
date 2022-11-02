import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { Fragment } from "react";
import { Button } from "@material-tailwind/react";
import { useDispatch } from "react-redux";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProfileHeader = () => {
  const dispatch = useDispatch()
  let location = useLocation();

  const navigation = [
    { name: "Summary", path: "/profile/overview" },
    { name: "Edit", path: "/profile/edit" },
    { name: "Resume", path: "/profile/resume" },
  ];

  

  return (
    <div className="min-h-full">
      <Disclosure as="nav" className="bg-white">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-12 items-center justify-between">
                <div className="flex items-center">
                  
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item) => (
                        <Link
                          to={item.path}
                          replace
                          key={item.name}
                          className={classNames(
                            item.path == location.pathname
                              ? "border-blue-500 text-gray-900"
                              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                            "inline-flex items-center px-3 pt-1 border-b-2 text-sm font-medium"
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

                
              </div>
            </div>
            

          </>
        )}
      </Disclosure>
    </div>
  );
};

export default ProfileHeader;