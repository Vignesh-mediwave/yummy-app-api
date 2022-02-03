const db = require("better-sqlite3")("yummy.db", { fileMustExist: true });

const { Router } = require("express");

const router = Router();

//return all receipes
router.get("/", (req, res) => {
  const recipes = db.prepare("SELECT id,name FROM recipes;").all;
  res.send(recipes);
});

//return specific receipe

router.get("/:id", (req, res) => {
  const receipe = receipes.find((receipe) => receipe.id == req.params.id);
  if (!receipe) {
    return res.status(404).json({
      message: `${req.params.id} not in the list`,
    });
  }
  res.send(receipe);
});

//add new receipe
router.post("/", (req, res) => {
  const payload = req.body;
  if (!payload.name) {
    return res.status(404).send({ message: "receipe should have a name" });
  }
  addReceipe(payload.name);
  writeReceipesFile();
  return res.status(201).send(payload);
});

//delete a receipe

router.delete("/:id", (req, res) => {
  const index = receipes.findIndex((receipe) => receipe.id == req.params.id);
  if (index == -1) {
    return res.status(404).json({ message: "receipe not found" });
  }
  const deletereceipes = receipes[index];
  receipes.splice(index, 1);
  res.send(deletereceipes);
});

//update a receipe

router.put("/:id", (req, res) => {
  const payload = req.body;
  if (!payload.name) {
    return res.send({ message: "receipe should have a name" });
  }

  const uIndex = receipes.findIndex((receipe) => receipe.id == req.params.id);
  if (uIndex == -1) {
    return res.source(404).json({
      message: `${req.params.id} is not found`,
    });
  }
  receipes[uIndex]["name"] = payload.name;
  return res.send(receipes[uIndex]);
});

module.exports = router;
