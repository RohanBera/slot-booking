const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DateSchema = Schema({
    date: String,
    day: String,
    slots: Number
}, {
    versionKey: false
});

const DateEntries = mongoose.model("dates", DateSchema);

// view
const view = async () => {
    try {
        data = await DateEntries.find()
    } catch (err) {
        console.error(err);
        data = { message: err.message };
        throw err;
    }
    return data;
}

// book slot (decrement when booked)
const bookSlot = async (date) => {
    try {
        data = await DateEntries.updateOne(
            { "date": date },
            { $inc: { slots: -1 } }
        );
        if (!data) { console.log("No data found"); }
    } catch (err) {
        data = { message: err.message };
        throw err;
    }
    return data;
}

// update slot (decrement current, increment old) 
const updateSlot = async (oldDate, newDate) => {
    try {
        await DateEntries.updateOne(
            { "date": oldDate },
            { $inc: { "slots": 1 } }
        );
        data = await DateEntries.updateOne(
            { "date": newDate },
            { $inc: { "slots": -1 } }
        );
        if (!data) { console.log("No data found"); }
    } catch (err) {
        data = { message: err.message };
        throw err;
    }
    return data;
}

module.exports = { view, bookSlot, updateSlot };


