const express = require('express');
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const {body, validationResult} = require("express-validator");


// ROUTE: 1 - Get All the Notes using GET:  "/api/v1/auth/fetchallnotes" - Login Required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({user: req.user.id});
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");

      }
});

// ROUTE: 2 - Add Notes using POST:  "/api/v1/auth/addnote" - Login Required
router.post('/addnote', fetchuser, [
    body("title", "Please Enter Title").isLength({min: 3}),
    body("description", "Please Enter a Descriptino").isLength({min: 5}),
], async (req, res) => {
    try {
    const {title, description, tag} = req.body;
    // If there are errors return Bad Request and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
    }
    
    const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id
    })
    const savedNote = await note.save();
    res.json(savedNote);
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");

  }
});




// ROUTE: 3 - Update Note using PUT:  "/api/v1/notes/updatenote" - Login Required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
try {
    const {title, description, tag} = req.body;
    
     const newNote = {};
     if(title) {newNote.title = title}
     if(description) {newNote.description = description}
     if(tag) {newNote.tag = tag}

    //  Find the note to be updated and update it

    let note = await Notes.findById(req.params.id)
    if(!note) {
        return res.status(404).send("Not Found");
    }
    if(note.user.toString() !== req.user.id) {
    return res.status(401).send("Bad Hacking! Be more good on your skills. You can't hack my user's privacy:)");
    }

    note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
    res.json(note);
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");

}
    
    
})

// ROUTE: 4 - Delete Note using DELETE:  "/api/v1/notes/deletenote" - Login Required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
try {
    //  Find the note to be deleted and delete it

    let note = await Notes.findById(req.params.id)
    if(!note) {
        return res.status(404).send("Not Found");
    }
    if(note.user.toString() !== req.user.id) {
    return res.status(401).send("Bad Hacking! Be more good on your skills. You can't hack my user's privacy:)");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({success: "Note has been deleted", note: note});
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");

}
})


router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const {title, description, tag} = req.body;
        
         const newNote = {};
         if(title) {newNote.title = title}
         if(description) {newNote.description = description}
         if(tag) {newNote.tag = tag}
    
        //  Find the note to be updated and update it
    
        let note = await Notes.findById(req.params.id)
        if(!note) {
            return res.status(404).send("Not Found");
        }
        if(note.user.toString() !== req.user.id) {
        return res.status(401).send("Bad Hacking! Be more good on your skills. You can't hack my user's privacy:)");
        }
    
        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    
    }
    
})
    router.get('/getnote/:id', fetchuser, async (req, res) => {
        let code = null;
try {
    // const {noteId} = req.body;
    
    
    //  if(title) {newNote.title = title}
    //  if(description) {newNote.description = description}
    //  if(tag) {newNote.tag = tag}

    //  Find the note to be updated and update it

    let note = await Notes.findById(req.params.id)
    if(!note) {
        code = 404;
        return res.status(404).send({code, error: "Not Found"});
    }
    if(note.user.toString() !== req.user.id) {
        code = 401;
    return res.status(401).send({code, error: "Bad Hacking! Be more good on your skills. You can't hack my user's privacy:)"});
    }

    // note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
    code = 200;
    res.json({code, note});
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");

}
})


module.exports = router