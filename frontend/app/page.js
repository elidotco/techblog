import Image from "next/image";
import Link from "next/link";
import { HeroSection } from "./sections";

export default function Home() {
  return (
    <>
      <HeroSection />
      <div className="w-full h-screen"></div>
    </>
  );
}
