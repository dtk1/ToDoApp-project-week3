import React, { useState } from "react";
import "../App.css";

export default function AddTodoForm({ addTodo }) {
  const [input, setInput] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      addTodo(input);
      setInput("");
    }
  };

  const toggleForm = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div className="form-container1">
     <button className="toggle-button" onClick={toggleForm}>
        +
      </button>
      <div className={`form-container ${isVisible ? "visible" : ""}`}>
        <form onSubmit={handleSubmit}>
          <p>Add New To Do</p>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Your text"
          />
          <button type="submit">Add</button>
          
        </form>
    
      </div>
    </div>
  );
}
