const express = require("express");
const Data = require("../models/Data");
//const isAuth = require("../middleware/auth");

const router = express.Router();

//create data
router.post("/", isAuth, async (req, res) => {
  const { title, description } = req.body;

  const data = new Data({
    title,
    description,
    user: req.session.userId
  });

  await data.save();
  res.status(201).json(data);
});

//read data
router.get("/", isAuth, async (req, res) => {
  const data = await Data.find({
    user: req.session.userId
  });

  res.json(data);
});

//update data 
router.put("/:id", isAuth, async (req, res) => {
  const updatedData = await Data.findOneAndUpdate(
    { _id: req.params.id, user: req.session.userId },
    req.body,
    { new: true }
  );

  if (!updatedData) {
    return res.status(403).json({ message: "Forbidden" });
  }

  res.json(updatedData);
});

//delete data
router.delete("/:id", isAuth, async (req, res) => {
  const deletedData = await Data.findOneAndDelete({
    _id: req.params.id,
    user: req.session.userId
  });

  if (!deletedData) {
    return res.status(403).json({ message: "Forbidden" });
  }

  res.json({ message: "Data deleted" });
});
