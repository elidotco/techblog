"use client";

import { useParams } from "next/navigation";
import React from "react";

const Home = () => {
  const params = useParams();
  console.log(params.slug);
  return <div>pages</div>;
};

export default Home;
