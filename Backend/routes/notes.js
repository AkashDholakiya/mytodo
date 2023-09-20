const express = require('express')
const router = express.Router();
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');
const fetchuser = require("../middleware/fetchuser")

// Route 1 for getting all the notes
router.get('/fetchnotes',fetchuser,async (req,res) => {
    try {
        const notes = await Notes.find({user : req.user.id});
        res.json(notes);
        
    } catch (error) {
        console.error(err.message);
        res.status(500).send("error found"); 
    }
})

// Route 2 Add notws
router.post('/addnote',fetchuser,[
    body('title', 'length of the name should be greater than 3').isLength({ min: 3 }),
    body('description', 'enter a valid descrption ').isLength({min : 5})
],async (req,res) => {
    try {
        const {title,description , tag} = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const newNote = new Notes({
            title,description,tag,user : req.user.id
        }) 
        const saveNote = await newNote.save();
    
        res.json(saveNote);
    } catch (error) {
        console.error(err.message);
        res.status(500).send("error found"); 
    }
})

 
// Route 3 : /api/auth/updatenote UPDATE NOTE
router.put('/updatenote/:id',fetchuser,async (req,res) => {
    const {title,description,tag} = req.body;
    try {
        const newNote = {};
        // create a newNote object
        if(title){
            newNote.title = title
        }
        if(description){
            newNote.description = description
        }
        if(tag){
            newNote.tag = tag 
        }
        // Find the note to be updated  
        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not Found");
        }
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndUpdate(req.params.id , {$set : newNote}, {new:true})
         res.json({note})
        
    } catch (error) {
        console.error(err.message);
        res.status(500).send("error found"); 
    }

})


// Route 4 : /api/auth/deletenote DELETE NOTE
router.delete('/deletenote/:id',fetchuser,async (req,res) => {
    try{
    // Find the note to be deleted  
    let note = await Notes.findById(req.params.id);
    if(!note){
        return res.status(404).send("Not Found");
    }
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
    }

    note = await Notes.findByIdAndDelete(req.params.id);
     res.json({"Success" : "Note has been deleted" ,note: note})
    }catch(error){
        console.error(err.message);
        res.status(500).send("error found"); 
    }

})

module.exports = router 