const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Job = new Schema({
    job_title: {
        type: String
    },
    job_tag: {
        type: String
    },
    job_salary: {
        type: Number
    },
    job_company: {
        type: String
    },
    job_description: {
        type: String
    },
    job_benefits: {
        type: Array
    },
    job_about_company: {
        type: Array
    },
    job_requirements: {
        type: Array
    },
    job_link: {
        type: String
    }
})

module.exports = mongoose.model('Job', Job);