const express = require("express");
const router = express.Router();
const fetchUserDetails = require("../middlewares/fetchUserDetails");
const Notes = require("../models/Notes");
const { body, validationResult } = require('express-validator');

// Fetching logged in user's saved notes at /api/notes/fetchnotes
router.get("/fetchnotes", fetchUserDetails, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id });
    const total_notes = notes.length;
    return res.json({ notes: notes, total_notes: total_notes });
})


// Adding new notes using /api/notes/addnotes
router.post("/addnotes", fetchUserDetails,
    [body('title', 'Entre a valid title.').isLength({ min: 3 }),
    body('description', 'Description should be of atleast 5 characters.').isLength({ min: 5 })],
    async (req, res) => {

        //checking if any feild has invalid value.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const new_note = await Notes.create({
                user: req.user.id,
                title: req.body.title,
                description: req.body.description,
                tag: req.body.tag
            });
            const saved_note = await new_note.save();
            return res.json({ saved_note });

        } catch (error) {
            return res.status(500).send(error)
        }
    })

// Updating notes using /api/notes/updatenote
router.put("/updatenote/:id",
    [body('title', 'Entre a valid title.').isLength({ min: 3 }),
    body('description', 'Description should be of atleast 5 characters.').isLength({ min: 5 })],
    fetchUserDetails,
    async (req, res) => {
        //checking if any feild has invalid value.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        try {
            const old_note = await Notes.findById(req.params.id);
            // verifying
            const token = req.user.id;
            if (token === old_note.user.toString()) {
                // collecting datas to be updated from the body
                const { title, description, tag } = req.body;
                // updated note schema
                const new_note = {};
                if (title) {
                    new_note.title = title;
                }
                if (description) {
                    new_note.description = description;
                }
                if (tag) {
                    new_note.tag = tag;
                }

                const updated_note = await Notes.findByIdAndUpdate(req.params.id, { $set: new_note }, { new: true });
                return res.json({ old_note, updated_note });
            }
            else {
                return res.status(401).send("You're not authorized to update the note.")
            }

        } catch (error) {
            return res.status(500).send(error);
        }
    })


// Deleting note
router.delete("/deletenote/:id", fetchUserDetails, async (req, res) => {
    try {
        const target_note = await Notes.findById(req.params.id);
        if (!target_note) {
            return res.status(404).send("Not Found!!")
        }
        if (target_note.user.toString() !== req.user.id) {
            return res.status(401).send("Not possible.");
        }
        const deleted_note = await Notes.findByIdAndDelete(req.params.id);
        return res.status(200).json({ code: "Success!!", deleted_note });


    } catch (error) {
        return res.status(500).send(error);
    }
})



module.exports = router