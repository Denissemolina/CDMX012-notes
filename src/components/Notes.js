import "./notes.css";
import {
  auth,
  collection,
  getDocs,
  addDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../lib/FirebaseConfig";
import { useEffect, useState } from "react";

export default function Notes() {
  const [newTittle, setNewTittle] = useState("");
  const [newNote, setNewNote] = useState("");

  const [note, setNote] = useState([]);
  const docRef = collection(db, "Notes");

  const createNote = async () => {
    await addDoc;
  };

  const updateNote = async (id, Tittle, note) => {
    await updateDoc(docRef, {
      Tittle: newTittle,
      note: newNote,
    });
  };

  useEffect(() => {
    const impressNotes = async () => {
      const data = await getDocs(docRef);
      setNote(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    impressNotes();
  }, []);

  return (
    <div className="div_notes">
      <div>
        <form>
          <input
            onChange={(event) => {
              setNewTittle(event.target.value);
            }}
            placeholder="Titulo"
          />
          <input
            onChange={(event) => {
              setNewNote(event.target.value);
            }}
            placeholder="Escribe tu nota"
          />
        </form>
        <button onClick={createNote}> Enviar </button>
        {note.map((note) => {
          return (
            <div>
              {" "}
              <h1>Tittle: {note.Tittle}</h1>
              <p>note: {note.note}</p>
            </div>
          );
        })}
        <input
          onChange={(event) => {
            setNewNote(event.target.value);
          }}
          placeholder="Actualiza"
        />
        <button
          onClick={ updateNote(note.id, note.Tittle)}
        >
          Edit
        </button>
      </div>
    </div>
  );
}
