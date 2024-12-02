import React, { useState } from "react";
import TICK from '../assets/babuin.svg'
import TRASH from '../assets/trash.svg'
function TodoItem({ todo, updateTodoStatus, deleteTodo }) {
  const { id, text, status } = todo;
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev); 
  };

  return (
    <div className="todo-item">

    
      <button className="options-button" onClick={toggleModal}>
        &#x22EE; 
      </button>
      {status === "Todo" && (
            <input
            type="checkbox"
              className="mark-done"
              onClick={() => {
                updateTodoStatus(id, "Done");
                toggleModal(); 
              }}
            >
            </input>
          )}
      {isModalOpen && (
        <div className="modal">
            {status === "Todo" && (
            <button
              className="trash"
              onClick={() => {
                updateTodoStatus(id, "Trash");
                toggleModal(); 
              }}
            >
               <img src={TRASH}/>
                Move to trash
            </button>
          )}
          {status === "Done" && (
            <button
              className="trash"
              onClick={() => {
                updateTodoStatus(id, "Trash");
                toggleModal(); 
              }}
            >
              <img src={TRASH}/>
              Move to Trash
            </button>
          )}
          {status === "Trash" && (
            <>
              <button
                className="delete"
                onClick={() => {
                  deleteTodo(id);
                  toggleModal(); 
                }}
              >
                 <img src={TRASH}/>
                Delete Forever
              </button>
              <button
                className="restore"
                onClick={() => {
                  updateTodoStatus(id, "Todo");
                  toggleModal(); 
                }}
              >
              <img src={TICK}/>
                Move back to do
              </button>
            </>
          )}
        </div>
      )}
            <p  style={{
          textDecoration: status === "Done" ? "line-through" : "none",
          color: status === "Done" ? "gray" : "black", 
        }}>{text}</p>
    </div>
  );
}

export default TodoItem;
