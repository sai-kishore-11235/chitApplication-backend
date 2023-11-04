const express = require("express");
const connectDB = require("./configs/dbConnection")
const errorHandler = require("./middleware/errorHandler");
const corsMiddleware = require("./middleware/cors");
const dotenv = require("dotenv").config();

connectDB();
const app= express()
const port = process.env.PORT || 3000;
 
app.use(express.json())
app.use(errorHandler)
app.use(corsMiddleware)
app.use("/api/chits",require("./routes/chitsRoutes"));
app.use("/api/users",require("./routes/userRoutes"));

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})

