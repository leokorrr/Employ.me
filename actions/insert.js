var Job = require('../models/job.model');
var mongoose = require('mongoose');

mongoose.connect('mongodb://admin:admin12345@ds241968.mlab.com:41968/employme', { useNewUrlParser: true}, (err)=>{
    if (err) throw err;
    console.log('From insert.js: database connected');
})

var db = mongoose.connection;

var jobsCollection = db.collection('jobs');
var jobBenefits = [];
var jobAboutCompany = [];
var jobRequirements = [];
let jobTitle;

function generateRandomBenefits (count) {
    for (var i = 1; i <= count; i++) {
        jobBenefits.push(`Lorem benefit ${i}`);
    }

    return jobBenefits;
}

function generateRandomRequirements (count) {
    for (var i = 1; i <= count; i++) {
        jobRequirements.push(`Requirement ${i}`);
    }

    return jobRequirements;
}

function generateRandomAboutCompany () {
    for (var i = 0; i <= 7; i++) {
        if(Math.round(Math.random()) > 0) {
            var param = true
        } else {
            var param = false
        }

        jobAboutCompany.push(param)
    }
    
    return jobAboutCompany
}

function generateRandomJobTitle () {
    let index = Math.floor(Math.random() * 4 + 1);
    
    switch (index) {
        case 1:
            jobTitle = 'Frontend'
            break;
        case 2:
            jobTitle = 'Backend'
            break;
        case 3:
            jobTitle = 'Data security'
            break;
        case 4:
            jobTitle = 'Java developer'
            break;
        default:
            jobTitle = 'Manager'
    }

    return jobTitle
}

function insertJob(jobTitle, jobTag, jobSalary, jobCompany, jobDescription, jobBenefits, jobAboutCompany, jobRequirements, jobSource, jobEmail, jobPhone, jobSponsore){
        var job = new Job({
            job_title: jobTitle,
            job_tag: jobTag,
            job_salary: jobSalary,
            job_company: jobCompany,
            job_description: jobDescription,
            job_benefits: jobBenefits,
            job_about_company: jobAboutCompany,
            job_requirements: jobRequirements,
            job_source: jobSource,
            job_email: jobEmail,
            job_telephone: jobPhone,
            job_sponsored: jobSponsored
        })
    
        job.save((err)=>{
            if (err) throw err;
            console.log(`New job ${jobTitle} was succesfully added`);
        })
}
var jobDesc = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus beatae tenetur ipsa recusandae unde animi maiores tempora magnam aperiam consequuntur, obcaecati impedit odit ab fugit! Deserunt hic officiis consectetur minima.';
var jobSource = 'gogle.com';
var jobEmail = 'sample@email.com';
var jobPhone = '+48 YYYYYYYYYY';
var jobSponsored = true;

var i = 0;                     

function myLoop () {           
   setTimeout(function () {    
    var salary = Math.floor(Math.random() * 10000) + 1;
    generateRandomJobTitle();
    jobBenefits = [];  
    generateRandomBenefits(Math.floor(Math.random() * 10) + 1)
    jobRequirements = [];
    generateRandomRequirements(Math.floor(Math.random() * 10) + 1)
    jobAboutCompany = [];
    generateRandomAboutCompany();
    

    insertJob(jobTitle, jobTitle.toLowerCase(), salary, `Company ${i + Math.floor(Math.random() * 70) + 1}`, jobDesc, jobBenefits, jobAboutCompany, jobRequirements, jobSource, jobEmail, jobPhone, jobSponsored);         
    i++;                     
    if (i < 3) {            
        myLoop();             
    }                        
   }, 1000)
}

myLoop();  
