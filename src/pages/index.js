import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "@/components/button";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className} homeBG`}
    >
      <div className="z-10 max-w-5xl ">
        <h1 className="text-9xl font-bold mt-36">
          Hassle free <span className="text-[#69f0ae]">multi-chain safe</span>
        </h1>
        <p className="text-2xl">
          Fancy fact: Get the same address on all chains
        </p>

        <div>
          <Button className="text-black">Create Safe</Button>
          <Button className="text-black">Accept Txn</Button>
          OR
          <Button className="text-black">Existing safe info</Button>
        </div>
      </div>
    </main>
  );
}
