import "./createNote.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../lib/FirebaseConfig";

export default function CreateNotes() {
  const navigate = useNavigate();
  /////////////////////////////////////////////////
  const [updateTittle, setUpdateTittle] = useState("");
  const [updateNote, setUpdateNote] = useState("");

  const [note, setNote] = useState([]);

  const [newTittle, setNewTittle] = useState("");
  const [newNote, setNewNote] = useState("");
  const docRef = collection(db, "Notes");
  //CREAR NOTAS SI SIRVE
  const createNote = async (e) => {
    e.preventDefault();
    await addDoc(docRef, { Tittle: newTittle, note: newNote });
    navigate("/");
  };
  /////////////////////////////////////////

  return (
    <div id="container_create_note">
      <section id="note_maker">
        <button id="button_return_home" onClick={() => navigate("/")}>
          <img id="img_return_home" src="./images/Delete.png" />
        </button>

        <input
          className="note_inputs"
          id='input_tittle'
          placeholder="Título"
          onChange={(event) => {
            setNewTittle(event.target.value);
          }}
        />
        <input
          className="note_inputs"
          id="input_note"
          placeholder="Escribe tu nota 💀"
          onChange={(event) => {
            setNewNote(event.target.value);
          }}
        />
        <section id="section_send_note">
          <button id="button_send_note" onClick={createNote}>
            <img id="send_note" src="./images/Send_note.png" />
          </button>
        </section>
      </section>
      {note.map((note, kei) => {
        return <div id="container_notes" key={kei}></div>;
      })}
    </div>
  );
}
