import express, { Request, Response } from "express";
import userRouter from "./routes/user.route";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import connectToDb from "./db/db";
import User from "./models/user.model";
import dotenv from "dotenv";
import requireAuth from "./middleware/requireAuth";

dotenv.config();
const MONGODB_URL =
  process.env.MONGODB_URL || "mongodb://localhost:27017/chat-app";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  })
);
app.use(express.json());

connectToDb(MONGODB_URL);

app.use("/api/user", userRouter);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected");
});

server.listen(3000, () => {
  console.log("Server is running on port 3000...");
});
