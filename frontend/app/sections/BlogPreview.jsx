import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import api from "@/utils/api";

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
                  tab === category.name
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
            <div key={post._id}>
              <p>{post.title}</p>
              <p>{post.excerpt}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
