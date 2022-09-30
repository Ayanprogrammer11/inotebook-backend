const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const {body, validationResult} = require("express-validator");
const Contact = require("../models/Contact");


// let host = "http://localhost:5000";

router.post("/addcontact", [
    body("subject").isLength({min: 5}),
    body("message").isLength({min: 10})
], fetchuser, async (req, res) => {
let success = false;
    try {

        const errors = validationResult(req);
    if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
    }
       const {email, subject, message} = req.body;

        // const email = req.user.email;
       const user = req.user.id;
       

       const contact = new Contact({
          user,
          email,
          subject,
          message
       });

       const savedContact = await contact.save();
       success = true;
       res.json({success, message: "Suggestion received", savedContact});

    } catch (error) {
        console.error(error);
    }
});




module.exports = router;