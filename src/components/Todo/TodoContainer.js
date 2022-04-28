import React, { useState, useReducer, useEffect } from 'react';
import TodoList from './TodoList';
import TodoForm from './TodoForm';

/* Firebase */
import { db } from '../../Firebase';
import { ref, onValue, push, child, update, remove } from 'firebase/database';

import '../custom.style/todo.style.css';

const TodoContainer = () => {

    const initialState = {
        key : null,
        name : "",
        title : "",
        completed : false
    }
    
    let todoRef = ref(db, 'Todo');
    const [ editing, setEditing ] = useState(false); // checks if editing is enable
    const [ currentTodo, setCurrentTodo ] = useState(initialState); // getting the current todo
    const [ write, canWrite ] = useState(false);
    const reducer = (state, action) => {
        switch(action.type){
            case "ADD":
                console.log("Hello ... ", action.todo);
                return action.todo;
            case "DELETE": 
                
                return state.filter(todo => { return todo.key !== action.key });
            case "HANDLE_TODO_TASK":
                return state.map(
                    (todo) => {
                        return todo.key === action.key? 
                            { ...todo, completed: !todo.completed } : todo;
                    }
                );
            case "EDIT":
                console.log("Action and state: ", action, state); 
                return state;
            case "UPDATE":
                return state.map(
                    (todo) => {
                        return todo.key === action.todoData.key ? action.todoData : todo;
                    }
                );
            case "SET_TODOS" :
                return action.data;
            default : return state;
        }
    }

    const [ todos, dispatch ] = useReducer(reducer, getInitialTodos()); // use reducer
    
    useEffect(()=>{
            let todoTimeout = null;
            if(!write)
                todoTimeout = setTimeout(fetchTodos(), 1000);

            return () => { clearTimeout(todoTimeout) };
        },
        [ todos ]
    );

    function getInitialTodos(){
        let todoList = [];

        onValue(todoRef, (snapshot) => {
            
            snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                todoList.push({ key : childKey, ...childData });
            });
          
        });
        
        return todoList || [];
    }

    function fetchTodos(){
        canWrite(true);
        dispatch({ type: "SET_TODOS", data : getInitialTodos() });
    
    }

    /* crude methods */
    const addTodo = (todo) => {
        const newTodokey = push(child(ref(db), 'Todo')).key;
        
        todo.key = newTodokey;

        const todoData = {
            title: todo.title,
            name: todo.name,
            completed: todo.completed
        }

        const updates = {};
        updates['/Todo/' + newTodokey] = todoData;
        update(ref(db), updates);   
        
        dispatch({ type: "ADD", todo: todo});
        toSetEditingAndCurrentTodo(false, initialState);

        canWrite(false);
    }

    const deleteTodo = (key) => {
        const deleteTodoRef = child(todoRef, key);
        remove(deleteTodoRef);

        dispatch({ type: "DELETE", key : key });
        toSetEditingAndCurrentTodo(false, initialState);
        canWrite(false);
    }

    const handleTodoTask = (key) => {
  
        const selectedTodo = todos.filter(
            (todo) => { return todo.key === key;}
        );
        const updateTodoRef = child(todoRef, key);
        console.log(selectedTodo);
        update(updateTodoRef, { completed : !selectedTodo[0].completed})
        dispatch({ type: "HANDLE_TODO_TASK", key: key });
        canWrite(false);
    }

    const editTodo = (todo) => {
        toSetEditingAndCurrentTodo(true, todo);
        dispatch({ type: "EDIT", todo: todo });
    }

    const updateTodo = (todo) =>{
        toSetEditingAndCurrentTodo(false, initialState);
        dispatch({ type: "UPDATE", todoData: todo });
    }

    function toSetEditingAndCurrentTodo(editing, currentTodo){
        setEditing(editing);
        setCurrentTodo(currentTodo);
    }

    
    return (
        <div className="container-fluid margin-big-top">
            <div className="container-fluid p-5 bg-primary text-white text-center">
                <h1>Todo Page</h1>
                <p>Resize this responsive page to see the effect!</p> 
            </div>
                
            <div className="container mt-5">
                <div>
                    <div>
                        <p className="lead font-weight-bold font-size-3 text-center">{ !editing ? "Add" : "Edit" } todo</p>
                        <TodoForm 
                            isEditing={ editing } 
                            todoAction={ !editing ? addTodo : updateTodo }
                            currentTodo={ currentTodo }
                        />
                    </div>
                    <ul >
                        {
                           todos.length > 0 ? 
                            (<TodoList todos={ todos }
                                handleTodoTask={ handleTodoTask }
                                deleteTodo={ deleteTodo }
                                editTodo={ editTodo }/>) :
                            (<li>No todo task yet.</li>) 
                        }
                        
                    </ul>
                    
                </div>
            </div>
        </div>
    );
}

export default TodoContainer;