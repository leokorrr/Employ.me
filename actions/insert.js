var Job = require('../models/job.model');
var mongoose = require('mongoose');

mongoose.connect('mongodb://admin:admin123@ds261155.mlab.com:61155/jobs', { useNewUrlParser: true}, (err)=>{
    if (err) throw err;
    console.log('From insert.js: database connected');
})

var db = mongoose.connection;

var jobsCollection = db.collection('jobs');

function insertJob(jobTitle, jobSalary, jobCompany){
    var job = new Job({
        job_title: jobTitle,
        job_salary: jobSalary,
        job_company: jobCompany
    })

    job.save((err)=>{
        if (err) throw err;
        console.log(`New job ${jobTitle} was succesfully added`);
    })
}

insertJob('Student', 500, 'Pomeranian Academy');
insertJob('Memes surfer', 3500, '9GAG');