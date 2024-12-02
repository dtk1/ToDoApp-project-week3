import React from 'react'
import TodoItem from './TodoItem';

export default function TodoList({todos,view,updateTodoStatus, deleteTodo}) {
    const filteredTodos = todos.filter((todo) => todo.status === view);
  return (
    <div>
        <div className='todo-list'>
            {filteredTodos.map((todo) =>(
                <TodoItem 
                key={todo.id}
                todo={todo}
                updateTodoStatus={updateTodoStatus}
                deleteTodo={deleteTodo}
                />
            ))}
        </div>
    </div>
  );
}
