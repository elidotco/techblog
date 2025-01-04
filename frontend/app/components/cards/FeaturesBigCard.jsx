import { featuresDataOne } from "@/utils/dummydata";
import React from "react";

const FeaturesBigCard = () => {
  return (
    <div className="flex flex-col lg:flex-row border-b border-gray-700  justify-between items-center ">
      {/* Left Side of the card containing the intro to the feature */}
      <div className="lg:w-2/5 w-full py-20 px-5 md:px-10 lg:px-20 2xl:px-32 ">
        {/* Icon */}
        <img src="/icon.png" alt="" className="w-10 h-10 mb-5 " />
        {/* Icon */}
        {/* Description */}

        <p className="py-4"> Global Readership</p>
        <p className="text-gray-700 text-sm">
          Stay informed with our blog section dedicated to future technology.
        </p>
      </div>
      {/* Left Side of the card containing the intro to the feature */}
      {/* Right Side of the card containing the the sub features */}
      <div className="lg:w-3/5 w-full py-20 flex border-l border-dark-100 flex-wrap gap-5 px-5 md:px-10">
        {featuresDataOne.map((data, index) => (
          <SubfeaturesCard key={index} {...data} />
        ))}
      </div>

      {/* Right Side of the card containing the the sub features */}
    </div>
  );
};

export default FeaturesBigCard;
export const SubfeaturesCard = (data) => {
  return (
    <div className="p-5 w-full md:w-[48%]  bg-dark-600 rounded-md border border-dark-100">
      <p>{data?.title}</p>
      <p className="text-gray-700 text-sm">{data?.excerpt}</p>
    </div>
  );
};
