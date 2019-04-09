const express = require ('express');
const router = express.Router();

router.get('/freelancer', (req, res, next) => {
    res.send('Data from Freelancer.com')
});

router.get('/upwork', (req, res, next) => {
    res.send('Data from UpWork.com')
});

router.post('/todos', (req, res, next) => {

});

module.exports = router;