import React from "react";

const Banner = ({ data, type }) => {
  return (
    <div
      className={`${
        type
          ? "flex flex-row flex-wrap lg:flex-col"
          : "bg-dark-600 w-full py-10 lg:px-20 md:px-10 px-5 2xl:px-32"
      }`}
    >
      <div className="p-2 bg-dark-500 text-sm rounded-sm mb-5  w-fit">
        {data.title}
      </div>
      <p
        className={`md:text-4xl text-2xl text-white ${
          type ? "w-full lg:flex-1" : ""
        }`}
      >
        {data.excerpt}
      </p>
    </div>
  );
};

export default Banner;
