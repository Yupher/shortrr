const mongoose = require("mongoose");
const schema = mongoose.Schema;

let urlsSchema = new schema({
  data: [
    {
      originalUrl: String,
      shortid: String,
      date: {
        type: Date,
        default: Date.now(),
      },
      clicks: {
        type: Number,
        default: 0,
      },
      shortUrl: String,
    },
  ],
});

module.exports = Urls = mongoose.model("urls", urlsSchema);
