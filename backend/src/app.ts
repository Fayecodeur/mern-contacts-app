import express from "express";
import cors from "cors";
import { connectDB } from "./config/db";
require("dotenv").config();

// Connexion a la bdd
connectDB();

const app = express();
// middlewares
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Application lancé sur le port ${PORT}`);
});
