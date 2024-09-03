const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    phoneNumber:{
        type: String,
        trim: true
    },
    username:{
        type: String,
        trim: true
    },
    profileImage: {
        type: String,
    },
    bio: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        required: true
    },
    addedDevs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "developer"
        }
    ]
},
    {
        timestamps: true
    });

UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

UserSchema.methods.comparePassword = async function (password) {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
}

const UsersModel = mongoose.model("user", UserSchema);

module.exports = UsersModel;