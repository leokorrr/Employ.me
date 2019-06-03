var Job = require('../models/job.model');
var mongoose = require('mongoose');

mongoose.connect('mongodb://admin:admin123@ds261155.mlab.com:61155/jobs', { useNewUrlParser: true}, (err)=>{
    if (err) throw err;
    console.log('From insert.js: database connected');
})

var db = mongoose.connection;

var jobsCollection = db.collection('jobs');

function insertJob(jobTitle, jobSalary, jobCompany, jobDescription){
    var job = new Job({
        job_title: jobTitle,
        job_salary: jobSalary,
        job_company: jobCompany,
        job_description: jobDescription
    })

    job.save((err)=>{
        if (err) throw err;
        console.log(`New job ${jobTitle} was succesfully added`);
    })
}
var jobDesc = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus beatae tenetur ipsa recusandae unde animi maiores tempora magnam aperiam consequuntur, obcaecati impedit odit ab fugit! Deserunt hic officiis consectetur minima.';


for(var i = 1; i <= 10; i++) {
    var salary = Math.floor(Math.random() * 10000) + 1;  
    insertJob(`Job ${i}`, salary, `Company ${i}`, jobDesc);
}