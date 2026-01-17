import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://lalitverma:Lalit123@cluster0.09g45ar.mongodb.net/food-del').then(()=>console.log("DB connected"));
}