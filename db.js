const fs = require("fs");
const filePath = "receipes.file.json";

let receipes = [];

const writeReceipesFile = () => {
  fs.writeFileSync(filePath, JSON.stringify(receipes));
};
const loadReceipesFromFile = () => {
  const data = fs.readFileSync(filePath, { encoding: "utf-8" });
  receipes = JSON.parse(data);
};

const getAllReceipes = () => {
  return receipes;
};

//add a new receipe

const findReceipe = (id) => {
  const rindex = receipes.findIndex((receipe) => receipe.id == id);
  if (rindex == 0) {
    return null;
  }
  return receipes[rindex];
};

//insert new receipe

const addReceipe = (Rname) => {
  const newReceipe = {
    id: new Date().getTime(),
    name: Rname,
  };
  receipes.push(newReceipe);

  return newReceipe;
};

module.exports = {
  receipes,
  writeReceipesFile,
  loadReceipesFromFile,

  //utilities function
  getAllReceipes,

  addReceipe,
  findReceipe,
};
