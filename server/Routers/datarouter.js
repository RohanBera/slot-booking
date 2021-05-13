const Router = require('express').Router;
const multer = require('multer');
const { create, update, view, userDate, paperAdd } = require('../Models/data');
const DataRouter = Router();

DataRouter.post("/update", (req, res) => {
    update(req.body.id, req.body.update).then((data) => {
        res.json(data);
    }).catch(err => {
        res.json({ message: err.message });
    });
});

DataRouter.get("/view", (req, res) => {
    view().then((data) => {
        res.json(data);
    }).catch(err => {
        res.json({ message: err.message });
    });
});

DataRouter.post("/userDate", (req, res) => {
    userDate(req.body).then((data) => {
        res.json(data);
    }).catch(err => {
        res.json({ message: err.message });
    });
});

DataRouter.post("/create", (req, res) => {
    create(req.body).then((data) => {
        res.json(data);
    }).catch(err => {
        res.json({ status: 0, message: err.message });
    });
});

let upload = multer({ dest: "papers" });

//upload paper
DataRouter.post('/paper-upload', upload.single('paper_link'), (req, res) => {
    const user = req.body.user;
    const roll_number = req.body.roll_number;
    const slot_number = req.body.slot_number;
    const paper_link = req.file.filename;
    const newDataEntry = {
        user,
        roll_number,
        slot_number,
        paper_link,
        _id: roll_number
    }

    create(newDataEntry)
        // paperAdd(newDataEntry)
        .then((data) => {
            console.log(data);
            res.json({ ...data });

        })
        .catch(err => {
            console.log(data);
            res.json({ status: 0, message: err.message })
        });
});

// update paper 
DataRouter.post('/paper-update', upload.single('paper_link'), (req, res) => {
    const roll_number = req.body.roll_number;
    const paper_link = req.file.filename;
    const newDataEntry = {
        roll_number,
        paper_link,
        _id: roll_number
    }
    paperAdd(newDataEntry)
        .then((data) => {
            console.log(data);
            res.json({ status: 1, message: 'Paper Added' })

        })
        .catch(err => {
            console.log(data);
            res.json({ status: 0, message: 'User Already Exists' })
        });
});

module.exports = {
    DataRouter
};