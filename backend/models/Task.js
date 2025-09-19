import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    status:{
        type:String,
        default:"pending"
    },
    userId: String, 
},{timestamps:true})


export default mongoose.model("Task", TaskSchema)