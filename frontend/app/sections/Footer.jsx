import React from "react";
import { Banner } from "../components";

const Footer = () => {
  return (
    <footer className="">
      {/* Top section  */}
      <section className="px-5 md:px-10 lg:px-20 2xl:px-32 bg-dark-700 min-h-72">
        <div className="flex gap-x-10 items-center py-20">
          <img src="/logo.png" className="w-20 h-20 " />
          <div className="flex flex-col">
            <Banner
              data={{
                title: "Learn, Connect, and Innovate",
                excerpt: "Be Part of the Future Tech Revolution",
              }}
              type={1}
            />
            <p className="text-gray-800 text-sm py-4">
              Immerse yourself in the world of future technology. Explore our
              comprehensive resources, connect with fellow tech enthusiasts, and
              drive innovation in the industry. Join a dynamic community of
              forward-thinkers.
            </p>
          </div>
        </div>
      </section>
      {/* Top section  */}
    </footer>
  );
};

export default Footer;
