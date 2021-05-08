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

const create = (req, res) => {
    DataEntries.create(req).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json({ message: err.message });
    })
}

// View 

// const view = (req, res) => {
//     DataEntries.find().then((data) => {
//         res.json(data);
//     }).catch((err) => {
//         res.json({ message: err.message });
//     })
// }


const view = () => {
    DataEntries.find()
        .then((data) => {
            return data;
        }).catch((err) => {
            return { message: err.message };
        })
}

const view = async () => {
    let data = await DataEntries.find()
    return data
}


// update

// const update = (req, res) => {

//     DataEntries.findOneAndUpdate(req.query, req.update).then((data) => {
//         if (data) {
//             console.log(data);
//             res.json(data);
//         }
//         else
//             console.log("No data found");
//     }).catch(err => {
//         res.json({ message: err.message });
//     })
// }

const update = (query, update, options) => {
    DataEntries.findOneAndUpdate(query, update, options)
        .then((data) => {
            if (data) {
                console.log(data);
                return data
            }
            else
                console.log("No data found");
        }).catch(err => {
            return { message: err.message };
        })
}

module.exports = {
    view, update
};