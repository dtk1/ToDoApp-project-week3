import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "./AuthForm.css";

const Register = () => {
  const { register } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await register(email, password);
      setSuccess("Registered successfully. You can now login.");
      setError("");
    } catch (err) {
      console.log("🔥 Ошибка при регистрации:", err);
      console.log("📩 Сообщение:", err.message);
      try {
        const res = JSON.parse(err.message);
        if (res?.message) {
          setError(res.message);
        } else if (res?.errors) {
          setError(res.errors.map(e => e.msg).join(", "));
        } else {
          setError("Registration failed");
        }
      } catch {
        setError(err.message || "Registration failed");
      }
      setSuccess("");
    }
  };

  return (
    <div className="auth-form-wrapper">
      <div className="auth-form">
        <h1>Register</h1>
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
            placeholder="Password (min 6 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
          {error && <p className="error-msg">{error}</p>}
          {success && <p className="success-msg">{success}</p>}
        </form>
        <p className="switch-link">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;