const Router = require('express').Router;
const {create,update,view} = require('../Models/data');
const DataRouter = Router();

DataRouter.get("/update", (req, res) => {
    const data = update(req.query, req.update, req.options);
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

