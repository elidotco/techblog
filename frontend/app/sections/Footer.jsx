import React from "react";
import { Banner } from "../components";
import { ArrowUpRightIcon } from "@heroicons/react/20/solid";

const data = [
  {
    title: "Home",
    items: [
      "Features",
      "Blogs",
      "Resources (New)",
      "Testimonials",
      "Contact Us",
      "Newsletter",
    ],
  },
  {
    title: "News",
    items: [
      "Trending Stories",
      "Featured Videos",
      "Technology",
      "Health",
      "Politics",
      "Environment",
    ],
  },
  {
    title: "Blogs",
    items: [
      "Quantum Computing",
      "AI Ethics",
      "Space Exploration",
      "Biotechnology (New)",
      "Renewable Energy",
      "Biohacking",
    ],
  },
  {
    title: "Podcasts",
    items: [
      "AI Revolution",
      "AI Revolution (New)",
      "TechTalk AI",
      "AI Conversations",
    ],
  },
  {
    title: "Resources",
    items: ["Whitepapers", "Ebooks", "Reports", "Research Papers"],
  },
];

const Footer = () => {
  return (
    <footer className="">
      {/* Top section  */}
      <section className="px-5 md:px-10 pb-20 lg:px-20 2xl:px-32 bg-dark-700 min-h-72">
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
        <div className="bg-dark-800 gap-y-5 p-5 flex justify-between flex-wrap rounded-lg">
          <FooterCard
            text={`Visitors can access a wide range of resources, including ebooks,
      whitepapers, reports.`}
            title={`Resource Access`}
          />
          <FooterCard
            text={`Visitors can access a wide range of resources, including ebooks,
      whitepapers, reports.`}
            title={`Resource Access`}
          />
          <FooterCard
            text={`Visitors can access a wide range of resources, including ebooks,
      whitepapers, reports.`}
            title={`Resource Access`}
          />
        </div>
      </section>
      {/* Top section  */}

      <section className="flex w-full gap-y-10 flex-wrap justify-between py-20 px-5 md:px-10 pb-20 lg:px-20 2xl:px-32">
        {data.map((items, index) => {
          return (
            <div key={index} className="flex flex-col gap-4 text-dark-100">
              <p className="text-white font-medium pb-6">{items.title}</p>
              {items.items.map((i, index) => {
                return (
                  <p key={index} className="cursor-pointer">
                    {i}
                  </p>
                );
              })}
            </div>
          );
        })}
      </section>
    </footer>
  );
};

export default Footer;

const FooterCard = ({ title, text }) => {
  return (
    <div className="flex flex-col bg-dark-700 rounded-lg border border-dark-600 xl:w-[32%] w-full md:w-[48%] p-5">
      <div className="flex justify-between items-center">
        <p>{title}</p>
        <div className="flex items-center p-3 rounded-full justify-center bg-yellow-800">
          <ArrowUpRightIcon className="h-5 w-5 text-dark-800" />
        </div>
      </div>
      <p className="text-gray-700 text-sm pt-3 ">{text}</p>
    </div>
  );
};
