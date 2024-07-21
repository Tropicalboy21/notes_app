import React, { useState , useEffect} from "react";
import Header from './Header';
import Note from './Note';
import Footer from './Footer';
import CreateArea from './CreateArea';
import Modal from './More';
import LightMode from '@mui/icons-material/Brightness7';
import DarkMode from '@mui/icons-material/Brightness4';
import "../firebase";
import {getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc} from "firebase/firestore";

function App() {

    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);
    const [darkMode, setDarkMode] = useState(false);

    const db = getFirestore();

    useEffect(() => {

        const savedDarkMode = JSON.parse(localStorage.getItem('darkMode'));
                if (savedDarkMode) {
                setDarkMode(true);
        }

        const loadNotes = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "notes"));
                const firebaseNotes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setNotes(firebaseNotes);
            } catch (error) {
                console.error("Error fetching documents: ", error);
            }
        };

        loadNotes();
    }, [db]);

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
        document.body.className = darkMode ? 'dark-mode' : '';
    }, [darkMode]);


    const addNote = async (newNote) => {
        try {
            const docRef = await addDoc(collection(db, "notes"), newNote);
            setNotes(prevNotes => {
                return [{ id: docRef.id, ...newNote }, ...prevNotes];
            });
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    const updateNote = async (updatedNote) => {
        try {
            const noteRef = doc(db, "notes", updatedNote.id);
            await updateDoc(noteRef,{
                title: updatedNote.title,
                content: updatedNote.content,
                date: updatedNote.date
            });

            if (selectedNote && selectedNote.id === updatedNote.id) {
                setSelectedNote(updatedNote);
            }

            const querySnapshot = await getDocs(collection(db, "notes"));
            const firebaseNotes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setNotes(firebaseNotes);
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };

    const deleteNote = async (id) => {

        try {
            const noteRef = doc(db, "notes", id);
            await deleteDoc(noteRef);
    
            setNotes(prevNotes => {
                const updatedNotes = prevNotes.filter(note => note.id !== id);
                return updatedNotes;
            });

            if (selectedNote && selectedNote.id === id) {
                setSelectedNote(null);
            }
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    };

    function showMore(id) {
        const note = notes.find(note => note.id === id);
        setSelectedNote(note);
    }

    function closeModal() {
        setSelectedNote(null);
    }

    function toggleDarkMode() {
        setDarkMode(prevMode => !prevMode);
    }

    return (
        <div className="main">
            <Header />
            <button onClick={toggleDarkMode} className="dark-mode-toggle">
                {darkMode ? <LightMode/> : <DarkMode/>}
            </button>
            <CreateArea onAdd={addNote} />
            <div className="notesContainer">

            {notes.map((noteItem) => {
                return <Note key={noteItem.id} id={noteItem.id} title={noteItem.title} date={noteItem.date} content={noteItem.content} onDelete={deleteNote} onShowMore={showMore}/>
            })}
            </div>

            <Footer />
            {selectedNote && <Modal note={selectedNote} onClose={closeModal} onUpdate={updateNote} onDelete={deleteNote}/>}
        </div>
    );
}

export default App;