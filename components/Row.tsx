import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { DocumentData } from "firebase/firestore";
import { useRef, useState } from "react";
import { Movie } from "../typing";
import Thumbnail from "./Thumbnail";

interface Props {
  title: string;
  movies: Movie[] | DocumentData[];
}

function Row({ title, movies }: Props) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);

  const handleClick = (direction: string) => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  // console.log(rowRef.current?.scrollLeft, rowRef.current?.clientWidth);

  return (
    <div className="h-40 space-y-0.5 md:space-y-2">
      <h2
        className="w-56 cursor-pointer font-semibold text-netflixgray-100
      transition duration-200 hover:text-white text-sm md:text-2xl"
      >
        {title}
      </h2>
      <div className="group relative md:-ml-2">
        <ChevronLeftIcon
          className={`chevronIcon left-2 ${!isMoved && "hidden"}`}
          onClick={() => handleClick("left")}
        />
        <div
          ref={rowRef}
          className="flex items-center overflow-x-scroll scrollbar-hide
          space-x-0.5 md:space-x-2.5 md:p-2"
        >
          {movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>
        <ChevronRightIcon
          className="chevronIcon right-2"
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
}

export default Row;
