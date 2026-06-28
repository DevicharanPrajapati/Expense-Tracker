const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const userRoutes = require("./routes/user.route")
const categoryRoutes = require('./routes/category.route')
const transactionRoutes = require("./routes/transaction.route")


dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

//Routs
app.use("/api/users", userRoutes);  
app.use("/api/category", categoryRoutes);
app.use("/api/transaction", transactionRoutes)

app.get("/", (req, res)=>{
  res.send('Hollo world');

})



app.listen(port, ()=>{
    console.log(`app listening on port ${port}`);
})