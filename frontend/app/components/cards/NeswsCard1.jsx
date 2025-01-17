import React from "react";

const NeswsCard1 = () => {
  return (
    <div className="flex justify-between items-center px-5 md:px-10 lg:px-20 2xl:px-32 py-10 lg:py-20 border-b border-t border-dark-600">
      <div className="w-[30%] h-80 bg-dark-600 shadow-sm rounded-md"></div>
      <div className="flex flex-col gap-5">
        <p className="text-white text-3xl">
          Global Climate Summit Addresses Urgent Climate Action
        </p>
        <p className=" text-gray-700">
          World leaders gathered at the Global Climate Summit to discuss urgent
          climate action, emissions reductions, and renewable energy targets.
        </p>
      </div>
    </div>
  );
};

export default NeswsCard1;
