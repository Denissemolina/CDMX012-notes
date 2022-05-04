import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../lib/FirebaseConfig";
import { doc, updateDoc, collection } from "firebase/firestore";

export default function EditNotes() {
  const [updateTittle, setUpdateTittle] = useState("");
  const [updateNote, setUpdateNote] = useState("");
  const docRef = collection(db, "Notes");
  const [note, setNote] = useState([]);
  //EDITAR
  const updateNotes = async (id, Tittle, note) => {
    const userDoc = doc(db, "Notes", id);
    await updateDoc(userDoc, {
      Tittle: updateTittle,
      note: updateNote,
    });
  };
  [];

  useEffect(() => {
    updateNotes();
  }, []);

  return (
    <div id="container_notes">
      <section>
        <h1>{note.Tittle}</h1>

        <input
          placeholder="Actualizar titulo"
          onChange={(event) => {
            setUpdateTittle(event.target.value);
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
          <img id="img_edit_btn" src="./images/Send_note.png" />
        </button>
      </section>
      
    </div>
  );
}
