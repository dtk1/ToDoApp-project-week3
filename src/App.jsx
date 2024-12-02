import { useState, useRef, useEffect } from "react";
import "./App.css";
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [view, setView] = useState("Todo");

  const idCounter = useRef(1);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (newTodo) => {
    setTodos([...todos, { id: idCounter.current++, text: newTodo, status: "Todo" }]);
  };

  const updateTodoStatus = (id, status) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, status } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className="App">
      <header>
        <div className="upper-container">
          <h1>Simple To-Do List</h1>
          <p>Today is awesome day. The weather is awesome, you are awesome too!</p>
          <nav>
            <button
              className={view === "Todo" ? "active" : ""}
              onClick={() => setView("Todo")}
            >
              To Do
            </button>
            <button
              className={view === "Done" ? "active" : ""}
              onClick={() => setView("Done")}
            >
              Done
            </button>
            <button
              className={view === "Trash" ? "active" : ""}
              onClick={() => setView("Trash")}
            >
              Trash
            </button>
          </nav>
        </div>
        <div>
          <AddTodoForm addTodo={addTodo} />
        </div>
      </header>
      <main>
        <h2>{view}</h2>
        <TodoList
          todos={todos}
          view={view}
          updateTodoStatus={updateTodoStatus}
          deleteTodo={deleteTodo}
        />
      </main>
      <footer>
        <p>Made with ❤️ at nFactorial in 2022.</p>
        <p>Credits: icons from Icons8.</p>
      </footer>
    </div>
  );
}

export default App;
