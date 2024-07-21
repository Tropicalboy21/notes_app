import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';


function truncateText(text, maxLength) {
    if(text.length <= maxLength )
        return text;
    return text.substring(0, maxLength) + '...';
}


function Note(props) {

    const truncatedContent = truncateText(props.content, 70)

    function handleClick() {
        props.onDelete(props.id);
    }

    function showMoreClick(){
        props.onShowMore(props.id)
    }

    return (
        <div className='note'>
            <h1>{props.title}</h1>
            <p>{truncatedContent}</p>
            <div className='buttonsContainer'>
                <button className='btn-more' onClick={showMoreClick}>Show More</button>
                <button className='btn-delete' onClick={handleClick}>
                    <DeleteIcon/>
                </button>
            </div>
        </div>
    );
}

export default Note;