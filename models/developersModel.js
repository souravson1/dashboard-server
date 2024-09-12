const mongoose = require("mongoose");

const developerSchema = new mongoose.Schema({
    candidateName:{
        type: String,
        required: [true, "Please Enter Candidate Name"],
        trim: true
    },
    skills: [],
    experience: {
        type: Number,
    },
    rExperience:{
        type: Number,
    },
    company:{
        type: String,
    },
    client: {
        type: String,
    },
    ctc: {
        type: Number,
    },
    eCtc: {
        type: Number,
    },
    noticePeriod:{
        type: String,
    },
    location:{
        type: String,
        required: [true, "Please enter location"],
        trim: true
    },
    preferedLocation:{
        type: String,
        required: [true, "Please enter prefered location"],
        trim: true
    },
    contactNumber:{
        type: String,
    },
    email: {
        type: String,
        required: [true, "Please enter email"],
        trim: true
    },
    jobtitle:{
        type: String,
        required: [true, "Please enter job title"],
        trim: true
    },
    resume:{
        type: String
    },
    recruiter:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    }
},{
    timestamps: true
})

const developersModel = mongoose.model("developer", developerSchema);

module.exports = developersModel;