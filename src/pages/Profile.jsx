import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import AddTodoForm from "../components/AddTodoForm";
import TodoList from "../components/TodoList";
import './AuthForm.css';

function Profile() {
  const { logout, user, accessToken } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const [view, setView] = useState("Todo");

  useEffect(() => {
    if (!accessToken) return;
    fetch("http://localhost:4000/todos", {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((res) => res.json())
      .then(setTodos)
      .catch((err) => console.error("Failed to fetch todos", err));
  }, [accessToken]);

  const addTodo = async (text) => {
    const res = await fetch("http://localhost:4000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ text }),
    });
    const newTodo = await res.json();
    setTodos((prev) => [...prev, newTodo]);
    console.log(todos);
  };

  const updateTodoStatus = async (id, status) => {
    const res = await fetch(`http://localhost:4000/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ status }),
    });
    const updated = await res.json();
    setTodos((prev) => prev.map((todo) => (todo._id === id ? updated : todo)));
  };

  const deleteTodo = async (id) => {
    await fetch(`http://localhost:4000/todos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    setTodos((prev) => prev.filter((todo) => todo._id !== id));
  };

  return (
    <div className="App">
      <header>
        <div className="upper-container">
          <h1>Simple To-Do List</h1>
          <p>Welcome, {user?.email}</p>
          <button onClick={logout} className="btn-logout">Logout</button>
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

export default Profile;
