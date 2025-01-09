import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import api from "@/utils/api";
import { ArrowUpRightIcon, HeartIcon } from "@heroicons/react/20/solid";
import { ChatBubbleOvalLeftIcon, ShareIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { useAuth } from "../context/authContext";

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
      api.get("/blog?page=3").then((res) => {
        setPosts(res.data);
        setLoading(false);
      });
    } else {
      api.get(`/blog/category?category=${tab}&&page=3`).then((res) => {
        setPosts(res.data);
        setLoading(false);
      });
    }
  }, [tab]);
  return (
    <div className="min-h-96">
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

const likeHandle = async ({ id, user }) => {
  try {
    const response = await api.post(
      `/likes/like_blog?postId=${id}&userId=${user}`
    );
    console.log("Like/Unlike Response:", response.data.done);
    return response.data.done;
  } catch (error) {
    console.error(
      "Failed to handle like:",
      error.response?.data || error.message
    );
  }
};

//  blogcard
const BlogCard = ({ data }) => {
  const [likes, setLikes] = useState();
  const [like, setLike] = useState(false);
  console.log(like);

  const { user } = useAuth();

  useEffect(() => {
    const fetchLikeStatus = async () => {
      if (user) {
        try {
          const res = await api.get(`/likes/isliked?postId=${data._id}`);
          setLike(res.data.done === 1); // Set the like state
        } catch (err) {
          console.error("Failed to check if liked:", err.message);
        }
      }
    };

    const fetchLikesCount = async () => {
      try {
        const response = await api.get(`/likes/blog_likes?postId=${data._id}`);
        setLikes(response.data.data); // Set the likes count
      } catch (err) {
        console.error("Failed to fetch likes count:", err.message);
      }
    };

    fetchLikeStatus();
    fetchLikesCount();
  }, [data._id, user]);

  const handleLikeClick = async () => {
    if (!user) {
      alert("Please log in to like the post.");
      return;
    }

    // Optimistically update the UI
    const updatedLike = !like; // Toggle the like state
    setLike(updatedLike); // Update the like state
    setLikes((prevLikes) => (updatedLike ? prevLikes + 1 : prevLikes - 1)); // Update the likes count

    const result = await likeHandle({ id: data._id, user: user._id });

    // If the API call fails, revert the UI changes
    if (result === null) {
      setLike(!updatedLike); // Revert the like state
      setLikes((prevLikes) => (updatedLike ? prevLikes - 1 : prevLikes + 1)); // Revert the likes count
    }
  };

  return (
    <div className="flex justify-between text-gray-700 px-5 md:px-10 lg:px-20 2xl:px-32 border-b-[0.5px] border-gray-700 xl:gap-32 gap-10 py-16   flex-wrap">
      {/* Author */}
      <div className=" flex  gap-2 ">
        {/* image */}
        <div className="rounded-full w-12 h-12 bg-yellow-400"></div>
        <div className="flex flex-col">{data.createdBy.name}</div>
        {/* image */}
      </div>
      {/* Author */}
      {/* BLog */}
      <div className="flex lg:flex-1 flex-col order-2 lg:order-none md:w-full  lg:min-w-fit gap-5">
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
        <div className="flex gap-3">
          <div
            onClick={handleLikeClick}
            className="rounded-full bg-dark-600 px-4 py-1 flex items-center gap-x-2 border-gray-700"
          >
            {like ? (
              <HeartIcon className="w-5 h-5 text-[#FF5500]" />
            ) : (
              <HeartIcon className="w-5 h-5 " />
            )}
            {likes}
          </div>
          <div className="rounded-full bg-dark-600 px-4 py-2 flex items-center gap-2 border-gray-700">
            {" "}
            <ChatBubbleOvalLeftIcon className=" w-6 h-6" /> 0
          </div>
          <div className="rounded-full bg-dark-600 px-4 py-3 flex items-center gap-2 border-gray-700">
            {" "}
            <ShareIcon className=" w-5 h-5" /> 0
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
