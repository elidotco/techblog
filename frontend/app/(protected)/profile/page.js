"use client";
import { useAuth } from "@/app/context/authContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const { logout } = useAuth();
  return (
    <div>
      <h1>Profile</h1>
      <p>This is a protected page.</p>
      <p onClick={logout}>Logout</p>
    </div>
  );
};

export default Page;
