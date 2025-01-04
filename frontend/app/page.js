"use client";
import React, { useEffect, useState } from "react";
import { FeaturesSection, HeroSection } from "./sections";
import { Banner } from "./components";
import BlogPreviewSection from "./sections/BlogPreview";
import { use } from "react";
import api from "@/utils/api";

export default function Home() {
  const [categories, setCatgories] = useState([]);
  //fetch the needed data for the home page
  useEffect(() => {
    //fetch

    api.get("/categories").then((res) => {
      setCatgories(res.data);
      console.log(res.data);
    });
  }, []);
  return (
    <>
      <HeroSection />
      <Banner
        data={{
          title: "Unlock the Power of",
          excerpt: "FutureTech Features",
        }}
      />
      <FeaturesSection />
      <Banner
        data={{
          title: "A Knowledge Treasure Trove",
          excerpt: "Explore FutureTech's In-Depth Blog Posts",
        }}
      />
      <BlogPreviewSection data={categories} />
    </>
  );
}
