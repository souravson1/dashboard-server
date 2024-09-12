const express = require("express");
const { authenticationController } = require("../controllers");
const validate  = require("../middlewares/validate");
const { createUser, loginUser } = require("../validations/userValidations");
const verifyJWT = require("../middlewares/verifyToken");
const { upload } = require("../utils/uploads");

const router = express.Router();

router.route("/register").post(validate(createUser), authenticationController.register);
router.route("/login").post(validate(loginUser), authenticationController.loginController);
router.route("/profile").get(verifyJWT, authenticationController.profileController);
router.route("/developer").post(verifyJWT, upload.single("image"), authenticationController.uploadsController).get(authenticationController.getDevelopersController);
router.route("/mydeveloper").get(verifyJWT, authenticationController.myDeveloperController)
router.route("/mydeveloper/:id").delete(verifyJWT, authenticationController.deleteDeveloperController)
router.route("/developer/:id").get(authenticationController.singleDeveloperController);
router.route('/updateuser').post(verifyJWT, upload.single("image"), authenticationController.updateUserController).get(verifyJWT, authenticationController.getUserController)

module.exports = router;