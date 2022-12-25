import React from "react";
import { useEffect, useState} from "react";
import GridLoader from "react-spinners/GridLoader";
import GetDate from "./components/GetDate";

//import Todo from "./components/Todo";

import {IoMdDoneAll} from "react-icons/io";
import {AiTwotoneDelete} from "react-icons/ai";

function App() {
//const API="http://localhost:8080/api";
const API="https://todo-backend-tlv5.vercel.app/api";

const [loading,setLoading]=useState(true);
const [todos,setTodos]=useState([]);
const [text,setText]=useState("");

useEffect(()=>{
  getAllTodos();
},[]);

const handleChange=(e)=>{
  const val=e.target.value;
  setText(val);
}

const handleSubmit=(e)=>
{
  e.preventDefault();
  addTodo();
}

///get all todo
const getAllTodos=()=>
{
  fetch(API+"/todo/getAll")
        .then((res)=> res.json())
        .then((data)=>
        {
          setTodos(data);
        })
        .catch((err)=>
        {
          console.error('Error: ',err);
        })
        .finally(()=>
        {
          setLoading(false);
        })
}

//complete todo
const completeTodo=async(id)=>
{
  const data=await fetch(API+'/todo/complete/'+id)
  .then(res=>res.json());
  setTodos(todos=>todos.map(todo=>{

    if(todo._id===data._id)
    {
      todo.complete=data.complete;
    }
    return todo;
  }));
}

//create new todo
const addTodo=async()=> 
{
  await fetch(API+'/todo/new',{

    method: 'POST',
    headers:
    {
      'Content-Type':"application/json"
    },
    body: JSON.stringify({
      text:text
    })
  }).then((res)=>{
    res.json();
    setLoading(true);
    getAllTodos();
    setText("");
  })
}

/// delete todo
const deleteTodo=async(id)=>
{
  await fetch(API+'/todo/delete/'+id,{
    method:"DELETE",
  }).then((res)=>
  {
    if(!res.ok)
    {
      throw Error('could not delete data');
    }
    setLoading(true);
    getAllTodos();
    
  })
  .catch((err)=>
  {
    console.error('Error: ',err);
  })
}
  return (
    <div>
      {loading ? <div className="sweet-loading">
      <GridLoader
        color={"#1a8cff"}
        loading={loading}
        size={70}
        />
    </div>
    :
    <div> 
      <h1>Todo List</h1>
    <GetDate/>

    <form className="form" onSubmit={handleSubmit}>
            <input className="form-input" placeholder="add your new todo..." type="text" id="text" value={text} onChange={handleChange} required/>
            <button  className="todo-button" type="submit">
                ADD
                </button>
    </form>
    <div className="todo-container">
        <ul className="todo-list">
        {todos.map((todo)=>{ 
          return(
            <div className="todo" key={todo._id}>
            <p className={"todo-item"+(todo.complete ? "is-com":"")}> {todo.text} </p>
            <button className="complete-btn" onClick={()=>completeTodo(todo._id)}><IoMdDoneAll/></button>
            <button className="delete-btn" onClick={()=>deleteTodo(todo._id)}> <AiTwotoneDelete/> </button>    
            </div>
        )
        })}
        </ul>
      </div>
    </div>
}
</div>
);
}

export default App;
