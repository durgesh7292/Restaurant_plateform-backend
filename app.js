import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./error/error.js";
import reservationRouter from "./routes/reservationRoute.js";
const app = express();
dotenv.config({ path: "./config/config.env" });
app.use(
  cors({
    origin: ["https://restaurant3-hkzc.onrender.com",],

    method: ["POST"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/reservation", reservationRouter);
app.use("/helth", (req, res) => {
  res.status(200).json("hello");
});
dbConnection();
app.use(errorMiddleware);
export default app;
