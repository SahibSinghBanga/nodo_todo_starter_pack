const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        unique: true
    },
    body: {
        type: String,
        required: [true, 'Please add the body'],
      },
    createdAt: {
        type: Date,
        default: Date.now
    }  
});

module.exports = mongoose.model('Todo', TodoSchema);