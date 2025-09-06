import mongoose from "mongoose";

 export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://roshansainims957178_db_user:dbroshan3@cluster0.i1sji9h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>console.log("DB connected"));
}
