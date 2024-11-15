// noticeSchema.js

const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    },
    createdby: {
        type: String,
        // required: true
    },
    role: {
        type: String,
        // required: true
    },
    tag: {
        type: String,
    }
    // date: {
    //     type: Date,
    //     // default: Date.now
    // }
}, { timestamps: true });

module.exports = mongoose.model("notice", noticeSchema);
