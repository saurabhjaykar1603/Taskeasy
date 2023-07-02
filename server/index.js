import express, { json } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import Task from './models/Task.js';

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

app.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'All good'
    })
})

// POST /task : to create task
app.post('/task', async (req, res) => {
    const { title, description } = req.body;

    const newTask = new Task({
        title: title,
        description: description
    })

    const savedTask = await newTask.save();

    res.json({
        success: true,
        message: 'Task Saved successfully',
        data: savedTask

    })

});

// GET /tasks : to fetched all task
app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();

    res.json({
        success: true,
        message: 'All tasks Fetched successfully',
        data: tasks
    })
});

// GET /task : to fetched specific task
app.get('/task', async (req, res) => {
    const taskId = req.query.taskId;

    let task;
    try {
        task = await Task.findById(taskId);
    }
    catch (e) {
        return res.json({
            success: false,
            message: e.message,
            data: []
        });
    }

    if (!task) {
        return res.json({
            success: false,
            message: 'Task not found',
            data: []
        });
    }

    res.json({
        success: true,
        message: 'Task successfully Fetched',
        data: task
    })

})

// POST /task/delet : to delete task
app.post("/task/delete", async (req, res) => {
    const { taskId } = req.body;

    await Task.deleteOne({
        _id: taskId
    })
    res.json({
        success: true,
        message: 'Task successfully Deleted'
    });
})
// PUT /task




const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
    console.log('listening on port ' + PORT)
})

