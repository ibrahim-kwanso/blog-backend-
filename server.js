const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const { sequelize } = require("./models");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);

const dbSync = async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

dbSync();
