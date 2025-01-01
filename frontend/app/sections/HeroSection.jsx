import React from "react";

const HeroSection = () => {
  return (
    <section className="flex justify-between border-b border-dark-100 ">
      {/* Intro and description */}
      <div className="text-dark-100 w-full pt-32 sm:w-3/5 border-r-[0.5px] border-dark-100">
        <div className="flex flex-col gap-5 pb-16  pl-32 pr-28 justify-center border-b-[0.5px] border-dark-100">
          <p className="text-2xl ">Your Journey to Tomorrow Begins Here</p>
          <h1 className="text-[3.5vw] text-white font-medium">
            Explore the Frontiers of Artificial Intelligence
          </h1>
          <p className="text-md">
            Welcome to the epicenter of AI innovation. FutureTech AI News is
            your passport to a world where machines think, learn, and reshape
            the future. Join us on this visionary expedition into the heart of
            AI.
          </p>
        </div>
        <div className="flex pl-32  text-white justify-between w-full">
          <StCa num={300} desc="Resources Avilable" p={true} />
          <StCa num={100} desc="Resources Avilable" />
          <StCa num={2300} desc="Resources Avilable" b={true} />
        </div>
      </div>
      {/* Intro and description */}
      {/* Image and the other stuff at the right hand side*/}
      <div className="w-2/5  h-full p-0">
        <img
          src="/hero.png"
          alt="hero-image"
          className="w-1/2 h-3/5 top-0 opacity-70 right-0 "
        />
        <div className="w-full h-1/2"></div>
      </div>
      {/* Image and the other stuff at the right hand side*/}
    </section>
  );
};

export default HeroSection;

export const StCa = ({ b, num, desc, p }) => {
  return (
    <div
      className={`py-10 ${
        b ? "" : "border-r"
      } border-dark-100 flex items-start flex-col ${
        p ? "" : "pl-20"
      }  w-1/3  "`}
    >
      <h2 className="text-4xl font-medium">
        {num}
        <span className="ml--2 text-yellow-800 ">+</span>
      </h2>

      <p className=" font-light text-gray-700 pt-1">{desc}</p>
    </div>
  );
};
