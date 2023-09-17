import React , {useState}from "react";
import NoteContext from "./noteContext";

const NotesState = (props) => {
    const notesinit = [
        {
            "_id": "64fe25f2fd148367fcb279c7",
            "user": "64fc5d1e4f627bd8cfb5670b",
            "title": "abc",
            "description": "woeking",
            "tag": "bussiness",
            "date": "2023-09-10T20:24:18.916Z",
            "__v": 0
        },
        {
            "_id": "6506d196de8a15a2b7a93688",
            "user": "64fc5d1e4f627bd8cfb5670b",
            "title": "to days work",
            "description": "bhai 8 baje uth",
            "tag": "exercise",
            "date": "2023-09-17T10:14:46.577Z",
            "__v": 0
        },
        {
            "_id": "64fe25f2fd148367fcb279c7",
            "user": "64fc5d1e4f627bd8cfb5670b",
            "title": "abc",
            "description": "woeking",
            "tag": "bussiness",
            "date": "2023-09-10T20:24:18.916Z",
            "__v": 0
        },
        {
            "_id": "6506d196de8a15a2b7a93688",
            "user": "64fc5d1e4f627bd8cfb5670b",
            "title": "to days work",
            "description": "bhai 8 baje uth",
            "tag": "exercise",
            "date": "2023-09-17T10:14:46.577Z",
            "__v": 0
        },
        {
            "_id": "6506d196de8a15a2b7a93688",
            "user": "64fc5d1e4f627bd8cfb5670b",
            "title": "to days work",
            "description": "bhai 8 baje uth",
            "tag": "exercise",
            "date": "2023-09-17T10:14:46.577Z",
            "__v": 0
        },
        {
            "_id": "6506d196de8a15a2b7a93688",
            "user": "64fc5d1e4f627bd8cfb5670b",
            "title": "to days work",
            "description": "bhai 8 baje uth",
            "tag": "exercise",
            "date": "2023-09-17T10:14:46.577Z",
            "__v": 0
        },
        {
            "_id": "6506d196de8a15a2b7a93688",
            "user": "64fc5d1e4f627bd8cfb5670b",
            "title": "to days work",
            "description": "bhai 8 baje uth",
            "tag": "exercise",
            "date": "2023-09-17T10:14:46.577Z",
            "__v": 0
        }
    ]
    const [notes, setnotes] = useState(notesinit);
    return (
        <NoteContext.Provider value={{notes,setnotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NotesState;