import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import api from "@/utils/api";
import { ArrowUpRightIcon } from "@heroicons/react/20/solid";
import { format } from "date-fns";

const BlogPreviewSection = ({ data }) => {
  const [tab, setTab] = React.useState("All");
  return (
    <section>
      <div className="w-full  px-5 border-b-[0.5px] border-gray-700  md:px-10 lg:px-20 2xl:px-32 sm:px-5 xs:px-5 py-10">
        <Swiper
          spaceBetween={20}
          slidesPerView="auto"
          navigation
          pagination={{ clickable: true }}
          className="flex flex-row mx-5"
        >
          <SwiperSlide style={{ width: "150px" }}>
            <div
              className={` py-3 border-[0.5px] flex text-gray-700 text-sm border-gray-700 rounded-md  transition-all duration-150 items-center cursor-pointer justify-center px-4  ${
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
                className={`py-3 border-[0.5px] cursor-pointer flex text-gray-700 text-sm border-gray-700 transition-all duration-150 rounded-md items-center justify-center px-4  ${
                  tab === category._id
                    ? "bg-dark-700 border-none transition-all duration-150 text-white"
                    : ""
                }`}
                onClick={() => setTab(category._id)}
              >
                <p>{category.name}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* BLog */}
      <PreviewSection tab={tab} />
    </section>
  );
};

export default BlogPreviewSection;

const PreviewSection = ({ tab }) => {
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    if (tab === "All") {
      api.get("/blog").then((res) => {
        setPosts(res.data);
        setLoading(false);
      });
    } else {
      api.get(`/blog/category?category=${tab}`).then((res) => {
        setPosts(res.data);
        setLoading(false);
      });
    }
  }, [tab]);
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {posts.map((post) => (
            <BlogCard key={post._id} data={post} />
          ))}
        </div>
      )}
    </div>
  );
};

//  blogcard
const BlogCard = ({ data }) => {
  console.log(data._id);
  useEffect(() => {
    const likes = async () => {
      try {
        const response = await api.get(`/likes/blog_likes?postId=${data._id}`);
        console.log(response);
      } catch (err) {
        console.error("Failed to fetch likes count:", err.message);
      }
    };
    likes();
  }, [data._id]);

  return (
    <div className="flex justify-between text-gray-700 px-5 md:px-10 lg:px-20 2xl:px-32 border-b border-gray-700 xl:gap-32 gap-10 py-16 flex-wrap">
      {/* Author */}
      <div className=" flex  gap-2 ">
        {/* image */}
        <div className="rounded-full w-12 h-12 bg-yellow-400"></div>
        <div className="flex flex-col">{data.createdBy.name}</div>
        {/* image */}
      </div>
      {/* Author */}
      {/* BLog */}
      <div className="flex flex-1 flex-col order-2 lg:order-none w-full  lg:min-w-fit gap-5">
        <p className="text-normal">
          {" "}
          {format(new Date(data.createdAt), "MMMM dd, yyyy")}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <p className="text-white text-xl">{data.title}</p>
            <p className="text-sm py-2">{data.description}</p>
          </div>
        </div>
        {/* Stats on Likes, Comments, Shares */}
        <div className="flex">
          <div className="rounded-full bg-dark-600 px-4 py-3 border-gray-700">
            20k
          </div>
        </div>
        {/* Stats on Likes, Comments, Shares */}
      </div>
      <a
        href=""
        className="py-2 border-[0.5px] px-3 cursor-pointer h-10 self-center rounded-md flex text-gray-700 text-sm border-gray-700 gap-1"
      >
        {" "}
        View Blog <ArrowUpRightIcon className="w-5 h-5 text-yellow-800" />{" "}
      </a>
      {/* BLog */}
    </div>
  );
};
