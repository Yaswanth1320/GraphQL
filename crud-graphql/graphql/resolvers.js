const Recipe = require('../models/recipes.js')

module.exports ={
    Query:{
        getRecipe: async(_,{_id}) => {
            return await Recipe.findById(_id)
        },
        recipes:async() => {
            return await Recipe.find()
        }
    },
    Mutation:{
    createRecipe:async(_,{recipeinput: {name,description}}) => {
        const createRecipe = new Recipe({
            name: name,
            description: description,
            createdAt: new Date().toISOString(),
            thumpsUp: 0,
            thumpsDown: 0
        });

        const res = await createRecipe.save();
        return {
            _id: res._id,
            ...res._doc
        }
    },
    deleteRecipe: async(_, {_id}) =>{
       const deletedCount = (await Recipe.deleteOne(_id)).deletedCount;
       return deletedCount
    },
    editRecipe: async(_,{_id,recipeinput: {name,description}}) =>{
        const editRecipe = (await Recipe.updateOne({_id: _id},{name: name,description: description})).modifiedCount
        return editRecipe
    }

    }
}