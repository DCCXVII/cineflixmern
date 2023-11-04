import React from "react";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";

const Popup = ({ isOpen, handleClose, videoKey, site }) => {
  if (!isOpen) {
    return null;
  }

  let origin;
  if (site === "youtube") {
    origin = "https://www.youtube.com/embed/";
  } else if (site === "vimeo") {
    origin = "https://player.vimeo.com/video/";
  }

  if (!videoKey) {
    toast.error("No trailer available");
    return null;
  }

  return (
    <div className="fixed mt-3 top-0 left-0 w-full h-full flex justify-center items-center bg-black-950 bg-opacity-50">
      <div className="bg-black-950 rounded-lg shadow-lg p-8">
        <button
          onClick={handleClose}
          className="bg-medium-purple-950 fixed right-48 top-16 text-alabaster-50 bg-opacity-90  uppercase text-base w-8 h-8 flex p-1 justify-center items-center border-none rounded-full hover:bg-slate-950"
        >
          <IoClose />
        </button>
        <iframe
          width="912"
          height="500"
          src={`https://www.youtube.com/embed/${videoKey}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Popup;
