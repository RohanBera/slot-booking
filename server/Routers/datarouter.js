const Router = require('express').Router;
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');
const { create, update, view, userDate } = require('../Models/data');
const DataRouter = Router();

// functions

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

// file upload

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'papers');
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['application/pdf'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}


DataRouter.post('/paper', (req, res) => {
    let upload = multer({ storage: storage, fileFilter: fileFilter }).single('paper_link');

    upload(req, res, (err) => {
        if (!req.file) {
            return res.send('Please select an file to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.json({message: err.message});
        }
        else if (err) {
            return res.json({ message: err.message });
        }
        res.json('Paper Added');
    });

});

// DataRouter.route('/paper').post(upload.single('paper_link'), (req, res) => {
//     const paper = req.file.filename;

//     const newUserData = {
//         paper
//     }

//     const newUser = new User(newUserData);

//     newUser.save()
//         .then(() => res.json('Paper Added'))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

module.exports = {
    DataRouter
};
