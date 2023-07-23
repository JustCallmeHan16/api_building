require("dotenv").config();

const express = require("express");
const app = express();
const db = require("./database/mongodb");

const blogRoutes = require("./routes/blog");

db();

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api", blogRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server was listen on http://localhost:${PORT}/api/blog`);
});