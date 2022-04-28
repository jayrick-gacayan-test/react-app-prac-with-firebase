import React, { useState, useEffect } from 'react';
const TodoForm = (props) => {
    const { isEditing, todoAction } = props;

    const initialState = {
        key: null,
        title: '',
        name: '',
        completed: false
    }
    const [ todo, setTodo ] = useState(initialState);

    const handleInputChange = (event) => {
        const { name , value } = event.target;
        setTodo({ ...todo, [name] : value });
    }
    
    useEffect(
        () => {
            setTodo(props.currentTodo);
        }
        ,[props] 
    );

    return (
        <form className="form-todo-container was-validated" 
            onSubmit={ 
                    (event) => {
                        event.preventDefault();
                        if(!todo.title.trim() || !todo.name.trim()) return;

                        todoAction(todo);

                        setTodo(initialState);
                    }
                }>
            <div className="mb-3">
                <label htmlFor="title">Title</label>
                <input  type="text" 
                        id="title"
                        name="title" 
                        className="input-todo"
                        value={ todo.title }
                        placeholder="Todo..."
                        onChange={ handleInputChange }
                        required />
                   
            </div>
            <div className="mb-3">
                <label htmlFor="Name">Name</label>
                <input  type="text" 
                        id="name"
                        name="name" 
                        className="input-todo"
                        value={ todo.name }
                        placeholder="Name..."
                        onChange={ handleInputChange }
                        required />
                   
            </div>
            <button className="style-button-1 button-success"
                    style={{ width: "60%", margin: "auto", textAlign : "center", display : "block"}}>{ !isEditing ? "Add" : "Edit"} todo</button>
        </form>
    );
}

export default TodoForm;