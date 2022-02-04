const db = require("better-sqlite3")("yummy.db", { fileMustExist: true });

const { Router } = require("express");
const { receipes } = require("./db");

const router = Router();

//return all receipes
router.get("/", (req, res) => {
  const recipes = db.prepare("SELECT id,name FROM recipes;").all();
  res.send(recipes);
});

//return specific receipe

router.get("/:id", (req, res) => {
  const recipes = db
    .prepare(
      `SELECT recipes.id,recipes.name,receipe_text.text recipe_text
    FROM
    recipes
    INNER JOIN receipe_text
    ON recipes.id = receipe_text.receipe
    WHERE recipes.id = ?;`
    )
    .get(req.params.id);
  if (!recipes) {
    return res.status(404).json({
      message: `${req.params.id} not in the list`,
    });
  }
  res.send(recipes);
});

//add new receipe
router.post("/", (req, res) => {
  const payload = req.body;
  if (!payload.name || !payload.text) {
    return res.status(404).send({ message: "receipe should have a name" });
  }
  addReceipe(payload.name);
  writeReceipesFile();
  return res.status(201).send(payload);
});

//delete a receipe

router.delete("/:id", (req, res) => {
  //checking weather the recipe is present on the table

  const recipes = db
    .prepare(
      `SELECT recipes.id
    FROM
    recipes
    WHERE recipes.id = ?;`
    )
    .get(req.params.id);
  if (!recipes) {
    return res.status(404).json({
      message: `${req.params.id} not in the list`,
    });
  }

  //deleting recipe_text from the table first

  db.prepare(
    `DELETE FROM receipe_text
    WHERE receipe=@receipeId;
    `
  ).run({ receipeId: req.params.id });

  //deleting recipe from the table

  db.prepare(
    `DELETE FROM recipes
  WHERE id=@rId`
  ).run({ rId: req.params.id });

  res.send(recipes);
});

//update a receipe

router.put("/:id", (req, res) => {
  const payload = req.body;
  if (!payload.name || !payload.text) {
    return res.send({ message: "receipe should have a name" });
  }

  //find the recipe to update
  const recipes = db
    .prepare(
      `SELECT recipes.id
    FROM
    recipes
    WHERE recipes.id = ?;`
    )
    .get(req.params.id);
  if (!recipes) {
    return res.status(404).json({
      message: `${req.params.id} not in the list`,
    });
  }

  //update
  db.prepare(
    `UPDATE  recipes
    SET name=@name
    WHERE id=@receipeId;
    `
  ).run({ receipeId: req.params.id, name: payload.name });

  db.prepare(
    `UPDATE  receipe_text
    SET text=@text
    WHERE receipe=@receipeId;
    `
  ).run({ receipeId: req.params.id, text: payload.text });

  return res.send({
    id: recipes.id,
    name: payload.name,
    text: payload.text,
  });
});

module.exports = router;
