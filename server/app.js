const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/shortrr", {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongodb conected..."))
  .catch((e) => console.log(`mongodb error: ${e}`));

app.use("/", require("./routes/urls"));

let port = process.env.PORT || 5000;
app.listen(port, (err) => {
  if (err) throw err;
  console.log(`server running at port ${port}....`);
});
