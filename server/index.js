import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

// mongodb connection

async function connectMongoDB() {
    const conn = await mongoose.connect(process.env.MONGODB_URL)
    if (conn) {
        console.log("Connected to mongoDB")
    }
}
connectMongoDB();

app.get('/health',(req,res)=>{
    res.json({
        success:true,
        message:'All good'
    })
})


const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
    console.log('listening on port ' + PORT)
})

