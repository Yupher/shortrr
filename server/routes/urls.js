const express = require("express");
const mongoose = require("mongoose");
const Urls = require("../models/Urls");
const validUrl = require("valid-url");
const router = express.Router();

router.post("/", async (req, res) => {
  let { url } = req.body;

  if (!url || !validUrl.isUri(url)) {
    return res.status(404).json({ message: "please enter a valide URL" });
  }
  let cookie = ``;
  try {
    let newUrl = new Urls();
    newUrl.data.push({ originalUrl: url });
    //console.log(newUrl)
    await newUrl.save();
    let [{ shortid }] = newUrl.data;
    res.json({ shortUrl: `${req.protocol}://${req.hostname}/${shortid}` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something wrong with the server" });
  }
});
/* router.get('/', async (req,res)=>{
    try {
        let urls = await Urls.findAll()
    } catch (error) {
        
    }
}) */
router.get("/:shortid", async (req, res) => {
  let { shortid } = req.params;
  try {
    let url = await Urls.findOne({ "data.shortid": shortid });
    //console.log(url);
    if (!url) {
      return res.status(404).json({ message: "URL not found " });
    }
    let [{ id, clicks, originalUrl }] = url.data;
    //console.log((url._id));
    url.data.forEach(obj =>{
        obj.clicks++
        
    })
    await url.save(); 
    res.redirect(`${originalUrl}`);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong with the server.." });
  }
});
module.exports = router;
