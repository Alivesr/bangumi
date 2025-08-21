import express from "express";
import cors from "cors";
import callbackHandler from "./api/callback.js";
import getTokenHandler from "./api/getToken.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
  }),
);

app.get("/api/callback", callbackHandler);
app.get("/api/getToken", getTokenHandler);

app.listen(3000, () => console.log("本地后端 http://localhost:3000"));
