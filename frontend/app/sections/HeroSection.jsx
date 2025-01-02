import { ArrowUpRightIcon } from "@heroicons/react/20/solid";
import React from "react";

const HeroSection = () => {
  return (
    <>
      <section className="flex lg:flex-row flex-col justify-between border-b border-dark-100 ">
        {/* Intro and description */}
        <div className="text-dark-100 w-full  pt-10 md:pt-16 xl:pt-32 lg:w-3/5 lg:border-r-[0.5px] border-dark-100">
          <div className="flex flex-col gap-5 pb-16 pl-5 md:px-20  xl:pl-32 pr-5 xl:pr-28 justify-center border-b-[0.5px] border-dark-100">
            <p className="text-normal xl:text-2xl ">
              Your Journey to Tomorrow Begins Here
            </p>
            <h1 className="lg:text-[3.5vw] text-[6vw] text-white font-medium">
              Explore the Frontiers of Artificial Intelligence
            </h1>
            <p className="text-md">
              Welcome to the epicenter of AI innovation. FutureTech AI News is
              your passport to a world where machines think, learn, and reshape
              the future. Join us on this visionary expedition into the heart of
              AI.
            </p>
          </div>
          <div className="flex pl-5 md:px-10 xl:pl-12  text-white justify-between w-full">
            <StCa num={300} desc="Resources Avilable" p={true} />
            <StCa num={100} desc="Resources Avilable" />
            <StCa num={2300} desc="Resources Avilable" b={true} />
          </div>
        </div>
        {/* Intro and description */}
        {/* Image and the other stuff at the right hand side*/}
        <div className="lg:w-2/5  relative   p-0">
          <img
            src="/hero.png"
            alt="hero-image"
            className="md:w-2/3 w-full  h-full top-0 opacity-70 right-0 "
          />
          <div className="w-full h-3/5 xl:h-1/2 flex items-start lg:block absolute  bottom-0 px-5 xl:pl-20 2xl:pl-28  flex-col ">
            <img src="/round.png" alt="hero-image" className="pb-5 sm:w-2/5" />
            <h3 className="text-white font-normal text-xl">
              Explore 1000+ resources
            </h3>
            <p className=" py-5 text-sm text-gray-700">
              Over 1,000 articles on emerging tech trends and breakthroughs.
            </p>

            <button className="border-[0.5px] mt-4 border-dark-100 text-gray-700 flex items-center gap-1  px-6 py-2 rounded-md">
              Explore Resources{" "}
              <ArrowUpRightIcon className="h-5 w-5 text-yellow-700" />
            </button>
          </div>
        </div>
        {/* Image and the other stuff at the right hand side*/}
      </section>
      <div className="w-full flex flex-col md:flex-row md:flex-wrap items-center px-5  md:px-20 xl:px-12">
        <StCa
          num={300}
          desc="Resources Avilable"
          p={true}
          typ={true}
          icon="/icon1.png"
        />
        <StCa
          num={300}
          desc="Resources Avilable"
          p={true}
          typ={true}
          icon="/icon1.png"
        />
        <StCa
          num={300}
          desc="Resources Avilable"
          p={true}
          typ={true}
          b={true}
          icon="/icon1.png"
        />
      </div>
    </>
  );
};

export default HeroSection;

export const StCa = ({ b, num, desc, p, typ, icon }) => {
  return (
    <div
      className={` py-5 xl:py-10 md:pl-20  ${
        typ ? "w-full md:w-1/2 xl:w-1/3 py-8" : ""
      } ${
        b
          ? " "
          : typ
          ? "border-b-[0.5px] md:border-b-0 md:border-r-[0.5px]"
          : "border-r"
      } border-dark-100 flex items-start flex-col ${
        p ? "" : "xl:pl-20 pl-5 "
      }  w-1/3  "`}
    >
      {typ ? (
        <>
          {/* iconss */}
          <img src={icon} alt="" className="w-10 h-10 " />
          <div className="flex flex-row items-center justify-between w-full">
            <div className="flex flex-col">
              {desc}
              <p className="text-gray-300">{num}</p>
            </div>
            <div className="flex items-center p-4 rounded-full justify-center bg-yellow-800">
              <ArrowUpRightIcon className="h-5 w-5 text-dark-800" />
            </div>
            <p className="text-gray-400">{p}</p>
          </div>
          {/* iconss */}
        </>
      ) : (
        <>
          <h2 className="text-xl 2xl:text-4xl font-medium">
            {num}
            <span className="ml--2 text-yellow-800 ">+</span>
          </h2>

          <p className=" font-light text-gray-700 pt-1">{desc}</p>
        </>
      )}
    </div>
  );
};
