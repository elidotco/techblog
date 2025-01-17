"use client";

import React from "react";
import BlogPreviewSection from "../sections/BlogPreview";
import { useAuth } from "../context/authContext";
import { Banner } from "../components";
import NeswsCard1 from "../components/cards/NeswsCard1";

const Home = () => {
  const { categories } = useAuth();
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
      <NeswsCard1 />
      <Banner
        data={{
          title: "Welcome to Our News Hub",
          excerpt: "Discover the World of Headlines",
        }}
      />
      {/* BLog PReview Section */}
      <BlogPreviewSection data={categories} />
      {/* BLog PReview Section */}
      <Banner
        data={{
          title: "Featured Videos",
          excerpt: "Visual Insights for the Modern Viewer",
        }}
      />
    </section>
  );
};

export default Home;
