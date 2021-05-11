const Router = require('express').Router;
const { create, update, view, userDate } = require('../Models/data');
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
    // console.log(req.body);
    create(req.body).then((data) => {
        res.json(data);
    }).catch(err => {
        res.json({ message: err.message });
    });
});

module.exports = {
    DataRouter
};

