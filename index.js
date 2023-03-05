const express = require("express")
const initDB = require("./config");
const cors = require("cors")
const userRoutes = require("./routes/authRoutes");
const StuAssiRoutes = require("./routes/Assignment/stu_assing_Routes");
const AssignmentRoutes = require("./routes/Assignment/assignment_Routes");
const lectureRoutes = require("./routes/lectureRoutes");
const problemRoutes = require("./routes/problemRoutes");

require("dotenv").config()
let port =process.env.PORT||8080;
let app = express()

app.use(express.json())
app.use(cors())
app.use("/users",userRoutes)
app.use("/assignments",AssignmentRoutes)
app.use("/stu_assi",StuAssiRoutes)
app.use("/lectures",lectureRoutes)
app.use("/problems",problemRoutes)


app.get('/',(req,res)=>{
    res.send("Jai shree Ganesh")
})

app.listen(port,async()=>{
    // await mongoose.connect("mongodb+srv://chetan:chetan2812@cluster0.lmm0tfr.mongodb.net/test")
    await initDB()
    console.log("server is running on",`${port}`)
})
