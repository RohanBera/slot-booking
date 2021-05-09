const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DataEntriesSchema = Schema({
    user: String,
    roll_number: String,
    slot_number: String,
    paper_link: String
});

const DataEntries = mongoose.model("data-entries", DataEntriesSchema);

// create
const create = async (entry) => {
    try{
        data = DataEntries.create(entry);
    }
    catch(err){
        data = { message: err.message };
        throw err;
    }
    return data;
}

// View 
const view = async () => {
    try{
        data = DataEntries.find();
    }
    catch(err){
        data = { message: err.message };
        throw err;
    }
    return data;
}

// update
const update = async (query, update, options) => {
    try{
        data = DataEntries.findOneAndUpdate(query, update, options)
        if(!data){console.log("No data found");}
    }
    catch(err){
        data = { message: err.message };
        throw err;
    }
    return data;
}

module.exports = {
    view, update, create
};