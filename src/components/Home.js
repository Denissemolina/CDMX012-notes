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

  if (loading) return <h1>Cargando</h1>;

  return (
    <div className="Home">
      <h1> Holis {user.displayName || user.email} </h1>
      <button onClick={handleLogout}>Cerrar sesión</button>
      <Notes></Notes>
    </div>
  );
}
