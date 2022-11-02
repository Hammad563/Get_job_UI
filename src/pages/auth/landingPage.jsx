import { Button } from "@material-tailwind/react";
import React, { useState } from "react";
import LandingHeader from "../../components/landingHeader";

const Landing = () => {
  const [percent, setPercent] = useState(0);

  return (
    <>
      <div className="flex flex-col mt-32 overflow-scroll">
        <div className="flex flex-col">
          <LandingHeader></LandingHeader>
          <main class="mt-16 mx-auto max-w-7xl px-4 sm:mt-24">
            <div class="text-center">
              <h1 class="text-4xl tracking-tight mt-10 font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <p class="block">Make your profile and apply to jobs!</p>
                <p class="block text-sky-600"></p>
                <p class="block text-sky-600">Apply with one click!</p>
              </h1>
              <p class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                No Need to constantly change and update resumes!
              </p>
              <div class="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <div class="flex w-max gap-4 rounded-md shadow">
                  <Button>Get Started</Button>
                </div>

                <div class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                  <Button>Live Demo</Button>
                </div>
              </div>
            </div>
          </main>
          <div className="flex flex-wrap">
            <div className="bg-orange-200 h-52 w-52 m-5"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
