import React,{useContext,useState} from 'react'
import noteContext from '../Context/notes/noteContext';

const Addnote = (props) => {
    const context = useContext(noteContext);
    const {addnote} = context;
    const [note, setnote] = useState({title : "", description : "", tag:""})
    const Handle = (e) => {
        e.preventDefault();
        addnote(note.title,note.description,note.tag)
        setnote({title : "", description : "", tag:""})
        props.showAlert("Note Added successfully","success");
    }
    const onChange = (e) => {
        setnote({...note, [e.target.name] : e.target.value})
    }
  return (
    <div>
        <div className="container">
        <h1 className='my-4'>Add Your Note</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name="description" value={note.description
            } onChange={onChange} minLength={5} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" value={note.tag} className="form-control" id="tag" name="tag" onChange={onChange} minLength={5} required/>
          </div>
          <button disabled={note.title.length < 5 || note.description.length < 5 || note.tag.length < 3} type="submit" className="btn btn-primary" onClick={Handle}>Add Note</button>
        </form>
      </div>
    </div> 
  )
}

export default Addnote
    