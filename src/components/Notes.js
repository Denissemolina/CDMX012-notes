import "./notes.css";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { collection, doc, deleteDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../lib/FirebaseConfig";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Header from "./Header";

export default function Notes() {
  /////////////////////////////////////////////
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [updateTittle, setUpdateTittle] = useState("");
  const [updateNote, setUpdateNote] = useState("");

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {}
  };

  if (loading) return <h1>Cargando..</h1>;
  ///////////////////////////////////////////////

  const [note, setNote] = useState([]);
  const docRef = collection(db, "Notes");

  //GUARDAR NOTAS TIEMPO REAL
  const createNote = async () => {
    onSnapshot(docRef, (snapshot) => {
      const docs = [];
      snapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setNote(docs);
    });
  };

  //BORRAR NOTAS
  const deleteNote = async (id) => {
    const userDoc = doc(db, "Notes", id);
    await deleteDoc(userDoc);
    Swal.fire({
      title: "¿Quieres eliminar la nota?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#584f84",
      cancelButtonColor: "#8f2b00",
      confirmButtonText: "Sí",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("¡Borrado!", "Tu nota fue eliminada.", "success");
      }
    });
  };

  //ACTUALIZAR!!!!!
  const updateNotes = async (id, Tittle, note) => {
    const userDoc = doc(db, "Notes", id);
    await updateDoc(userDoc, {
      Tittle: updateTittle,
      note: updateNote,
    });
  };

  []; //IMPRIMIR LAS NOTAS EN PANTALLA

  useEffect(() => {
    createNote();
  }, []);

  return (
    <div className="div_notes">
      <Header />
      {/* SAQUE LE FORM Y SI FUNCIONA*/}
      <button id="button_add_note" onClick={() => navigate("/nota")}>
        <img id="add_button" src="./images/Add_note.svg" />
      </button>
      <section id="container_header">
        <h1 id="user_name">{user.displayName || user.email} </h1>
        <button id="button_logout" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </section>
      {note.map((note, pos) => {
        return (
          <div id="container_notes" key={pos}>
            {" "}
            <h1 className="print_tittle">{note.Tittle}</h1>
            <h2 className="print_note">{note.note}</h2>
            <input
              placeholder="Actualizar titulo"
              onChange={(event) => {
                setUpdateTittle(event.target.value);
                console.log(setUpdateTittle);
              }}
            />
            <input
              placeholder="Actualizar nota"
              onChange={(event) => {
                setUpdateNote(event.target.value);
              }}
            />
              <button
              className="buttons_update_delete"
              onClick={() => {
                updateNotes(note.id, note.Tittle);
              }}
            >
              <img className="img_buttons" src="./images/edit.png" />
            </button>
            <button
            className="buttons_update_delete"
              onClick={() => {
                deleteNote(note.id);
              }}
            >
              {" "}
              <img className="img_buttons" src="./images/Delete.png" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
