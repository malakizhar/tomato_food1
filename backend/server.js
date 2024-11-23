import express from "express";
import cors from "cors";
import { ConnectDb } from "./config/Db.js";
import dotenv from "dotenv";
import foodRouter from "./routes/foodRoute.js";
import { userRouter } from "./routes/userRoute.js";
import cartRoutes from "./routes/cartRoutes.js";
import { orderRoutes } from "./routes/orderRoute.js";
//appp config

const app = express();
const port = 4000;

//middlerware

app.use(express.json());
app.use(cors());
dotenv.config();

//db connect
ConnectDb();

//api endPoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRoutes);
app.use("/api/order",orderRoutes)
app.get("/", (req, res) => {
  res.send("AII I WORKING");
});

app.listen(port, () => {
  console.log("server is runing on port 4000");
});
