import NoteContext from "./noteContext";

const NoteState = (props) => {
    const state = {
        "name" : "akash",
        "class" : "11th" 
    }

    return (
        <NoteContext.provider value={state}>
            {props.children}
        </NoteContext.provider>
    )
}


export default NoteState;