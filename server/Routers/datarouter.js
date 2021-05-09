const Router = require('express').Router;
const {create,update,view} = require('../Models/data');
const DataRouter = Router();

var req1 = {
    query: { "user": "Bera" },
    update: { "$set": { "user": "Rohan", "paper_link": "shoeihwiuer" } },
    options: { returnNewDocument: true }
}

DataRouter.get("/update", (req, res) => {
    const data = update(req1.query, req1.update, req1.options);
    res.json(data);
});

DataRouter.get("/view", (req, res) => {
    res.json(view());
});

DataRouter.get("/create", (req, res) => {
    const data = create(req);
    res.json(data);
});

module.exports = {
    DataRouter
};

