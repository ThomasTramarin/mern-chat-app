import express from "express";
import authRouter from "./routes/auth.route";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import connectToDb from "./db/db";
const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/chat-app";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
}));
app.use(express.json());

connectToDb(MONGODB_URL);

app.use("/auth", authRouter);

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("User connected");
});


server.listen(3000, () => {
    console.log("Server is running on port 3000...");
});