/* eslint-disable no-unused-vars */
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import { AuthProvider } from "./context/authContext";
import Login from "./components/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import CreateNotes from "./components/CreateNotes";
import Notes from "./components/Notes";
import EditNotes from "./components/EditNotes";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Notes />
              </ProtectedRoute>
            }
          />
          <Route path="/iniciar-sesion" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/nota" element={<CreateNotes />} />
          <Route path="/editar-nota" element={<EditNotes />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}
export default App;
