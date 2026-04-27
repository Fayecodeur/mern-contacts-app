import express from "express";
import cors from "cors";
import { connectDB } from "./config/db";
require("dotenv").config();
import contactRoutes from "./routes/contact.routes";

// Connexion a la bdd
connectDB();

const app = express();
// middlewares
app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Application lancé sur le port ${PORT}`);
});
