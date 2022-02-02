const express = require("express");
const app = express();
const port = 8000;
app.listen(port, (err) => {
  if (err) {
    console.error(err);
    process.exit;
  }
  console.log(`Server is running on port ${port}`);
});
