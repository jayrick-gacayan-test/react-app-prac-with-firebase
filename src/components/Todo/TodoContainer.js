import React, { useReducer } from 'react';

const TodoContainer = () => {

    const initialState = {
        id : null,
        name : "",
        title : "",
        complete : false
    }
    
    const todosData = [
        {
            id: 1,
            name: "Jayrick",
            title: "Todo 1",
            completed: false
        },
        {
            id: 2,
            name: "Jayrick II",
            title: "Todo 2",
            completed: false
        },
        {
            id: 3,
            name: "Jayrick III",
            title: "Todo 3",
            completed: false
        }
    ];
    
    
    const reducer = (state, action) => {
        switch(action.type){
            case "ADD": return [...state, action.todo];
            case "DELETE": return state.filter(todo => { return todo.id !== action.id });
            default : return state;
        }
    }

    const [ todos, dispatch ] = useReducer(reducer, todosData);
    

    const addTodo = () => {
        const newTodo = {
            id : todos[todos.length - 1].id + 1,
            name : "Jayrick 1",
            title : "Todo " + (todos[todos.length - 1].id + 1),
            completed : false
        }

        dispatch({ type: "ADD", todo: newTodo});
    }

    const deleteTodo = (id) => {
        dispatch({ type: "DELETE", id : id});
    }

    return (
        <div className="container-fluid margin-big-top">
            <div className="container-fluid p-5 bg-primary text-white text-center">
                <h1>Todo Page</h1>
                <p>Resize this responsive page to see the effect!</p> 
            </div>
                
            <div className="container mt-5">
                <div>
                    <button onClick={ addTodo }>
                        Add
                    </button>
                    {
                        todos.map((todo) => 
                        <div key={ todo.id }>
                            <p>{ todo.name }</p>
                            <p>{ todo.title }</p>
                            <button onClick={ () => deleteTodo(todo.id) }>DELETE</button>
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
}

export default TodoContainer;