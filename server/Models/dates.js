const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DateSchema = Schema({
    date: String,
    day: String,
    slots: Number
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

module.exports = { view };


