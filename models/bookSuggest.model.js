const mongoose = require("mongoose");

const suggestBookForTheMonth = mongoose.model(
  "suggestBookForTheMonth",
  new mongoose.Schema(
    {
      suggested: Boolean,
      month: Number,
      book_id: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
      user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    {
      timestamps: true,
    }
  )
);

module.exports = suggestBookForTheMonth;
