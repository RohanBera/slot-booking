const Router = require('express').Router;
const {create,update,view} = require('../Models/data');
const DataRouter = Router();

var req1 = {
    query: { "user": "Bera" },
    update: { "$set": { "user": "Rohan", "paper_link": "shoeihwiuer" } },
    options: { returnNewDocument: true }
}

DataRouter.get("/update", (req, res) => {
    update(req1.query, req1.update, req1.options).then((data) => {
        res.json(data);
    }).catch(err => {
        res.json({ message: err.message});
    });
});

DataRouter.get("/view", (req, res) => {
    view().then((data) => {
        res.json(data);
    }).catch(err => {
        res.json({ message: err.message});
    });
});

DataRouter.get("/create", (req, res) => {
    create(req).then((data) => {
        res.json(data);
    }).catch(err => {
        res.json({ message: err.message });
    });
    res.json(data);
});

module.exports = {
    DataRouter
};

