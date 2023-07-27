import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { messageSender } from "./send";
import { messageReceiver } from "./receive";

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json());
app.use(cors());

app.post("/", (req, res) => {
  messageSender();
});

app.get("/", (req, res) => {
  messageReceiver();
});

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
