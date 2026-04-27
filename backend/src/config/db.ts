import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Connexion à mongo reussi");
  } catch (error) {
    console.log("Echec de la connexion à mongo");
    process.exit(1);
  }
};
