const path = require('path');

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

const con = require("./connect");

const { DataRouter } = require("./Routers/datarouter");
const { view, update } = require("./Models/data");

con.connect();

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});

// app.use("/data",DataRouter);
app.get("/data", view);


// // update
var req1 = {
    query: { "user": "Bera" },
    update: { "$set": { "user": "Rohan", "paper_link": "shoeihwiuer" } },
    options: { returnNewDocument: true }
}



// app.use(express.static(path.resolve(__dirname,'../client/build')));

app.get("/api", (req, res) => {
    res.json({ message: "Hello World!" });
});


// app.get('/', (req,res) => {
//     res.sendFile(path.resolve(__dirname,'../client/build','index.html'));
// });


