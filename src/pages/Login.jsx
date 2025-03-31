import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "./AuthForm.css";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      setError("");
    } catch (err) {
      console.log("🔥 Ошибка при входе:", err);
      console.log("📩 Сообщение:", err.message);
      try {
        const res = JSON.parse(err.message);
        if (res?.message) {
          setError(res.message);
        } else {
          setError("Login failed");
        }
      } catch {
        setError(err.message || "Login failed");
      }
    }
  };

  return (
    <div className="auth-form-wrapper">
      <div className="auth-form">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
          {error && <p className="error-msg">{error}</p>}
        </form>
        <p className="switch-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;