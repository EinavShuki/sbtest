import express from "express";
import peopleRoutes from "./routes/peopleRoutes.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const app = express();

//so we can read json from req.body
app.use(express.json());

app.use("/api/", peopleRoutes);

app.listen(5000, console.log("Server listen to port 5000"));
//so I can see this when I go to port5000
app.get("/", (req, res) => {
  res.send("API is runinng");
});
