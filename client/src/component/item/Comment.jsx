import React from "react";
const Comment = ({ commentaire, Username, DateAdded }) => {
  return (

    <div className="relative w-full min-h-44 flex flex-col  text-base text-white-50 bg-curious-blue-800 bg-opacity-30 backdrop-blur-lg shadow-sm  hover:bg-ebony-clay-400 p-2 rounded-lg my-2 ">
     <div className="relative felx flex-row">
        <span className="text-base text-curious-blue-300 ">{Username}</span>
        <span className="text-base text-ebony-clay-200"> | </span>
        <span className="text-base  text-ebony-clay-200 italic">{DateAdded}</span>
      </div>
      <div className="relative text-white-50 ">{commentaire} </div>

      
    </div>
  );
};

export default Comment;
