const express = require ('express');
const router = express.Router();
const { frontendUrl } = require('../config');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended:false})

let Job = require('../models/job.model');

let filters;

router.post('/jobs', urlencodedParser,  (req, res, next) => {
    filters = req.body;
})

router.get('/jobs', (req, res, next) => {
    if (filters) {
        let sortingNumber = filters.salary;
        let requirements = [];
        let dataObjTitles =[];
        let dataObjSorted = [];
        let dataObjFiltered = [];
        let dataFiltered = [];

        for (let key in filters) {
            if (key.includes("Requirement")) {
                requirements.push(key)
            } else {

            }
        }

        Job.find({}, (err, data) => {
            if (err) {
                return err
            }

            if (filters.jobTitle !== '') {
                for (let i = 0; i < data.length; i++) {
                    if(data[i].job_tag.includes(filters.jobTitle.toLowerCase())) {
                        dataObjTitles.push(data[i])
                    }
                }
            } else {
                dataObjTitles = data
            }

            if (filters.salary !== '') {
                for (var i = 0; i < dataObjTitles.length; i++) {
                    if(dataObjTitles[i].job_salary >= sortingNumber) {
                        dataObjSorted.push(dataObjTitles[i])
                    }
                }
            } else {
                dataObjSorted = dataObjTitles;
            }

            if (requirements.length !== 0) {
                for (var i = 0; i < dataObjSorted.length; i++) {
                    let reqChecker = requirements.some(v => dataObjSorted[i].job_requirements.includes(v))
                
                    if (reqChecker) {
                        dataObjFiltered.push(dataObjSorted[i])
                    }
                }
            } else {
                dataObjFiltered = dataObjSorted 
            }

            // if (dataObjFiltered.length <= dataObjSorted.length && filters.requirements) {
            //     dataFiltered = dataObjFiltered
            // } else {
            //     dataFiltered = dataObjSorted
            // }
                
            res.send(dataObjFiltered)
                
        })

    } else {
        Job.find({}, (err, data) => {
            if (err) {
                return err
            } else {
                res.send(data)
            }
        })
    }
})

router.get('/tests', (req, res) => {
    Job.find({}, (err, data) => {
        
    })
})

module.exports = router;