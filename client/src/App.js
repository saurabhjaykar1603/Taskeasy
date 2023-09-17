import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'


function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // get all tasks api 
  const [tasks, setTasks] = useState([]);

  const loadTask = async () => {
    const { data } = await axios.get("/tasks")
    setTasks(data?.data)
  }

  useEffect(() => {
    loadTask();

  }, [])


  // add task button api 
  const addTask = async () => {
    const { data } = await axios.post('/task', {
      title: title,
      description: description
    })
    alert(data?.message);
    setTitle("");
    setDescription("");
    loadTask();
  }

  // delet task api 
  const  deleteTask = async(taskId) => {
    const { data } = await axios.post('./task/delete', {
      taskId: taskId
    })
    alert(data?.message);
    loadTask();
  }
  return (
    <>
      <div>
        <h1 className='text-center mb-4 mt-4 taskeasy-title'>Task Easy 📝</h1>
      </div>

      <div className="row align-items-md-stretch m-auto ">
        <div className="col-md-6 mb-4">
          <div className=" p-5 bg-warning  border rounded-3 shadow todo-container m-auto">
            <h1 className='mb-3 text-center text-dark'>All Task</h1>

            {
              tasks.map((task) => {
                return (
                  <div className='task-card'>
                    <div class="d-flex align-items-center px-3 py-2 my-4 text-white bg-white rounded shadow tast-input-container">
                      {/* <img class="me-3" src="/docs/5.3/assets/brand/bootstrap-logo-white.svg" alt="" width="48" height="38"> */}
                      <div class="lh-0 ">
                        <h3 class=" mb-3 text-black lh-1 ">{task?.title}</h3>
                        <p className='text-black mb-0'>{task?.description}</p>
                      </div>
                      <button type='button' className='btn bg-danger-subtle shadow task-delet-button '
                        onClick={() => {
                          deleteTask(task?._id);
                        }}>❌</button>
                    </div>



                  </div>
                )
              })
            }
          </div>
        </div>
        <div className="col-md-6 mb-4 ">
          <div className="  p-5   border rounded-3 shadow todo-form-container ">
            <h1 className='mb-4 text-center text-white'>Add Task</h1>
            <div className="task-input-btn-container d-grid  ">
              <input type="text" className="form-control" placeholder='Enter Your Task Here' value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }} />
              <input type="text" className="form-control mt-4" placeholder='Enter Your Description Here' value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }} />
              <button className="btn btn-warning mt-4" type="button" onClick={addTask}>Add Task</button>
            </div>
          </div>
        </div>
      </div>



    </>

  )
}

export default App
