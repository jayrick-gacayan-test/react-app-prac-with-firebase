import React , { useState, useEffect } from 'react';
import { TodoButton } from './TodoButton'
const TodoItem = (props) => {
    
    const { todo, handleTodoTask, deleteTodo, editTodo } = props; // destructuring props
    const { id, title, name } = todo; // destructuring todo
    
    const [ completed, setCompleted ] = useState(false);

    useEffect(
        () => {
            setCompleted(props.todo.completed)
        }, [props]);
        
    return (
        <li key={ id }
                className="todo-list-item">
            <input type="checkbox" 
                    className="checkbox"
                    checked={ completed }
                    onChange={ () => handleTodoTask(id) }/>
            <span className={ completed ? "todo-completed" : ""} 
                style={{ padding: "8px", display: "inline-block" }}>{ "Title : " + title } { "Name : " + name }</span>
            
            <TodoButton className="style-button-1 float-end button-danger"
                        buttonContent={ (<i className="bi bi-trash-fill"></i>) }
                        onClick={ deleteTodo }
                        data={ id }/>
            <TodoButton className="style-button-1 float-end button-warning"
                        buttonContent={ (<i className="bi bi-pen-fill"></i>) }
                        onClick={ editTodo }
                        data={ todo } />
        </li>
    );
}

export default TodoItem;