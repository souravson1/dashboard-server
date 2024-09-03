const httpStatus = require("http-status");
const { authenticationService } = require("../services");
const catchAsync = require("../utils/catchAsync");

class authenticationController {
    static register = catchAsync(async (req, res) => {
        // res.send({body: req.body});
        const res_obj = await authenticationService.register(req?.body);
        // res.send(res_obj);
        res.status(httpStatus.CREATED).send(res_obj);

    });
    static loginController = catchAsync(async (req, res) => {
        // res.send({body: req.body});
        const res_obj = await authenticationService.loginService(req?.body);
        // res.send(res_obj);
        res.status(httpStatus.OK).send(res_obj);

    });
    static profileController = catchAsync(async (req, res) => {
        // res.send({body: req.body});
        const res_obj = await authenticationService.UserProfile(req?.user);
        // res.send(res_obj);
        res.status(httpStatus.OK).send(res_obj);

    });
    static uploadsController = catchAsync(async (req, res) => {
        // res.send({body: req.body});
        const res_obj = await authenticationService.createDev(req?.user, req?.body, req?.file);
        // res.send(res_obj);
        res.status(httpStatus.CREATED).send(res_obj);

    });
    
    static getDevelopersController = catchAsync(async (req, res)=>{
        const res_obj = await authenticationService.AllDevelopers(req?.user);
        // res.send(res_obj);
        res.status(httpStatus.OK).send(res_obj);
    });  
    static singleDeveloperController = catchAsync(async (req, res)=>{
        const res_obj = await authenticationService.singleDevelopers(req?.params?.id);
        // res.send(res_obj);
        res.status(httpStatus.OK).send(res_obj);
    });
    static myDeveloperController = catchAsync(async (req, res)=>{
        const res_obj = await authenticationService.getMyDeveloper(req?.user);
        // res.send(res_obj);
        res.status(httpStatus.OK).send(res_obj);
    });
    
    static updateUserController = catchAsync(async (req, res) => {
        const res_obj = await authenticationService.updateUser(req?.user, req?.body, req?.file);
        // res.send(res_obj);
        res.status(httpStatus.CREATED).send(res_obj);
    });
    static getUserController = catchAsync(async (req, res)=>{
        const res_obj = await authenticationService.getUserProfile(req?.user);
        // res.send(res_obj);
        res.status(httpStatus.OK).send(res_obj);
    }); 
}

module.exports = authenticationController