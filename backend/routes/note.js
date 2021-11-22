const express = require("express");
const fetchuserdata = require("../middleware/fetchuser");
const router = express.Router();
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator"); // user for validation


// Route - 1 : is used to fetch notes : Login required
router.get("/readnotes", fetchuserdata, async (req, res) => {
    
  try {

    const notes = await Note.find({ user: req.user.id }); // fetching the notes of particular user
    res.json(notes);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "something went wrong...." });
  }
});


// Route - 2 : it is used to create a note : Login required
router.post(
  "/addnotes",
  //validating a note
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("desc", "description must be atleast 5 characters").isLength({
      min: 6,
    }),
    fetchuserdata,
  ],
  async (req, res) => {
    const errors = validationResult(req);

    //if there are some errors it will execute
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //de-structuring
    const { title, desc, tag } = req.body;

    try {

      const note = new Note({ title, tag, desc, user: req.user.id }); // creating a new note
      const savedNote = await note.save(); // saving a note
      res.json(savedNote);

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "something went wrong...." });
    }
  }
);

// Route - 3 : it is used to update existing note : Login required
router.put("/updatenote/:id", fetchuserdata, async (req, res) => {
  const { title, tag, desc } = req.body; // de-structuring
  try {
    const newNote = {}; // created new note 

    // appending given data to a note which is going to update
    if (title) {
      newNote.title = title;
    }
    if (tag) {
      newNote.tag = tag;
    }
    if (desc) {
      newNote.desc = desc;
    }

    //cecking for a note which is going to update is present in db or not
    let note = await Note.findById(req.params.id);

    //if note is not present then do this
    if (!note) { 
      return res.status(404).send("Note Not Found");
    }

    // checking a user who is deleting a note is same or not
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    // if user is valid
    // update note
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote }, // setting a note. 
      { new: true } // if we provide some new value that we not given at a time of creating a note(means the default val attined by db)that also chagable this time by giving input.
    );
    return res.json(note);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something Went Wrong." });
  }
});


// Route - 4 : it is used to delete a particular note : Login required
router.delete("/deletenote/:id", fetchuserdata, async (req, res) => {
  try {

    //cecking for a note which is going to update is present in db or not
    let note = await Note.findById(req.params.id);

    //if note is not present then do this
    if (!note) {
      return res.status(404).send("Note Not Found");
    }

    // checking a user who is deleting a note is same or not
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    // if user is valid
    // delete note
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note deleted successfully...", note: note });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "something went wrong" });
  }
});

module.exports = router;
