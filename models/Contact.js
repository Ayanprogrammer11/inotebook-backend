const mongoose = require('mongoose');
const { Schema } = mongoose;

const ContactSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    email: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})

const Contact = mongoose.model("contact", ContactSchema);

module.exports = Contact;