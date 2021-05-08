const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DataEntriesSchema = Schema({
    user: String,
    roll_number: String,
    slot_number: String,
    paper_link: String
});

const DataEntries = mongoose.model("data-entries",DataEntriesSchema);

module.exports = {
    DataEntries
};