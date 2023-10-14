import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import React from "react";
// import WalletSelector from "./walletSelector";

const Header = () => {
  return (
    <div
      id={"head"}
      className={
        "fixed inset-x-0 top-0 z-50 w-full border-b border-primary-100"
      }
    >
      <div className={"bg-primary-50/95"}>
        <div className={"mx-auto flex flex-row justify-between p-4"}>
          <div className={"flex items-center justify-start"}>
            <Link href={"/"}>
              <div
                className={
                  "flex items-center justify-center rounded-full bg-white p-2"
                }
              >
                {/* <Logo className={"h-4 w-4"} /> */}
              </div>
            </Link>
          </div>
          <div className={"flex items-center justify-end"}>
            <ConnectButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
