const httpStatus = require("http-status");
const { UsersModel, developersModel } = require("../models");
const ApiError = require("../utils/ApiError");
const { GenerateToken } = require("../utils/jwtUtils");

const register = async(body)=>{
    const {name, email, password} = body;
    const existUser = await UsersModel.findOne({email:email});
    if(existUser){
        throw new ApiError(httpStatus.BAD_REQUEST, "User Already Exist");
    }

    const user = await UsersModel.create({
        name, email, password
    })
    return {msg: "User Register Successfully"};
}

const loginService = async(body)=>{
    const {email, password} = body;
    const existUser = await UsersModel.findOne({email:email});
    if(!existUser){
        throw new ApiError(httpStatus.NOT_FOUND, "User Not Found!")
    }

    const isMatch = await existUser.comparePassword(password);

    if(!isMatch){
        throw new ApiError(httpStatus.BAD_REQUEST, "Invalid Credential!") 
    }

    // return existUser;
    const token = await GenerateToken(existUser);
    return {msg: "Login Success", token};
}

const UserProfile = async(id)=>{
    return await UsersModel.findById(id)
    .select("-password");
}

const createDev = async (user, body, file)=>{
    const {name, email, jobtitle, description, category, currentCompany,resume, location } = body;
    // Get Logged user
    const loggedUser = await UsersModel.findById(user);
    // Check Existance Email
    const existDeveloper = await developersModel.findOne({email: email});
    if(existDeveloper){
        throw new ApiError(httpStatus.BAD_REQUEST, "Developer is already exist")
    }
    // Insert Data into model
    const model = await developersModel.create({
        name, email, jobtitle, description, category, image: file?.filename, currentCompany,resume, location, recruiter: user
    });
    loggedUser.addedDevs.push(model._id);
    await loggedUser.save();
    return model
}
// Get All developers
const AllDevelopers = async()=>{
    return await developersModel.find({}).populate("recruiter", "email");
}
const getMyDeveloper = async(user)=>{
    return await UsersModel.findOne({_id: user}).populate("addedDevs");
}

// Get single developer
const singleDevelopers = async(id)=>{
    return await developersModel.findById(id).populate("recruiter");
}

const updateUser = async(user, body, file)=>{
    const {name, phoneNumber, username, bio } = body;
    const loggedUser = await UsersModel.findOneAndUpdate({_id: user}, {name, phoneNumber, username, bio, image: file?.filename}, {new: true});

    await loggedUser.save();
    return loggedUser; 
}
const getUserProfile = async(user)=>{
    return await UsersModel.findOne({_id: user}).select("-password")
}

module.exports = {register, loginService, UserProfile, createDev, AllDevelopers, singleDevelopers, updateUser, getUserProfile, getMyDeveloper};