import { Cinzel_Decorative } from "next/font/google";

import Image from "next/image";

const cinzel = Cinzel_Decorative({
  weight: "900",
  style: "normal",
  subsets: ["latin"],
});

export function Header() {
  return (
    <div id="header" className="flex flow-row pb-4 pt-2 px-2">
      <h1
        className={`${cinzel.className} small-caps md:text-8xl text-7xl md:pl-8 pl-4 grow`}
      >
        Libre Mei
      </h1>
      <Image
        width={96}
        height={96}
        src="/blank-profile-picture-973460_640.png"
        alt="profile image"
        className="md:w-24 md:h-24 w-16 h-16 rounded-full md:mr-4 mr-2"
      />
    </div>
  );
}
