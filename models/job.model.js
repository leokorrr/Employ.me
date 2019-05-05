const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Job = new Schema({
    job_title: {
        type: String
    },
    job_salary: {
        type: Number
    },
    job_company: {
        type: String
    }
})

module.exports = mongoose.model('Job', Job);