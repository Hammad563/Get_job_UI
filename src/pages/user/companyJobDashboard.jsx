import Select from "react-select";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import CompanyJobHeader from "../../components/companyJobHeader";
import { useEffect } from "react";
import {
  fetchSpecificJob,
  updateJobStatus,
} from "../../services/companyServices";
import { createMarkup, salaryHelper } from "../../helpers/componentHelpers";
import {
  Button,
  Checkbox,
  Input,
  Option,
  Textarea,
  Chip,
} from "@material-tailwind/react";

const jobStatus = [
  { label: "Active", value: "Active" },
  { label: "Hidden", value: "Hidden" },
];

const CompanyJobDashboard = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  //const { job } = location.state;
  const currentUser = useSelector((state) => state.auth.user);
  let { id, jobId } = useParams();

  const [job_status, setJobStatus] = useState("");
  const [job_data, set_job_data] = useState(null);

  const fetchJobData = async () => {
    let res = await fetchSpecificJob(dispatch, jobId);
    console.log("resss", res);
    set_job_data(res);
    setJobStatus({ label: res.status, value: res.status });
  };

  useEffect(() => {
    fetchJobData();
  }, []);

  const handleJobStatusChange = (selected) => {
    setJobStatus(selected.value);
  };

  const updateJobStatusAsync = async () => {
    console.log("gettring ");
    let res = await updateJobStatus(dispatch, job_data.id, job_status);
    if (res) {
      console.log("updated successfully");
    }
  };

  console.log("jobId", job_data);
  return (
    <>
      <CompanyJobHeader></CompanyJobHeader>
      <div className="bg-white">
        {job_data && (
          <>
            <div className="pt-6">
              {/* Image gallery */}

              {/* Product info */}
              <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
                <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    {job_data.title}
                  </h1>

                  <div className=" bg-white px-1 py-2 sm:p-3">
                    <div className="grid grid-cols-2 ">
                    <p className="text-base text-gray-900">{job_data.remote ? "Remote" : null}</p>
                    </div>
                  </div>
                  <div className=" bg-white px-1 py-2 sm:p-3">
                    <div className="grid grid-cols-2 ">
                    
                      {job_data.current_job_type}
                    </div>
                  </div>
                  <div className=" bg-white px-1 py-2 sm:p-3">
                    <div className="grid grid-cols-3 ">
                       
                      {job_data.location_query}
                    </div>
                  </div>
                  <div className=" bg-white px-1 py-2 sm:p-3">
                    <div className="grid grid-cols-3 ">
                        <p className="text-base text-gray-900">{salaryHelper(job_data.salary_range)}</p>
                    </div>
                  </div>
                  <div className=" bg-white px-1 py-2 sm:p-3">
                    <div className="grid grid-cols-3 ">
                        <p className="text-base text-gray-900">{job_data.experience}+ years</p>
                    </div>
                  </div>
                </div>

                {/* Options */}
                <div className="mt-4 lg:row-span-3 lg:mt-0">
                  <h2 className="sr-only">Product information</h2>
                  <p className="text-3xl tracking-tight text-gray-900">
                    {job_data.price}
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
                    <Select
                      defaultValue={job_status ? job_status : "Hidden"}
                      onChange={handleJobStatusChange}
                      name="JobStatus"
                      className="basic-multi-select"
                      options={jobStatus}
                    />
                    <button
                      type="submit"
                      className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={(e) => {
                        updateJobStatusAsync();
                      }}
                    >
                      Change job status
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
                            job_data.description
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
                        {job_data.job_q &&
                          job_data.job_q.map((item) => {
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
                      {job_data.benefits.map((item) => {
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
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CompanyJobDashboard;
