const mongoose = require("mongoose");

const developerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please enter name"],
        trim: true
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
    category:{
        type: String
    },
    description:{
        type: String,
        required: [true, "Please enter description"],
        trim: true
    },
    image:{
        type: String
    },
    currentCompany:{
        type: String,
        trim: true
    },
    resume:{
        type: String
    },
    location:{
        type: String,
        required: [true, "Please enter location"],
        trim: true
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