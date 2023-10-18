import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "@chakra-ui/react";
import Link from "next/link";

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
          <Button colorScheme="green">
            <Link href="/create-new">Create Safe</Link>
          </Button>
          <Button colorScheme="green">Accept Txn</Button>
          OR
          <Button colorScheme="green">Existing safe info</Button>
        </div>
      </div>
    </main>
  );
}
