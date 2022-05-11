import "./notes.css";
import React from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import {
  collection,
  doc,
  query,
  deleteDoc,
  onSnapshot,
  where,
  orderBy
} from "firebase/firestore";
import { auth } from "../lib/FirebaseConfig";
import { db } from "../lib/FirebaseConfig";
import { useEffect, useState } from "react";

export default function Notes() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {}
  };

  const uid = user.uid;

  if (loading) return <h1>Cargando..</h1>;

  const [note, setNote] = useState([]);
  const docRef = query(
    collection(db, "Notes"),
    where("UID", "==", uid),
    orderBy("date", "desc")
  );

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
  };

  function getDate(date) {
    return new Date(
      date.seconds * 1000 + date.nanoseconds / 1000000,
    ).toDateString('es-MX');
  }

  function getTime(date) {
    return new Date(
      date.seconds * 1000 + date.nanoseconds / 1000000,
    ).toLocaleTimeString('es-MX');
  }

  useEffect(() => {
    createNote();
  }, []);

  return (
    <div className="div_notes">
      <header id="container_header">
        <h1 id="user_name">{user.displayName || user.email} </h1>
        <button id="button_add_note" onClick={() => navigate("/nota")}>
          <img id="add_button" src="./images/Add_note.svg" />
        </button>
      </header>
      <section id="section_button_logout">
        <button id="button_logout" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </section>
      <div id="container_all_notes">
        {note.map((note, pos) => {
          return (
            <div id="container_notes" key={pos}>
              <section id="container_notes_header">
                <button
                  className="buttons_update_delete"
                  onClick={() => {
                    deleteNote(note.id);
                  }}
                >
                  <img id="img_button_delete" src="./images/Close.png" />
                </button>
                <h1 className="print_tittle">{note.Tittle}</h1>
              </section>
              <h2 className="print_note">{note.note}</h2>
              {/* <p id='date'>{getDate(note.date)} {getTime(note.date)}</p> */}
              <button
                className="buttons_update_delete"
                onClick={() => navigate(`/editar-nota/${note.id}`)}
              >
                <img id="img_button_edit" src="./images/edit.png" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
