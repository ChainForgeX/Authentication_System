const dotenv = require("dotenv");
const connectDB = require("./config/db");
dotenv.config();
connectDB();

const express = require("express");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/authRoutes");

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.get("/", (req, res)=>{
    res.send("Authentication System API Running")
});
const PORT = 3001;
app.listen(PORT, ()=>{
    console.log(`Server Running at Port ${PORT}`)
});