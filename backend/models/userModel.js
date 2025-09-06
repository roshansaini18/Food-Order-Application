import mongoose, { Mongoose } from "mongoose"

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    cartData:{type:Object,default:{}},
     userType: { type: String, enum: ["user", "admin"], default: "user" }, // new field
},{minimize:false})

const userModel = mongoose.models.user ||mongoose.model("user",userSchema);
export default userModel;