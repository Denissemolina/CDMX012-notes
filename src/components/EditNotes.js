import "./editNotes.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../lib/FirebaseConfig";

export default function EditNotes() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [updateTittle, setUpdateTittle] = useState("");
  const [updateNote, setUpdateNote] = useState("");

  const [note, setNote] = useState([]);

  const content = [];

  const getDocuments = async () => {
    const docRef = doc(db, "Notes", id);
    const docS = await getDoc(docRef);
    content.push(docS.data());
    setNote(content);
    
  };

  const updateNotes = async (idPost) => {
    console.log({ id });
    const userDoc = doc(db, "Notes", idPost);
    await updateDoc(userDoc, {
      Tittle: updateTittle,
      note: updateNote,
    });
    navigate("/");
  };

  useEffect(() => {
    getDocuments();
  }, []);

  return (
    <div id="container_edit_notes">
      {note.map((note, key) => (
        <section className="note_maker" key={key}>
          <button className="button_return_home" onClick={() => navigate("/")}>
            <img className="img_return_home" src="../images/Delete.png" />
          </button>

          <input
            className="note_edit_inputs"
            defaultValue={note.Tittle}
            onChange={(event) => {
              setUpdateTittle(event.target.value);
            }}
          />

          <textarea
            className="note_edit_inputs"
            id='note_content'
            defaultValue={note.note}
            onChange={(event) => {
              setUpdateNote(event.target.value);
            }}
          />
          <section id="section_send_note">
            <button
              className="button_edit_note"
              onClick={() => {
                updateNotes(id);
              }}
            >
              <img className="send_note " src="../images/Send_note.png" />
            </button>
          </section>
        </section>
      ))}
    </div>
  );
}
