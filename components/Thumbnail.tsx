import Image from "next/image";
import { Movie } from "../typing";

interface Props {
  // when using firebase
  // movie: Movie | DocumentData; 
  movie: Movie;
}

function Thumbnail({ movie }: Props) {
  return (
    <div
      className="relative cursor-pointer transition duration-200
      h-28 min-w-[180px] md:h-36 md:min-w-[260px] md:hover:scale-105"
    >
      <Image
        className="object-cover rounded-sm md:rounded"
        src={`https://image.tmdb.org/t/p/w500/${
          movie.backdrop_path || movie.poster_path
        }`}
        alt=""
        layout="fill"
      />
    </div>
  );
}

export default Thumbnail;
