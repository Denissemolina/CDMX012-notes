import "./editNotes.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../lib/FirebaseConfig";
import { doc, updateDoc, collection, getDocs } from "firebase/firestore";

export default function EditNotes() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [updateTittle, setUpdateTittle] = useState("");
  const [updateNote, setUpdateNote] = useState("");

  const [note, setNote] = useState([]);

  const getDoc = async () => {
    const docRef = collection(db, "Notes");
    const docS = await getDocs(docRef);
    setNote(docS);
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
    getDoc();
  }, []);

  return (
    <div id="container_edit_notes">
      {/* {note.map((note) => { */}
      <section className="note_maker">
        <button className="button_return_home" onClick={() => navigate("/")}>
          <img className="img_return_home" src="../images/Delete.png" />
        </button>

        <input
          className="note_edit_inputs"
          placeholder="Actualizar TITULO"
          onChange={(event) => {
            setUpdateTittle(event.target.value);
          }}
        />
        <input
          className="note_edit_inputs"
          placeholder="Actualizar nota"
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
      ;{/* })} */}
    </div>
  );
}
