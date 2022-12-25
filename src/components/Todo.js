import  React  from "react"

const Todo=({_id,text})=>
{

    return(

        
        <div className="todo">
            
        <p className="todo-item"> {text} </p>
        <button className="complete-btn">complete</button>
        <button className="trash-btn">delete</button>    
            
        </div>
    )
}

export default Todo;