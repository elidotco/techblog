import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const BlogPreviewSection = ({ data }) => {
  const [tab, setTab] = React.useState("All");
  return (
    <section>
      <div className="w-full px-5 border-b-[0.5px] border-gray-700  md:px-10 lg:px-20 2xl:px-32 sm:px-5 xs:px-5 py-10">
        <Swiper
          spaceBetween={20}
          slidesPerView="auto"
          navigation
          pagination={{ clickable: true }}
          className="flex flex-row mx-5"
        >
          <SwiperSlide style={{ width: "150px" }}>
            <div
              className={` py-3 border-[0.5px] flex text-gray-700 text-sm border-gray-700 rounded-md items-center justify-center px-4  ${
                tab === "All"
                  ? "bg-dark-700 border-none text-white transition-all duration-150"
                  : ""
              }`}
              onClick={() => setTab("All")}
            >
              <p>All</p>
            </div>
          </SwiperSlide>
          {data.map((category) => (
            <SwiperSlide key={category._id} style={{ width: "150px" }}>
              <div
                className={`py-3 border-[0.5px] flex text-gray-700 text-sm border-gray-700 rounded-md items-center justify-center px-4  ${
                  tab === category.name
                    ? "bg-dark-700 border-none text-white"
                    : ""
                }`}
                onClick={() => setTab(category.name)}
              >
                <p>{category.name}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default BlogPreviewSection;
