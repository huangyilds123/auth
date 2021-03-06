const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// create schema 
const ItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now

    }
}, { collection: 'items' })

module.exports = Item = mongoose.model('item', ItemSchema)