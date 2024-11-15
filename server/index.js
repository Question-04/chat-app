import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./routes/AuthRoutes.js";
import contactsRoutes from "./routes/ContactRoutes.js";
import setupSocket from "./socket.js";
import messagesRoutes from "./routes/MessagesRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const databaseURL = process.env.DATABASE_URL;

app.use(cors({
    origin:"https://chat-app-frontend-lj5x.onrender.com",
    methods:["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
})
);

app.use("/uploads/profiles", express.static("uploads/profiles"));
app.use("/uploads/files", express.static("uploads/files"));

app.use(cookieParser());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/contacts",contactsRoutes);
app.use("/api/messages", messagesRoutes);



const server = app.listen(port, () => {
  console.log(`server is running at https://chat-app-backend-mk1b.onrender.com`);
});

setupSocket(server)

mongoose
  .connect(databaseURL)
  .then(() => console.log("DB Connection Successful"))
  .catch((err) => console.log(err.message));

