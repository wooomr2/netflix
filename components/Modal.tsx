import {
  CheckIcon,
  PlusIcon,
  ThumbUpIcon,
  VolumeOffIcon,
  VolumeUpIcon,
  XIcon,
} from "@heroicons/react/outline";
import MuiModal from "@mui/material/Modal";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";
import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import { Element, Genre, Movie } from "../typing";
import { collection, deleteDoc, doc, DocumentData, onSnapshot, setDoc } from "firebase/firestore";
import useAuth from "../hooks/useAuth";
import { API_KEY, BASE_URL } from "../utils/requests";
import { FaPlay } from "react-icons/fa";
import { db } from "../libs/firebase";
import toast, { Toaster } from "react-hot-toast";

function Modal() {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  const [isAddedToList, setIsAddedToList] = useState(false);
  const [muted, setMuted] = useState(true);
  const [trailer, setTrailer] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [movies, setMovies] = useState<DocumentData[] | Movie[]>([]);
  const { user } = useAuth();

  const toastStyle = {
    background: "white",
    color: "black",
    fontWeight: "bold",
    fontSize: "16px",
    padding: "15px",
    borderRadius: "9999px",
    maxWidth: "1000px",
  };

  useEffect(() => {
    if (!currentMovie) return;

    async function fetchMovie() {
      const data = await fetch(
        `${BASE_URL}/${currentMovie?.media_type === "tv" ? "tv" : "movie"}/${
          currentMovie?.id
        }?api_key=${API_KEY}&language=en-US&append_to_response=videos`
      ).then((response) => response.json());

      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === "Trailer"
        );
        setTrailer(data.videos?.results[index]?.key);
      }
      if (data?.genres) setGenres(data.genres);
    }

    fetchMovie();
  }, [currentMovie]);

  // Find all the movies in users myList
  useEffect(() => {
    if (user) {
      return onSnapshot(
        collection(db, "customers", user.uid, "myList"),
        (snapshot) => setMovies(snapshot.docs)
      );
    }
  }, [user, currentMovie?.id]);

  // Check if the currentMovie is already in the users myList
  //findIndex ==> true면 1 아니면 -1
  useEffect(
    () =>
      setIsAddedToList(
        movies.findIndex((result) => result.data().id === currentMovie?.id) !==
          -1
      ),
    [movies]
  );

  const handleClose = () => {
    setShowModal(false);
    setCurrentMovie(null)
    toast.dismiss()
  };

  const handleList = async () => {
    if (isAddedToList) {
      await deleteDoc(
        doc(db, "customers", user!.uid, "myList", currentMovie?.id.toString()!)
      );

      toast(
        `${
          currentMovie?.title || currentMovie?.original_name
        } My List에서 제외.`,
        {
          duration: 5000,
          style: toastStyle,
        }
      );
    } else {
      await setDoc(
        doc(db, "customers", user!.uid, "myList", currentMovie?.id.toString()!),
        {
          ...currentMovie,
        }
      );

      toast(
        `${currentMovie?.title || currentMovie?.original_name} My List에 추가.`,
        {
          duration: 5000,
          style: toastStyle,
        }
      );
    }
  };

  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className="fixed !top-7 left-0 right-0 mx-auto w-full max-w-5xl rounded-md 
        overflow-hidden overflow-y-scroll scrollbar-hide"
    >
      <>
        <Toaster position="bottom-center" />
        {/* X close button */}
        <button
          onClick={handleClose}
          className="modalBtn absolute right-5 top-5 !z-40 h-9 w-9
            border-none bg-netflixgray-900 hover:bg-netflixgray-900"
        >
          <XIcon className="h-6 w-6" />
        </button>

        {/* Trailer */}
        <div className="relative pt-[56.25%]">
          {/* Video */}
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{ position: "absolute", top: "0", left: "0" }}
            playing
            muted={muted}
          />

          {/* Buttons */}
          <div className="absolute flex items-center justify-between w-full bottom-10 px-10">
            {/* Play & List & Thumbs */}
            <div className="flex space-x-2">
              <button className="flex items-center gap-x-2 px-8 rounded bg-white text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
                <FaPlay className="h-7 w-7 text-black" />
                Play
              </button>

              <button className="modalBtn" onClick={handleList}>
                {isAddedToList ? (
                  <CheckIcon className="h-7 w-7" />
                ) : (
                  <PlusIcon className="h-7 w-7" />
                )}
              </button>

              <button className="modalBtn">
                <ThumbUpIcon className="h-7 w-7" />
              </button>
            </div>
            {/* Volume */}
            <button className="modalBtn" onClick={() => setMuted(!muted)}>
              {muted ? (
                <VolumeOffIcon className="h-6 w-6" />
              ) : (
                <VolumeUpIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col space-y-6 px-10 py-8 text-lg rounded-b-md bg-[#181818] ">
          {/* Match & Date & HD */}
          <div className="flex items-center space-x-2 text-sm">
            <p className="font-semibold text-green-400">
              {currentMovie?.vote_average * 10}% Match
            </p>

            <p className="font-light">
              {currentMovie?.release_date || currentMovie?.first_air_date}
            </p>

            <div
              className="flex items-center justify-center h-4 px-1.5
              text-xs rounded border border-white/40"
            >
              HD
            </div>
          </div>
          {/* Overview & Genres & Lang & Votes */}
          <div className="flex flex-col md:flex-row gap-y-4 font-light">
            <p className="w-5/6">{currentMovie?.overview}</p>

            <div className="flex flex-col space-y-3 text-sm">
              <div>
                <span className="text-[gray]">Genres: </span>
                {genres.map((genre) => genre.name).join(", ")}
              </div>

              <div>
                <span className="text-[gray]">Original language: </span>
                {currentMovie?.original_language}
              </div>

              <div>
                <span className="text-[gray]">Total votes: </span>
                {currentMovie?.vote_count}
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  );
}

export default Modal;
