const express = require("express");
const app = express();
const port = 8000;
const receipeRoute = require("./receipe.route");

const { loadReceipesFromFile } = require("./db");

loadReceipesFromFile();

app.use(express.json());

app.use("/receipes", receipeRoute);
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
