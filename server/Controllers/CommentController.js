const CommentModel = require("../models/CommentModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

exports.createComment = async (req, res) => {
  try {
    const { userId, username, TMDB_ID, content, Type } = req.body;
    const comment = await CommentModel.create({
      userId,
      username,
      TMDB_ID,
      content,
      Type,
    });
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, username, TMDB_ID, content, Type } = req.body;
    const comment = await CommentModel.findByIdAndUpdate(
      id,
      { userId, username, TMDB_ID, content, Type },
      { new: true }
    );
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await CommentModel.findByIdAndDelete(id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getComments = async (req, res) => {
  try {
    const { TMDB_ID } = req.params;
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
};