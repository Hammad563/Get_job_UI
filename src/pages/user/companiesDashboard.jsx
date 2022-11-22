import { useState } from "react";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createCompany, fetchCompanies } from "../../services/companyServices";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Button, Input, Option, Textarea } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const AllCompanies = () => {
  const currentUser = useSelector((state) => state.auth.user);
  let companies = useSelector((state) => state.companies.companies);
  const dispatch = useDispatch();
  const cancelButtonRef = useRef(null);

  const [openAddCompany, setOpenAddCompany] = useState(false);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);

  const fetchCompaniesAsync = async () => {
    let res = await fetchCompanies(dispatch);
  };
  const createCompanyAsync = async () => {
    setOpenAddCompany(false);
    let res = await createCompany(dispatch, name, description);
    if (res) {
      fetchCompaniesAsync();
    }
    setName(null);
    setDescription(null);
  };

  useEffect(() => {
    fetchCompaniesAsync();
  }, []);

  console.log("coma", companies);

  return (
    <>
      <Transition.Root show={openAddCompany} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpenAddCompany}
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
                          New Company
                        </Dialog.Title>
                        <div className="mt-4">
                          <Input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            type="name"
                            label="Company Name"
                          ></Input>
                        </div>
                        <div className="mt-3">
                          <Textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            label="Company Description"
                          ></Textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-sky-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={createCompanyAsync}
                    >
                      Add Company
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setOpenAddCompany(false)}
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
      <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 text-end">
        <button
          onClick={() => setOpenAddCompany(true)}
          className="inline-flex w-full justify-center rounded-md border border-transparent bg-sky-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Add a company
        </button>
      </div>
      <div class="bg-gray-100">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
            <h2 class="text-2xl font-bold text-gray-900">Your Companies</h2>

            <div class="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
              {companies && companies.length > 0 ? (
                companies.map((company) => (
                  <>
                    <Link to={`/company/${company.id}`}>
                    <div class="group relative">
                      <div class="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                        <img
                          src="https://lanecdr.org/wp-content/uploads/2019/08/placeholder.png"
                          alt="Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug."
                          class="h-full w-full object-cover object-center"
                        />
                      </div>
                      <h3 class="mt-6 text-sm text-gray-500">
                        <span class="absolute inset-0"></span>
                        Approved
                      </h3>
                      <p class="text-base font-semibold text-gray-900">
                        {company && company.name}
                      </p>
                    </div>
                    </Link>
                  </>
                ))
              ) : (
                <>
                  <div className="">
                    <h3 class="mt-6 text-lg text-gray-500">
                      You have no companies
                    </h3>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllCompanies;
