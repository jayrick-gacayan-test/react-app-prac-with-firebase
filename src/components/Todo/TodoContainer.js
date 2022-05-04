import React, { useState, useReducer, useEffect } from 'react';
import TodoList from './TodoList';
import TodoForm from './TodoForm';

/* Firebase */
import { db } from '../../Firebase';
import { ref, onValue, push, child, update, remove, set } from 'firebase/database';

import '../custom.style/todo.style.css';

const TodoContainer = () => {

    const initialState = {
        key : null,
        name : "",
        title : "",
        completed : false
    }
    
    const todoRef = ref(db, 'Todo');
    const [ editing, setEditing ] = useState(false); // checks if editing is enable
    const [ currentTodo, setCurrentTodo ] = useState(initialState); // getting the current todo
    
    const reducer = (state, action) => {
        switch(action.type){
            case "ADD": 
                return [ ...state, action.todo ];
            case "DELETE": 
                return state.filter(todo => { return todo.key !== action.key });
            case "HANDLE_TODO_TASK":
                return state.map(
                    (todo) => {
                        return todo.key === action.key ? 
                            { ...todo, completed: !todo.completed } : todo;
                    }
                );
            case "EDIT":
                return state;
            case "UPDATE":
                return state.map(
                    (todo) => {
                        return todo.key === action.todoData.key ? 
                        action.todoData : todo;
                    }
                );
            case "SET_TODOS" :
                return action.data;
            default : 
                return state;
        }
    }

    const [ todos, dispatch ] = useReducer(reducer, []); // use reducer
    
    useEffect(
        () => {
            
            function fetchTodos(){
                const refTodo = ref(db, 'Todo'); // database and table reference

                onValue(refTodo, 
                        (snapshot) => {
                            const todoList = [];
                            
                            snapshot.forEach(
                                (childSnapshot) => {
                                    const childKey = childSnapshot.key;
                                    const childData = childSnapshot.val();
                                    todoList.push({
                                        key: childKey,
                                        ...childData
                                    });
                                }
                            ); // snapshot.forEach();

                            dispatch({
                                type: "SET_TODOS",
                                data: todoList
                            });//dispatch
                        },//
                    {
                        onlyOnce : true
                    }
                );
            } // end of function fetchTodos

            fetchTodos();
        
        },
        [ ]
    );

    /* crude methods */
    const addTodo = (todo) => {
        const refTodo = ref(db, 'Todo');
        const { title, name, completed } = todo; // destructuring todo
        const newTodo = push(refTodo); // getting the new key
        
        set(newTodo,
            {
                title,
                name,
                completed
            }
        ); // setting

        dispatch({
            type: "ADD",
            todo: {
                ...todo, key: newTodo.key
            }
        });
        
        toSetEditingAndCurrentTodo(false, initialState);
    }

    const deleteTodo = (key) => {
        const deleteTodoRef = child(todoRef, key);
        remove(deleteTodoRef);

        dispatch({ type: "DELETE", key : key });
        toSetEditingAndCurrentTodo(false, initialState);
    }

    const handleTodoTask = (key) => {
        // updating method
        // parameters needed (reference, key, data)

        const refTodo = ref(db, 'Todo');
        
        const selectedTodo = todos.filter(
            (todo) => { return todo.key === key;}
        ); // getting the selected todo
        
        updateOnTodo(refTodo, 
            key, 
            { completed : ! selectedTodo[0].completed }
        );

        dispatch(
            { type: "HANDLE_TODO_TASK", 
                key: key }
        );
    }

    const editTodo = (todo) => {
        toSetEditingAndCurrentTodo(true, todo);
        dispatch({ type: "EDIT", todo: todo });
    }

    const updateTodo = (todo) => {
        const refTodo = ref(db, 'Todo');
        const { title, name } = todo;
    
        updateOnTodo(refTodo, 
                todo.key, 
                { title, name }
        );

        toSetEditingAndCurrentTodo(false, initialState);
        dispatch({ type: "UPDATE", todoData: todo });
    }

    function toSetEditingAndCurrentTodo(editing, currentTodo){
        setEditing(editing);
        setCurrentTodo(currentTodo);
    }

    function updateOnTodo(reference, key, data){
        update(
            child(reference, key),
            data
        );
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
                    <ul>
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