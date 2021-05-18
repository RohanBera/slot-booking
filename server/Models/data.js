const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DataEntriesSchema = Schema({
    user: String,
    roll_number: String,
    slot_number: String,
    paper_link: String,
    _id: String
}, {
    versionKey: false
});

const DataEntries = mongoose.model("data-entries", DataEntriesSchema);

//chekc if new user 
// const ifNewUserr = () => {


// create
const create = async (entry) => {
    try {
        entry._id = entry.roll_number;

        await DataEntries.create(entry);
        data = { status: 1, message: "Success!" };
    }
    catch (err) {
        data = { status: 0 };
        if (err.code == 11000) {
            data.message = "User Already Exists";
        }
        else {
            data.message = err.message;
        }
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

const paperAdd = async (newDataEntry) => {
    let dataEntry = new DataEntries(newDataEntry);
    await dataEntry.save();
}

const paperUpdate = async (newDataEntry) => {
    try {
        console.log(newDataEntry);
        data = await DataEntries.updateOne(
            { roll_number: newDataEntry.roll_number },
            { $set: { paper_link: newDataEntry.paper_link } },
        );
        if (!data) { console.log("No data found"); }
    } catch (err) {
        data = { status: 0, message: err.message };
        throw err;
    }
    return data;
}

module.exports = {
    view, update, create, userDate, paperAdd, paperUpdate
};