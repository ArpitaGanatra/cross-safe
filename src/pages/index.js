import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "@chakra-ui/react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <header className="bg-[#1E1e1e] h-screen bg-[url('/new-bg.svg')] bg-center">
      <section className="w-[85%] mx-auto h-[95%] flex flex-col justify-between">
        <div className="w-[80%] mx-auto py-32 text-center mt-16">
          <h2 className="text-white  font-Grotesk text-5xl mb-6 tracking-wide leading-[50px]">
            <span className="bg-gradient-to-r text-transparent bg-clip-text from-[#FD42FB] via-[#CD9ECD] to-[#753FF3] ">
              Multi-chain Safes
              <br />
            </span>{" "}
            One address - all chains
          </h2>

          <p className="text-gray-400 w-[60%] mx-auto font-Grotesk">
            Deploy, transact and sign your safe to any chain. <br />
            (Currently, we only have 2 chains due to time constraints)
          </p>
          <Link href={"/about"}>
            <button className="py-3 px-8 mt-8 border font-Grotesk font-semibold border-gray-200 rounded-full bg-gradient-to-r text-transparent bg-clip-text from-[#FD42FB] via-[#CD9ECD] to-[#753FF3] hover:scale-105 transition-all 0.1s ease-in-out ">
              Get Started
            </button>
          </Link>
        </div>
      </section>
    </header>
  );
}
