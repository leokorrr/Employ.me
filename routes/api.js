const express = require ('express');
const router = express.Router();

var Job = require('../models/job.model');

router.get('/jobs', (req, res, next) => {
    Job.find((err, jobs)=>{
        if(err) {
            console.log(err);
        } else {
            res.json(jobs)
        }
    })
})

module.exports = router;