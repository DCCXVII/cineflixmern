import React from "react";
const Comment = ({ commentaire, Username, DateAdded }) => {
  return (
    <div className="relative w-full min-h-44 flex flex-col  text-base text-alabaster-50 shadow-sm  p-2 rounded-lg my-2 ">
      <div className="relative felx flex-row mb-3">
        <span className="text-lg text-alabaster-50 ">{Username}</span>
        <span className="text-base text-ebony-clay-200"> | </span>
        <span className="text-base  text-alabaster-100 ">
          {DateAdded}
        </span>
      </div>
      <div className="relative text-white-50 font-Alber_Sans ">{commentaire} </div>
    </div>
  );
};

export default Comment;
