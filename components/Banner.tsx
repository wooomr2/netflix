import Image from "next/image";
import { useEffect, useState } from "react";
import { Movie } from "../typing";
import { baseUrl } from "../utils/requests";
import { FaPlay } from "react-icons/fa";
import { InformationCircleIcon } from "@heroicons/react/solid";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";

interface Props {
  netflixOriginals: Movie[];
}

function Banner({ netflixOriginals }: Props) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);

  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    );
  }, []);

  return (
    <div className="flex flex-col py-16 space-y-2 md-space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen">
        <Image
          src={`${baseUrl}/original/${movie?.backdrop_path || movie?.poster_path}`}
          alt=""
          layout="fill"
          objectFit="cover"
        />
      </div>

      <h1 className="font-bold text-2xl md:text-4xl lg:text-7xl">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="max-w-xs text-shadow-lg text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
        {movie?.overview}
      </p>

      <div className="flex space-x-3">
        <button className="bannerBtn bg-white text-black">
          <FaPlay className="text-black h-4 w-4 md:h-7 md:w-7" /> Play
        </button>
        <button
          className="bannerBtn bg-[gray]/70"
          onClick={() => {
            setCurrentMovie(movie);
            setShowModal(true);
          }}
        >
          <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8" /> More Info
        </button>
      </div>
    </div>
  );
}

export default Banner;
