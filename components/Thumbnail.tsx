import Image from "next/image";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";
import { Movie } from "../typing";
import { baseUrl } from "../utils/requests";

interface Props {
  // when using firebase
  // movie: Movie | DocumentData; 
  movie: Movie;
}

function Thumbnail({ movie }: Props) {

  const [showModal, setShowModal] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);

  return (
    <div
      className="relative cursor-pointer transition duration-200
      h-28 min-w-[180px] md:h-36 md:min-w-[260px] md:hover:scale-105"
      onClick={() => {
        setCurrentMovie(movie);
        setShowModal(true);
      }}
    >
      <Image
        className="object-cover rounded-sm md:rounded"
        src={`${baseUrl}/w500/${
          movie.backdrop_path || movie.poster_path
        }`}
        alt=""
        layout="fill"
      />
    </div>
  );
}

export default Thumbnail;
