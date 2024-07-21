import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function More({note, onClose, onUpdate, onDelete}) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);

    const handleDelete = () => {
        onDelete(note.id);
        onClose();
    };

    const handleUpdate = () => {

        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const year = date.getFullYear();

        const currentDate = `${day}/${month}/${year}`;

        const updatedNote = {
            ...note,
            title,
            content,
            date: currentDate
        };
        onUpdate(updatedNote);
        setIsEditing(false);
    };

    return(
        <div>
            <div className="overlay" onClick={onClose}></div>
            <div className="modal">
                {isEditing?(<div className='edit'>
                    <h1>Edit Note</h1>
                    <input 
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea 
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <div className='btn-container'>
                        <button onClick={handleUpdate}>Update</button>
                        <button onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                </div>
                ):(<div>
                        <button className="modal-button" onClick={onClose}>
                            <CloseIcon/>
                        </button>
                        <div className="modal-content">
                            <h1>{note.title}</h1>
                            <h2>Created on {note.date}</h2>
                            <p>{note.content}</p>
                            <div className='btn-container'>
                                <button onClick={() => setIsEditing(true)}>Edit<EditIcon/></button>
                                <button onClick={handleDelete}>Delete <DeleteIcon/></button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default More;