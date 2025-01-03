import Image from "next/image";
import Link from "next/link";
import { HeroSection } from "./sections";
import { Banner } from "./components";

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
      <div className="w-full h-screen"></div>
    </>
  );
}
