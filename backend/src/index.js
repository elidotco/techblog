const app = require("./app");

const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const db = require("./config/db");
db.catch((err) => {
  console.log(err);
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
