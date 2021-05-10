const Router = require('express').Router;
const { view, bookSlot, updateSlot } = require('../Models/dates');
const DateRouter = Router();

DateRouter.get("/view", (req, res) => {
    view().then((dates) => {
        res.json(dates);
    }).catch(err => {
        res.json({ message: err.message });
    });
})

DateRouter.post("/bookSlot", (req, res) => {
    bookSlot(req.body.date).then((data) => {
        res.json({ message: "Success!" });
    }).catch(err => {
        res.json({ message: err.message });
    })
})

DateRouter.get("/updateSlot", (req, res) => {
    updateSlot(req.oldDate, req.newDate).then((data) => {
        console.log(data);
        res.json({ message: "Success!" });
    }).catch(err => {
        res.json({ message: err.message });
    })

})

module.exports = { DateRouter }