import "./notes.css";
import { auth, collection, getDocs, addDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../lib/FirebaseConfig";


const firstNotes = async (e) => {
  try {
    const docRef = await addDoc(collection(db, "Nouts"), {
      Tittle: "ho",
      Note: "la",
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const handleChange = ({ target: { Tittle, value } }) =>
docRef({ ...Notes, [Tittle]: value });


export default function Notes() {
  return (
    <div className="div_notes">
      <div>
        <form>
          <input onChange={handleChange} placeholder="Titulo" />
          <input onChange={handleChange} placeholder="Escribe tu nota" />
        </form>
        <button onClick={firstNotes}> Enviar </button>
      </div>
    </div>
  );
}
