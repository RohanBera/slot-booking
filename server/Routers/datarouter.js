const Router = require('express').Router;
const {DataEntries} = require('../Models/data');
const DataRouter = Router();

DataRouter.get('/',(req, res) => {
    DataEntries.find().then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json({message: err.message});
    });
});

module.exports = {
    DataRouter
};

