/* eslint-disable no-unused-vars */
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Header from "./components/Header";
import { AuthProvider } from "./context/authContext";
import Login from "./components/Login";
// eslint-disable-next-line import/no-named-as-default
import Home from "./components/Home";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/iniciar-sesion" element={<Login />} />
          <Route path="/registro" element={<Register />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}
export default App;