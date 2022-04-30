import "./notes.css";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../lib/FirebaseConfig";
import { useEffect, useState } from "react";

export default function Notes() {
  const [newTittle, setNewTittle] = useState("");
  const [newNote, setNewNote] = useState("");
  const [tittleValor, updateTittle] = useState("");


  const [note, setNote] = useState([]);
  const docRef = collection(db, "Notes");

  //CREAR NOTAS SI SIRVE
  const createNote = async () => {
    await addDoc(docRef, { Tittle: newTittle, note: newNote });
  };

  //BORRAR NOTA
  const deleteNote = async (id) => {
    const userDoc = doc(db, "Notes", id);
    await deleteDoc(userDoc);
  };

  //ACTUALIZAR!!!!!
  const updateNote = async (id, Tittle) => {
    const userDoc = doc(db, "Notes", id);
    await updateDoc(userDoc, {
      Tittle: tittleValor,
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
        //esto ESTABA OK Y SERA MODIFICADO PAL EDIT
        return (
          <div key={pos}>
            {" "}
            <h1>T: {note.Tittle}</h1>
            <h2>n: {note.note}</h2>
            <input
              placeholder="Actualizar"
              onChange={(event) => {
                updateTittle(event.target.value);
                console.log(updateTittle);
              }}
            />
            <button
              onClick={() => {
                updateNote(note.id, note.Tittle);
              }}
            >
              {" "}
              ZEND{" "}
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
