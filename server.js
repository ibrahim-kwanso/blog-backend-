require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const authRoutes = require("./routes/authRoutes");
const { authenticateToken } = require("./middlewares/authMiddleware");
const { sequelize } = require("./models");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use("/users", authenticateToken, userRoutes);
app.use("/posts", authenticateToken, postRoutes);
app.use("/comments", authenticateToken, commentRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res)=>{
  res.send("Hello World");
})

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
