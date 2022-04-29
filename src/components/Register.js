import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/authContext";

export default function Register() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { singup } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState();

  const handleChange = ({ target: { name, value } }) =>
    setUser({ ...user, [name]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await singup(user.email, user.password);
      navigate("/");
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setError("Ingresa un correo válido");
      }
      if (error.code === "auth/weak-password") {
        setError("La contraseña debería tener al menos 6 caracteres");
      }
      if (error.code === "auth/email-already-in-use") {
        setError("Usuario ya registrado");
      }
    }
  };

  return (
    <div id="container_register">
      <p id="tittle_register"> Regístrate </p>
      <form onSubmit={handleSubmit}>
        {/* <input
          className="form_register"
          type="text"
          name="user"
          placeholder="Usuario"
          onChange={handleChange}
        /> */}
        <input
          className="form_register"
          type="email"
          name="email"
          placeholder="Correo"
          onChange={handleChange}
        />
        <input
          className="form_register"
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={handleChange}
        />
        <button className="submit"> Entrar </button>
      </form>
      {error && <p id="error">{error}</p>}
      <p id="privacy_terms">
        Al registrarte aceptas los términos, condiciones y la política de
        privacidad 💀.
      </p>
      <Link to="/iniciar-sesion"> Inicia sesión </Link>
    </div>
  );
}
