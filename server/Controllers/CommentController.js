const CommentModel = require("../models/CommentModel");
const asyncHandler = require("express-async-handler");

const createComment = asyncHandler(async (req, res) => {
  try {
    const { tmdb_id, content, type } = req.body;
    const { _id: userId, name } = req.user;
    const comment = await CommentModel.create({
      userId,
      name,
      tmdb_id,
      type,
      content,
    });
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// const updateComment = asyncHandler(async (req, res) => {
//   const { id, tmdb_id, content, type } = req.body;
//   const { _id: userId, name } = req.user;

//   try {
//     const comment = await CommentModel.findByIdAndUpdate(
//       id,
//       { userId, name, tmdb_id, content, type },
//       { new: true }
//     );
//     if (!comment) {
//       return res.status(404).json({ message: "Comment not found" });
//     }
//     res.status(200).json(comment);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

const updateComment = asyncHandler(async (req, res) => {
  const { id, tmdb_id, content, type } = req.body;
  const { _id: userId, name } = req.user;

  // Create an update object
  let update = {};

  // Only add properties to the update object if they exist in the request body
  if (tmdb_id) update.tmdb_id = tmdb_id;
  if (content) update.content = content;
  if (type) update.type = type;

  // Always include userId and name, as they're not coming from the request body
  update.userId = userId;
  update.name = name;

  try {
    const comment = await CommentModel.findByIdAndUpdate(id, update, {
      new: true,
    });
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deleteComment = asyncHandler(async (req, res) => {
  const { id } = req.body;

  try {
    const comment = await CommentModel.findByIdAndDelete(id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getComments = asyncHandler(async (req, res) => {
  const { TMDB_ID } = req.body;
  try {
    let comments;
    if (TMDB_ID) {
      comments = await CommentModel.find({ TMDB_ID });
    } else {
      comments = await CommentModel.find();
    }
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = {
  createComment,
  updateComment,
  deleteComment,
  getComments,
};
