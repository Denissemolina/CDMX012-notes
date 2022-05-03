import "./notes.css";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "../lib/FirebaseConfig";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Notes() {
  const [newTittle, setNewTittle] = useState("");
  const [newNote, setNewNote] = useState("");
  const [updateTittle, setUpdateTittle] = useState("");
  const [updateNote, setUpdateNote] = useState("");

  const [note, setNote] = useState([]);
  const docRef = collection(db, "Notes");

  //CREAR NOTAS SI SIRVE
  const createNote = async (e) => {
    e.preventDefault();
    await addDoc(docRef, { Tittle: newTittle, note: newNote });
  };


  //BORRAR NOTA
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
    const impressNotes = async () => {
      const data = await getDocs(docRef);
      setNote(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    impressNotes();
  }, []);

  return (
    <div className="div_notes">
      {/* SAQUE LE FORM Y SI FUNCIONA*/}
      <input
        placeholder="Titulo"
        onChange={(event) => {
          setNewTittle(event.target.value);
        }}
      />
      <input
        placeholder="Escribe tu nota"
        onChange={(event) => {
          setNewNote(event.target.value);
        }}
      />

      <button onClick={createNote}> Enviar </button>
      {note.map((note, pos) => {
        return (
          <div id="container_note" key={pos}>
            {" "}
            <h1>{note.Tittle}</h1>
            <h2>{note.note}</h2>
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
              className="btn_edit"
              onClick={() => {
                updateNotes(note.id, note.Tittle);
              }}
            >
              <img id="edit_btn" src="./images/edit.png" />
            </button>
            <button
              onClick={() => {
                deleteNote(note.id);
              }}
            >
              {" "}
              BORRRA
            </button>
          </div>
        );
      })}
    </div>
  );
}
