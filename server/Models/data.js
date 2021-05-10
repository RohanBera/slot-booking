const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DataEntriesSchema = Schema({
    user: String,
    roll_number: String,
    slot_number: String,
    paper_link: String
}, {
    versionKey: false
});

const DataEntries = mongoose.model("data-entries", DataEntriesSchema);

// create
const create = async (entry) => {
    try {
        var id = entry.roll_number;

        var check = await DataEntries.find({ roll_number: id })

        if (check.length === 0) {
            data = DataEntries.create(entry);
            data = { status: 1, message: "Success!" };
        }
        else {
            // console.log("User already exists!!!");
            data = { status: 0, message: "User already exists!" };
        }
    }
    catch (err) {
        data = { status: 0, message: err.message };
        throw err;
    }
    return data;
}

// View 
const view = async () => {
    try {
        data = DataEntries.find();
    }
    catch (err) {
        data = { message: err.message };
        throw err;
    }
    return data;
}

// update
const update = async (query, update, options) => {
    try {
        data = DataEntries.findOneAndUpdate(query, update, options)
        if (!data) { console.log("No data found"); }
    }
    catch (err) {
        data = { message: err.message };
        throw err;
    }
    return data;
}

module.exports = {
    view, update, create
};