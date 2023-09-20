import React, { useContext, useEffect, useRef ,useState} from 'react'
import noteContext from '../Context/notes/noteContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote';

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes, editnote } = context;
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, [])
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setnote] = useState({id:"",etitle : "", edescription : "", etag:""})


  const updateNote = (currentnote) => {
    ref.current.click();
    setnote({id: currentnote._id,etitle: currentnote.title, edescription : currentnote.description, etag : currentnote.tag});
  }
  const Handle = (e) => {  
    editnote(note.id,note.etitle,note.edescription,note.etag)
    refClose.current.click(); 
    props.showAlert("Updated Successfully","success");  
  }
  const onChange = (e) => {
      setnote({...note, [e.target.name] : e.target.value})
  }
  return (
    <>
      <Addnote showAlert={props.showAlert}/>
      <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" value={note.edescription} id="edescription" name="edescription" onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" value={note.etag} name="etag" onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" disabled={note.etitle.length < 5 || note.edescription.length < 5 || note.etag.length < 3} onClick={Handle} className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <h2 className='my-4'>Your Notes</h2>
        <div className="container mx-2">
          {notes.length === 0 && 'No notes to display'}
        </div>
        {notes.map((note) => {
          return <Noteitem key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note} />;
        })}
      </div>
    </>
  )
}

export default Notes
