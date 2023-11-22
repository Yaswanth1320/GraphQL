const {model, Schema} = require('mongoose');

const recipeSchema = new Schema({
    name: String,
    description: String,
    createdAt: String,
    thumpsUp: Number,
    thumpsDown: Number
})

module.exports = model('Recipe', recipeSchema)