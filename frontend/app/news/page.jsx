import React from "react";

const Home = () => {
  return (
    <section>
      {/* Title */}
      <div className="py-20  relative  px-5 md:10 lg:px-20 flex text-7xl items-end 2xl:px-32">
        Today's Headlines: Stay <br />
        Informed{" "}
        <div
          className="text-base  absolute
       text-gray-600  w-3/5 lg:left-[25rem]   2xl:left-[27rem] "
        >
          {" "}
          Explore the latest news from around the world. We bring you
          up-to-the-minute updates on the most significant events, trends, and
          stories. Discover the world through our news coverage.
        </div>
      </div>
      {/* Title */}
    </section>
  );
};

export default Home;
