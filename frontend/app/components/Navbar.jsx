"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";
import { useAuth } from "../context/authContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { user } = useAuth();

  const shortName = user?.name.split(" ").map((n) => n[0]);

  return (
    <>
      <nav className=" w-full hidden md:flex justify-between items-center 2xl:px-32 py-5 md:px-10 lg:px-20 px-5 bg-dark-700 text-white">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Image src="/logo.png" alt="logo" width={40} height={40} />{" "}
          <p className="font-semibold hidden lg:flex text-2xl">TechBlog</p>
        </div>
        {/* Logo */}
        <ul className="flex gap-5">
          <li>Home</li>
          <li>News</li>
          <li>Podcasts</li>
          <li>Resourses</li>
        </ul>
        {user ? (
          <div>
            <div className="h-12 w-12 rounded-full flex justify-center items-center text-dark-800 font-medium shadow-md shadow-yellow-600 bg-yellow-600">
              {shortName}
            </div>
          </div>
        ) : (
          <div className="flex gap-5">
            <button className="bg-yellow-800 text-dark-800  px-6 py-1.5 rounded-md">
              <a href="/login">Login</a>
            </button>

            <button className="bg-dark-800 text-gray-300  px-6 py-1.5 rounded-md">
              Sign up
            </button>
          </div>
        )}
      </nav>
      {/* make the mobile version */}
      <nav className="relative  w-full flex md:hidden z-20 justify-between items-center 2xl:px-32 py-5 lg:px-6 px-5 bg-dark-700 text-white">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="logo" width={30} height={30} />{" "}
          <p className="font-semibold text-lg">TechBlog</p>
        </div>
        {/* Logo */}
        {/* in the mobile version, the links and buttons will be in the same parent div */}
        <div
          className={`absolute top-0 left-0 w-full h-screen bg-dark-700 text-white transition-all duration-300 ${
            isOpen
              ? "opacity-100   pointer-events-auto"
              : "opacity-0  pointer-events-none"
          } flex flex-col items-center justify-center`}
        >
          <div
            className="absolute top-5 right-4"
            onClick={() => setIsOpen(!isOpen)}
          >
            <XMarkIcon className="w-6 h-6" />
          </div>
          <ul className="flex gap-5 flex-col items-center">
            <li>Home</li>
            <li>News</li>
            <li>Podcasts</li>
            <li>Resourses</li>
          </ul>
          <div className="flex gap-5 flex-col items-center mt-10">
            <button className="bg-yellow-800 text-dark-800  px-6 py-1.5 rounded-md">
              Login
            </button>

            <button className="bg-dark-800 text-gray-300  px-6 py-1.5 rounded-md">
              Sign up
            </button>
          </div>
        </div>
        <div className="flex items-center">
          <Bars3Icon className="h-6 w-6" onClick={() => setIsOpen(!isOpen)} />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
