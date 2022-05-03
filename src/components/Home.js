import "./home.css";
import { useAuth } from "../context/authContext";
import Notes from "./Notes";

export default function Home() {
  const { user, logout, loading } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {}
  };

  if (loading) return <h1>Cargando..</h1>;

  return (
    <div className="Home">
      <button id='button_add_note'>
    <img id="add_button" src="./images/Add_note.svg" />
    </button>  
      <section id='container_header'>
      <h1 id='user_name'>{user.displayName || user.email} </h1>
      <button id='button_logout' onClick={handleLogout}>Cerrar sesión</button>
      </section>
      <Notes></Notes>
    </div>
  );
}
