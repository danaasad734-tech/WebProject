const express = require("express");
const Data = require("../models/Data");  
const router = express.Router();

router.get("/seed", async (req, res) => {
  try {
    await Data.deleteMany({}); 

    const movies = [
      { title: "Toy Story", director: "John Lasseter", genre: "Animation", year: 1995, duration: 81 },
      { title: "The Godfather", director: "Francis Ford Coppola", genre: "Crime", year: 1972, duration: 175 },
      { title: "Parasite", director: "Bong Joon-ho", genre: "Thriller", year: 2019, duration: 132 },
      { title: "Inception", director: "Christopher Nolan", genre: "Sci-Fi", year: 2010, duration: 148 },
      { title: "Spirited Away", director: "Hayao Miyazaki", genre: "Animation", year: 2001, duration: 125 },
      { title: "The Dark Knight", director: "Christopher Nolan", genre: "Action", year: 2008, duration: 152 },
      { title: "Pulp Fiction", director: "Quentin Tarantino", genre: "Crime", year: 1994, duration: 154 },
      { title: "The Matrix", director: "Lana & Lilly Wachowski", genre: "Sci-Fi", year: 1999, duration: 136 },
      { title: "Interstellar", director: "Christopher Nolan", genre: "Sci-Fi", year: 2014, duration: 169 },
      { title: "Coco", director: "Lee Unkrich", genre: "Animation", year: 2017, duration: 105 }
    ];

    await Data.insertMany(movies);
    res.json({ message: "Database populated with 10 Movies! Refresh your homepage." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Data.find({}); 
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  const { title, director, genre, year, duration } = req.body;
  const data = new Data({
    title, director, genre, year, duration,
    user: req.session?.userId 
  });
  await data.save();
  res.status(201).json(data);
});

module.exports = router;