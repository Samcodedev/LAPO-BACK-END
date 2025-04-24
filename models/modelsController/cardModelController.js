const Card  = require("../cardModel")


const findCardWithBinPrefix = async (binPrefix) => {
    try {
        return Card.findOne({ binPrefix });
    } catch (error) {
        throw new Error(`Error finding card: ${error.message}`);
    }
}

const findCardById = async (id) => {
    try {
        return Card.findById(id)
    } catch (error) {
        throw new Error(`Error finding card: ${error.message}`);
    }
}

const getAllCard = async (id) => {
    try {
        return Card.find({ user: id })
    } catch (error) {
        throw new Error(`Error getting all cards: ${error.message}`);
    }
}

const deleteSingleCard = async (id, user) => {
    try {
        return Card.findByIdAndDelete(id, { user });
    } catch (error) {
        throw new Error(`Error deleting card: ${error.message}`);
    }
}


module.exports = { findCardWithBinPrefix, findCardById, getAllCard, deleteSingleCard }