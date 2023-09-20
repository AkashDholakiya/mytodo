import React , {useState} from "react";
import NoteContext from "./noteContext";

const NotesState = (props) => {
    const host = "http://localhost:5000";
    const [notes, setnotes] = useState([]);

    const getNotes = async () => {
        // API
        const response = await fetch(`${host}/api/notes/fetchnotes`,{
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
                'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmYzVkMWU0ZjYyN2JkOGNmYjU2NzBiIn0sImlhdCI6MTY5NDM3NTc5Mn0.F-L43oWN5isVqvs0mfYlxfP-8q4pfK-7DR7SSd9wuus'
            },
        })
        const json = await response.json();
        console.log("GetNotes : " + json);
        setnotes(json);
    } 
 
    const addnote = async (title,description,tag) => {
        // API
        const response = await fetch(`${host}/api/notes/addnote`,{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmYzVkMWU0ZjYyN2JkOGNmYjU2NzBiIn0sImlhdCI6MTY5NDM3NTc5Mn0.F-L43oWN5isVqvs0mfYlxfP-8q4pfK-7DR7SSd9wuus'
            },
            body : JSON.stringify({title,description,tag})
        })
        const note = await response.json();
        setnotes(notes.concat(note)) 
    }

    const deletenote = async (id) => {
        // API
        const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
            method : 'DELETE',
            headers : {
                'Content-Type' : 'application/json',
                'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmYzVkMWU0ZjYyN2JkOGNmYjU2NzBiIn0sImlhdCI6MTY5NDM3NTc5Mn0.F-L43oWN5isVqvs0mfYlxfP-8q4pfK-7DR7SSd9wuus'
            }, 
        })
        const json = await response.json(); 
        console.log("Delete Note : " ,json);

        const newNote = notes.filter((note) => {return note._id !== id})
        setnotes(newNote)   
    }

    const editnote = async (id,title,description,tag) => {
        // API
        const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json',
                'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmYzVkMWU0ZjYyN2JkOGNmYjU2NzBiIn0sImlhdCI6MTY5NDM3NTc5Mn0.F-L43oWN5isVqvs0mfYlxfP-8q4pfK-7DR7SSd9wuus'
            },
            body : JSON.stringify({title,description,tag})
        })
        const json = await response.json();  
        console.log("Edit note :",json);
        // Logic to edit 
        let newNote = JSON.parse(JSON.stringify(notes)); 
        for (let index = 0; index < newNote.length; index++) {
            const element = newNote[index];
            if(element._id === id){
                newNote[index].title = title;
                newNote[index].description = description;
                newNote[index].tag = tag;
                break;
            }
        }
        setnotes(newNote);
    }

    return (
        <NoteContext.Provider value={{notes,addnote,deletenote,editnote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NotesState;