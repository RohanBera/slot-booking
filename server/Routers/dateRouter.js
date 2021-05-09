const Router = require('express').Router;
const { view, bookSlot, updateSlot } = require('../Models/dates');
const DateRouter = Router();

DateRouter.get("/view", (req, res) => {
    view().then((dates) => {
        console.log(dates);
        res.json(dates);
    }).catch(err => {
        res.json({ message: err.message });
    });
})

DateRouter.get("/bookSlot", (req, res) => {
    bookSlot(req.date).then((data) => {
        console.log(data);
        res.json({ message: "success" });
    }).catch(err => {
        res.json({ message: err.message });
    })
})

DateRouter.get("/updateSlot", (req, res) => {
    bookSlot(req.oldDate, req.newDate).then((data) => {
        console.log(data);
        res.json({ message: "success" });
    }).catch(err => {
        res.json({ message: err.message });
    })

})

module.exports = { DateRouter }