const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "user",
    },
    heading: {
      type: String,
      required: [true, "Please add heading"],
    },
    describtion: {
      type: String,
      required: [true, "Please add describtion"],
    },
    blogContent: {
      type: String,
      required: [true, "Please add blogdata"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", blogSchema);
