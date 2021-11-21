import express from "express";
import peopleRoutes from "./routes/peopleRoutes.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import path from "path";

dotenv.config();

connectDB();

const app = express();

//so we can read json from req.body
app.use(express.json());

app.use("/api/", peopleRoutes);

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

//hadle errors in server side by middlewares
app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT || 5000, console.log("Server listen to port 5000"));
//so I can see this when I go to port5000
