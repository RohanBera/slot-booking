const Router = require('express').Router;
const { view } = require('../Models/dates');
const DateRouter = Router();

DateRouter.get("/view", (req, res) => {
    view().then((dates) => {
        console.log(dates);
        res.json(dates);
    }).catch(err => {
        res.json({ message: err.message });
    });
})

module.exports = { DateRouter }