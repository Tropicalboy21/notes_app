import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';

function CreateArea(props) {

    const [note, setNote] = useState(
        {
            title: "",
            date:"",
            content: ""
        });

    const [error, setError] = useState("")

    function handleChange(event) {
        const { name, value } = event.target;

        setNote(prevNote => {
            return {
                ...prevNote,
                [name]: value
            };
        });

        if (error && (name === 'title' || name === 'content') && value.trim() !== "") {
            setError("");
        }
    }

    function submitNote(event) {
        event.preventDefault();

        if (note.title.trim() === "" || note.content.trim() === ""){
            setError("Title and content cannot be empty.");
            return;
        }

        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const year = date.getFullYear();

        const currentDate = `${day}/${month}/${year}`;

        const newNote = {
            ...note, 
            date: currentDate
        };

        props.onAdd(newNote);
        setNote({
            title: "",
            date: "",
            content: ""
            
        });
    }

    return (
        <div>
            <form>
                <input name="title" placeholder="Title" value={note.title} onChange={handleChange} />
                <textarea name="content" placeholder="Take a note..." value={note.content} onChange={handleChange} />
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button onClick={submitNote}>
                <AddIcon/>
                </button>
            </form>
        </div>
    );
}

export default CreateArea;