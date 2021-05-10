const Router = require('express').Router;
const { create, update, view } = require('../Models/data');
const DataRouter = Router();

var req1 = {
    query: { "user": "Bera" },
    update: { "$set": { "user": "Rohan", "paper_link": "shoeihwiuer" } },
    options: { returnNewDocument: true }
}

DataRouter.get("/update", (req, res) => {
    update(req.query, req.update, req.options).then((data) => {
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

DataRouter.post("/create", (req, res) => {
    console.log(req.body);
    create(req.body).then((data) => {
        res.json(data);
    }).catch(err => {
        res.json({ message: err.message });
    });
});

module.exports = {
    DataRouter
};

