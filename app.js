const express = require("express");
const app = express();
const port = 8000;

app.use(express.json());

const receipes = [
  {
    id: 120,
    name: "chicken-tikka",
  },
  {
    id: 121,
    name: "chicken-tandoori",
  },
  {
    id: 122,
    name: "veg-pizza",
  },
];

//return all receipes
app.get("/receipes", (req, res) => {
  res.send(receipes);
});

//return specific receipe

app.get("/receipes/:id", (req, res) => {
  const receipe = receipes.find((receipe) => receipe.id == req.params.id);
  if (!receipe) {
    return res.status(404).json({
      message: `${req.params.id} not in the list`,
    });
  }
  res.send(receipe);
});

//add new receipe
app.post("/receipes", (req, res) => {
  const payload = req.body;
  if (!payload.name) {
    return res.status(404).send({ message: "receipe should have a name" });
  }
  payload.id = new Date().getTime();
  receipes.push(payload);
  return res.status(201).send(payload);
});

//delete a receipe

app.delete("/receipes/:id", (req, res) => {
  const index = receipes.findIndex((receipe) => receipe.id == req.params.id);
  if (index == -1) {
    return res.status(404).json({ message: "receipe not found" });
  }
  const deletereceipes = receipes[index];
  receipes.splice(index, 1);
  res.send(deletereceipes);
});

//update a receipe

app.put("/receipes/:id", (req, res) => {
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

app.use((req, res, next) => {
  return res.status(404).json({
    message: "resourse not found",
  });
});

app.listen(port, (err) => {
  if (err) {
    console.error(err);
    process.exit;
  }
  console.log(`Server is running on port ${port}`);
});
