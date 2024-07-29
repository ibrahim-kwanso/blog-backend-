import dotenv from 'dotenv';
import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { authenticateToken } from "./middlewares/auth.middleware.js";
import db from "./models/index.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use("/users", authenticateToken, userRoutes);
app.use("/posts", authenticateToken, postRoutes);
app.use("/comments", authenticateToken, commentRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res)=>{
  res.send("Server Started, try /users");
})

const dbSync = async () => {
  try {
    await db.sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

dbSync();
