import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import taskRoutes from './routes/taskRoutes.js'

mongoose.connect("mongodb://localhost:27017/taskdb")


const app = express()
app.use(cors())

app.use(express.json())

app.get("/",(req,res) => {
    res.send("Task manager Backend running")
})

app.use("/api/tasks" , taskRoutes)

app.listen(5000,()=> console.log("Server running on Port 5000"))