import Image from "next/image";
import Link from "next/link";
import { FeaturesSection, HeroSection } from "./sections";
import { Banner } from "./components";
import BlogPreviewSection from "./sections/BlogPreview";

export default function Home() {
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
      <BlogPreviewSection />
    </>
  );
}
