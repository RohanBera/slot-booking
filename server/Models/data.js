const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DataEntriesSchema = Schema({
    user: String,
    roll_number: String,
    slot_number: String,
    paper_link: {
        type: String
    }
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
        data = await DataEntries.find();
    }
    catch (err) {
        data = { message: err.message };
        throw err;
    }
    return data;
}

//return date of user 
const userDate = async (entry) => {
    try {
        var id = entry.id;
        check = await DataEntries.find({ roll_number: id })
        console.log(check);
        data = check;
    } catch (err) {
        data = { message: err.message };
        throw err;
    }
    return data;
}

// update
const update = async (id, update) => {
    // 'update' var is an obj
    try {
        data = await DataEntries.updateOne(
            { "roll_number": id },
            { $set: update }
        );
        if (!data) { console.log("No data found"); }
    }
    catch (err) {
        data = { message: err.message };
        throw err;
    }
    return data;
}

module.exports = {
    view, update, create, userDate
};