import "dotenv/config";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import express from "express";
import { connectDB } from "./db/connectDB.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { routeNotFound } from "./middleware/routeNotFound.js";
import { authRouter } from "./routes/authRoutes.js";

const app = express();
const port = process.env.PORT || 3000;

//global middleware
app.use(express.json());

//security middleware
app.use(cors());
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  }),
);

//routes mounting middleware
app.use("/api/v1/auth", authRouter);

//error handling middleware
app.use(routeNotFound);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Listening on port ${port}......`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
