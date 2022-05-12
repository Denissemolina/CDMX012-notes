import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/authContext";
import Header from "./Header";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState();

  const handleChange = ({ target: { name, value } }) =>
    setUser({ ...user, [name]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      navigate("/");
    } catch (error) {
      setError(error.message);
      if (error.code === "auth/user-not-found") {
        setError("Usuario no registrado");
      }
      if (error.code === "auth/wrong-password") {
        setError("Contraseña incorrecta");
      }
      if (error.code === "auth/invalid-email") {
        setError("Ingresa un correo válido");
      }
    }
  };

  const handleGoogleSingin = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      setError(error.message);
      if (error.code === "auth/popup-closed-by-user") {
        setError("Inicio de sesión cerrado por el usuario");
      }
    }
  };

  return (
    <section>
      <Header />
      <span>No hay usuario</span>
      <div id="container_singin">
        <p id="tittle_register"> Inicia sesión </p>
        <form onSubmit={handleSubmit}>
          <input
            className="form_singin"
            type="email"
            name="email"
            placeholder="Correo"
            onChange={handleChange}
          />
          <input
            className="form_singin"
            type="password"
            name="password"
            placeholder="Contraseña"
            onChange={handleChange}
          />
          <button className="submit"> Entrar </button>
        </form>

        {error && <p id="error">{error}</p>}
        <Link to="/registro">Crear una cuenta </Link>

        {/* <Link to="/">notas</Link> */}
      </div>

      <button
        onClick={handleGoogleSingin}
        className="btn_google"
        id="google_btn"
      >
        <img id="google_btn" src="./images/google.png" />
      </button>
    </section>
  );
}
