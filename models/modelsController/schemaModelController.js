const Schema = require('../schemeModel')

const creatingSchema = async (schemeName, panLength, id) =>{
    try {
        const scheme = new Schema({ schemeName, panLength, user: id });
        return await scheme.save();
    } catch (error) {
        throw new Error(`Error creating card: ${error.message}`);
    }
}

const updatingSchema = async (schemeId, data, user) => {
    try {
        return await Schema.findByIdAndUpdate(schemeId, { data, user }, { new: true });
    } catch (error) {
        throw new Error(`Error updating card: ${error.message}`);
    }
}

const gettingAllSchema = async (user) => {
    try {
        return await Schema.find({ user: id });
    } catch (error) {
        throw new Error(`Error getting all cards: ${error.message}`);
    }
}

const deletingSchema = async (SchemaId, user) => {
    try {
        return await Schema.findByIdAndDelete(SchemaId, { user});
    } catch (error) {
        throw new Error(`Error getting all cards: ${error.message}`);
    }
}


module.exports = { creatingSchema, updatingSchema, gettingAllSchema, deletingSchema }