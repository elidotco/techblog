import React from "react";

const HeroSection = () => {
  return (
    <section className="flex justify-between items-center">
      {/* Intro and description */}
      <div className="text-dark-100 w-full pt-32 sm:w-3/5 border-r-[0.5px] border-gray-100">
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
        he
      </div>
      {/* Intro and description */}
    </section>
  );
};

export default HeroSection;
