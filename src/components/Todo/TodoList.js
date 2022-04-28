import React from 'react';
import TodoItem from './TodoItem';

const TodoList = (props) => {
    const { todos, handleTodoTask, deleteTodo, editTodo } = props;
    return (

        todos.map(
            (todo, index) => {
                return (
                    <TodoItem key={ index } 
                        todo={ todo }
                        handleTodoTask={ handleTodoTask }
                        deleteTodo={ deleteTodo }
                        editTodo={ editTodo } />
                );
            }
        )
    );
}

export default TodoList;