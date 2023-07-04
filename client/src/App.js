import React,{useState, useEffect} from 'react'
import './App.css'


function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  return (
    <>
      <div>
        <h1 className='text-center mb-3 mt-4 taskeasy-title'>Task Easy 📝</h1>
      </div>

      <div className="row align-items-md-stretch m-auto">
        <div className="col-md-6 mb-4">
          <div className=" p-5 bg-warning  border rounded-3 shadow todo-container ">

          </div>
        </div>
        <div className="col-md-6 mb-4 ">
          <div className="  p-5 py-5 pt-5  border rounded-3 shadow todo-form-container ">
            <div className="task-input-btn-container d-grid  mt-3">
              <input type="text" className="form-control"  placeholder='Enter Your Task Here' value={title} 
              onChange={(e)=>{
                setTitle(e.target.value);
              }} />
              <input type="text" className="form-control mt-3"  placeholder='Enter Your Description Here' value={description}
              onChange={(e)=>{
                setDescription(e.target.value);
              }} />
              <button className="btn btn-warning mt-3" type="button">Add Task</button>
            </div>
          </div>
        </div>
      </div>



    </>

  )
}

export default App
