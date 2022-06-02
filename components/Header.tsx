import { BellIcon, SearchIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import BasicMenu from "./BasicMenu";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 0 ? setIsScrolled(true) : setIsScrolled(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${isScrolled && "bg-netflixgray-900"}`}>
      {/* Header Left */}
      <div className="flex items-center space-x-2 md:space-x-10">
        <Image
          className="cursor-pointer object-contain"
          src="/logo.svg"
          alt=""
          layout="fixed"
          width="100"
          height="32"
        />

        <BasicMenu />

        <ul className="hidden space-x-4 md:flex">
          <li className="headerLink">Home</li>
          <li className="headerLink">TV Shows</li>
          <li className="headerLink">Moives</li>
          <li className="headerLink">New & Popular</li>
          <li className="headerLink">My List</li>
        </ul>
      </div>

      {/* Header Right */}
      <div className="flex items-center space-x-4 text-sm font-light">
        <SearchIcon className="hidden sm:inline h-6 w-6 " />
        <p className="hidden lg:inline">Kids</p>
        <BellIcon className="h-6 w-6" />
        <Link href="/account">
          <div>
            <Image
              className="cursor-pointer rounded"
              src="/avatar.png"
              alt=""
              layout="fixed"
              width="32"
              height="32"
            />
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
