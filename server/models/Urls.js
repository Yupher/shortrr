const mongoose = require("mongoose");
const shortid = require("shortid");
const schema = mongoose.Schema;

let urlsSchema = new schema({
  data: [
    {
      originalUrl: String,
      shortid: {
        type: String,
        default: shortid.generate,
      },
      date: {
        type: Date,
        default: Date.now(),
      },
      clicks: {
        type: Number,
        default: 0,
      },
    },
  ],
});

module.exports = Urls = mongoose.model("urls", urlsSchema);
