import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <nav className=" text-white bg-[#1e1e1e] py-4 top-0 z-[20] fixed  w-full">
      <div className="flex justify-between w-[90%] mx-auto items-center">
        <Link href={"/"}>
          <h2 className="font-Grotesk font-semibold text-2xl cursor-pointer">
            SafeX
          </h2>
        </Link>

        <div className="flex gap-10 items-center">
          <ul className="flex gap-14 uppercase font-thin text-sm tracking-widest">
            <li className="hover:scale-105 hover:font-semibold cursor-pointer transition-all 0.1s ease-in-out">
              <Link href="/create-new">Create Safe</Link>
            </li>
            <li className="hover:scale-105 hover:font-semibold cursor-pointer transition-all 0.1s ease-in-out">
              <Link href="/fundsTransfer">Funds Transfer</Link>
            </li>
            <li className="hover:scale-105 hover:font-semibold cursor-pointer transition-all 0.1s ease-in-out">
              <Link href="/existingInfo">Existing safe info</Link>
            </li>
          </ul>
        </div>
        <div className={"flex items-center justify-end"}>
          <ConnectButton />
        </div>
      </div>
    </nav>
  );
};

export default Header;
