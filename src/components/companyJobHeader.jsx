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

const CompanyJobHeader = (props) => {
  const dispatch = useDispatch()
  let location = useLocation();
  let { id, jobId } = useParams(); 

  const navigation = [
    { name: "Back to jobs", path: `/company/${id}` },
    { name: "Overview", path: `/company/${id}/${jobId}` },
    { name: "Manage applications", path: `/company/${id}/${jobId}/applications`},
    { name: "Edit", path: `/company/${id}/${jobId}/edit` }
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

export default CompanyJobHeader;