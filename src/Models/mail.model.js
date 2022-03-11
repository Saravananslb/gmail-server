const mongoose = require('mongoose');

const mailSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    emailTo : {
        type: Array,
        required: true
    },
    emailCC : {
        type: Array
    },
    emailBCC : {
        type: Array
    },
    body: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    attachment: {
        type: String,
    },
    isSent: {
        type: Boolean
    },
    starred: {
        type: Array
    },
    trash: {
        type: Array,
    },
    isForward: {
        type: Boolean,
        default: false
    },
    isReply: {
        type: Boolean,
        default: false
    },
    delete: {
        type: Array,
    },
    forward: {
        type: Array,
    },
    reply: {
        type: Array,
    },
    readRecepient: {
        type: Array
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('mails', mailSchema);