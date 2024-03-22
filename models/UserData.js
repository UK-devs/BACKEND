import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema(
    {
        fname: {
            type: String,
            required: true,
        },
        mname: {
            type: String,
            required: true,
        },
        lname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            lowercase: true
        },
        department: {
            type: String,
            required: true
        },
        tenure: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        profileImage: {
            type: String,
            required: false,
            default: "https://www.freepik.com/free-psd/3d-illustration-person-with-sunglasses_27470359.htm#page=2&query=profile%20avatar&position=4&from_view=search&track=ais&uuid=8e0a2323-ff8b-486e-8805-c0969ccf4c6b"
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        is_restricted:{
            type: Boolean,
            default: false
        },
        role: {
            type: String,
            enum: ['Super Admin', 'Admin','Student','Employee','CSCB'],
            required: true,
        },
    },
    {
        timestamps: true
    }
);

export default mongoose.model("User", UserSchema);
