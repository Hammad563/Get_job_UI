import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import { Fragment } from "react";
import { Button } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const CompanyHeader = (props) => {
  const dispatch = useDispatch()
  let location = useLocation();
  let { id } = useParams(); 

  const navigation = [
    { name: "Companies", path: "/company" },
    { name: "Your Jobs", path: `/company/${id}` },
    { name: "Overview", path: "/company" },
  ];
  

  return (
    <div className="min-h-full mt-5">
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
                      <button onClick={() => props.setPostJob(true)} className="inline-flex w-full justify-center rounded-md border border-transparent bg-sky-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">Post a job</button>
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

export default CompanyHeader;