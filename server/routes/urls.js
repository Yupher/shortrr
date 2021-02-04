const express = require("express");
const Urls = require("../models/Urls");
const validUrl = require("valid-url");
const shortId = require("shortid");
const router = express.Router();

router.get("/", async (req, res) => {
  let { id } = req.cookies;
  try {
    let user = await Urls.findById(id);
    if (!id || !user) {
      let newUser = new Urls();
      await newUser.save();
      res.setHeader(
        "Set-Cookie",
        `id=${newUser.id};path=/;Expires=${new Date(
          2258713325040
        ).toUTCString()};httpOnly=false;hostOnly=true,sameSite=none`
      );
      return res.json(newUser);
    }

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong with the server" });
  }
});
router.post("/", async (req, res) => {
  let { url } = req.body;
  let { id } = req.cookies;

  if (!url || !validUrl.isUri(url)) {
    return res.status(404).json({ message: "please enter a valide URL" });
  }
  try {
    let user = await Urls.findById(id);
    let shortid = shortId.generate();

    user.data.push({
      originalUrl: url,
      shortid,
      shortUrl: `${req.protocol}://${req.hostname}/${shortid}`,
    });

    await user.save();
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something wrong with the server" });
  }
});

router.get("/:shortid", async (req, res) => {
  let { shortid } = req.params;
  try {
    let url = await Urls.findOne({ "data.shortid": shortid });
    //console.log(url);
    if (!url) {
      return res.status(404).json({ message: "URL not found " });
    }
    let [{ originalUrl }] = url.data;
    //console.log((url._id));
    url.data.forEach((obj) => {
      obj.clicks++;
    });
    await url.save();
    res.redirect(`${originalUrl}`);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong with the server.." });
  }
});

router.delete("/all", async (req, res) => {
  let { id } = req.cookies;
  try {
    let user = await Urls.findById(id);
    user.data.splice(0, user.data.length);
    await user.save();
    res.json({ message: "urls deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong with the server" });
  }
});

router.delete("/:shortid", async (req, res) => {
  let { shortid } = req.params;
  let { id } = req.cookies;
  try {
    let user = await Urls.findById(id);
    let index = user.data.findIndex((i) => i.shortid === shortid);
    //console.log(index)
    user.data.splice(index, 1);
    //console.log(user)
    await user.save();
    res.json({ message: "url deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong with the server" });
  }
});

module.exports = router;
