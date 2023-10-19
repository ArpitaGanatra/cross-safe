import Image from "next/image";
import React from "react";

const data = [
  {
    id: 1,
    img: "/register2.png",

    title: "Create an safe",
    subtitle: "Generate a secure safe in seconds.",
    text: "SafeX supports all the ethereum wallets like Metamask and Ledger.",
  },
  {
    id: 2,
    img: "/buying.png",
    title: "Add/ withdraw funds",
    subtitle: "Any signer can add/withdraw crypto.",
    text: "Add funds to the chain safe is deployed. Or add USDC to withdraw it from any desired chain the safe is deployed to.",
  },
  {
    id: 3,
    img: "/trade.png",
    title: "Manage treasury from any chain",
    subtitle:
      "Just put the safe address and sign the transaction from any chain.",
    text: "We just have 2 signers currently for demo purposes",
  },
  {
    id: 4,
    img: "/exchange.png",
    title: "View safe info",
    subtitle:
      "View the owners of the safe, which owners have signed the transaction and other info",
  },
];

const AboutItem = ({ id, img, title, subtitle, text }) => {
  return (
    <section className="border rounded-2xl bg-[#1e1e1e]/30 backdrop-blur-2xl border-gray-700 px-6 pb-5 w-[30rem] relative shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] ">
      <div className="absolute h-14 w-14 top-4 text-white font-Grotesk text-xl flex justify-center items-center  rounded-full bg-gray-500 ">
        {id}
      </div>
      <Image
        src={img}
        width={300}
        height={300}
        className="object-contain mx-auto"
        alt={title}
      />
      <h2 className="bg-gradient-to-r text-transparent bg-clip-text from-[#FD42FB] via-[#CD9ECD] to-[#753FF3] font-Grotesk text-2xl mt-4">
        {title}
      </h2>
      <p className="text-gray-400 mb-2">{subtitle}</p>
      <p className="text-gray-500">{text}</p>
    </section>
  );
};

const About = () => {
  return (
    <section className="bg-[#1e1e1e] min-h-screen bg-[url('/bg2.png')] bg-center bg-fixed py-10">
      <div className="w-[85%] mx-auto pt-20">
        <h2 className="text-center text-4xl font-Grotesk font-semibold mb-3 bg-gradient-to-r text-transparent bg-clip-text from-[#FD42FB] via-[#CD9ECD] to-[#753FF3]">
          How to Use?
        </h2>

        <p className="text-center text-gray-300 font-Grotesk mb-12">
          Treasury management for people from different chains has never been
          easier
        </p>

        {/* Right */}
        <div className=" flex flex-wrap justify-evenly gap-10">
          {data.map((item) => (
            <AboutItem
              key={item.id}
              id={item.id}
              img={item.img}
              title={item.title}
              subtitle={item.subtitle}
              text={item.text}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
