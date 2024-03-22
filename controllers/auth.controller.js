import User from "../models/UserData.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { CreateSuccess } from "../utils/success.js";
import { CreateError } from "../utils/error.js";
import nodemailer from "nodemailer";
import userToken from "../models/userToken.js";

//Authentication

export const register = async (req, res, next) => {
    try {
 
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            fname: req.body.fname,
            mname: req.body.mname,
            lname: req.body.lname,
            email: req.body.email,
            department: req.body.department,
            tenure: req.body.tenure,
            password: hashPassword,
            role: req.body.role, // Assign the role to the user using the correct field name
        });

        await newUser.save();
        return res.status(200).json("User Registered Successfully")
        // return next(CreateSuccess(200, 'User Registered Successfully'));
    } catch (error) {
        console.error(error);
        return next(CreateError(500, 'Failed to register user'));
    }
};

export const login = async (req, res, next) => {
    try {
                
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return next(CreateError(404, 'User not found'));
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) {
            return next(CreateError(401, 'Incorrect Password')); // Use status code 401 for unauthorized
        }
        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin, role: user.role },
            process.env.JWT_SECRET
        );
        res.cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json({
                status: 200,
                message: 'Logged In Successfully',
                data: user,
            });
    } catch (error) {
        console.error(error); 
        return next(CreateError(500, 'Failed to log in'));
    }
}

export const sendEmail = async (req, res, next)=>{
    const email = req.body.email;
    const user = await  User.findOne({ email: {$regex: '^'+email+'$', $options: 'i'}});
    if (!user){
        return next(CreateError(400, "User not found to rest the email"))
    } 
    const payload = {
        email: user.email
    }
    const expiryTime = 300;
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: expiryTime});

    const newToken = new userToken({
        userId: user._id,
        token: token
    });
    const mailTransporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
            user: "noiemanoy.dev@gmail.com",
            pass: "fgaycdfjfxfzyvip"
        }
    })
    let mailDetails = {
        from: "noiemanoy.dev@gmail.com",
        to: email,
        subject: "Reset Password Request",
        html:`
        <html>
        <head>
            <title>Password Reset Request</title>
        </head>
        <body>
        <h1>Password Reset Request</h1>
            <p>Dear ${user.fname},</p>
            <p>We have received a request to reset your password for your account with UnladKomunidad: OCES Management System. To complete the password reset process, please click on the button below:</p>
            <a href="${process.env.LIVE_URL}/reset/${token}"><button style="background-color: #46AF50; color: white; padding: 14px 20px; border: none; cursor: pointer; border-radius: 4px;">Reset Password</button></a>
            <p>Please note that this link is only valid for 5 minutes. If you did not request a password reset, please disregard this message.</p>
            <p>Thank you,</p>
            <p>UnladKomunidad Team</p>
        </body>
        </html>
        `,
    };
    mailTransporter.sendMail(mailDetails, async(err, data)=>{
        if(err){
            console.log(err);
            return next(CreateError(500, "error in sending password reset request"))
        } else {
            await newToken.save();
            return next(CreateSuccess(200, 'Email sent successfully'));
        }
    })
}

export const resetPassword = async (req, res, next)=>{
    const token = req.body.token;
    const newPassword = req.body.password;

    jwt.verify(token, process.env.JWT_SECRET, async(err, data)=>{
        if(err){
            return next(CreateError(500, 'Invalid or expired Token'))
        } else {
            const response = data;
            const user = await  User.findOne({ email: {$regex: '^'+ response.email+'$', $options: 'i'}});
            const salt = await bcrypt.genSalt(10);
            const encryptedPassword = await bcrypt.hash(newPassword, salt);
            user.password = encryptedPassword;
            try {
                const  updatedUser = await user.findOneAndUpdate(
                    {_id: user._id},
                    {$set: user},
                    {new: true}
                )
                return next(CreateSuccess(200, "Password Reset Success"));
            } catch (error) {
                return next(CreateError(500, "Something went wrong while resetting pasword"))
            }
        }
    })
}

// export const registerAdmin = async (req, res, next) => {
//     try {
//         const role = await Role.find({ role: 'Admin' }); 
//         if (!role) {
//             return next(CreateError(500, 'Role "Admin" not found'));
//         }

//         const salt = await bcrypt.genSalt(10);
//         const hashPassword = await bcrypt.hash(req.body.password, salt);
//         const newUser = new User({
//             fname: req.body.fname,
//             mname: req.body.mname,
//             lname: req.body.lname,
//             email: req.body.email,
//             department: req.body.department,
//             tenure: req.body.tenure,
//             password: hashPassword,
//             roles: req.body.userRole,
//         });

//         await newUser.save();
//         return next(CreateSuccess(200, 'User Registered Successfully'));
//     } catch (error) {
//         console.error(error); 
//         return next(CreateError(500, 'Failed to register user'));
//     }
// }

// export const registerStudent = async (req, res, next) => {
//     try {
//         const role = await Role.findOne({ role: 'Student' });
//         if (!role) {
//             return next(CreateError(500, 'Role "Student" not found'));
//         }

//         const salt = await bcrypt.genSalt(10);
//         const hashPassword = await bcrypt.hash(req.body.password, salt);
//         const newUser = new User({
//             fname: req.body.fname,
//             mname: req.body.mname,
//             lname: req.body.lname,
//             email: req.body.email,
//             department: req.body.department,
//             tenure: req.body.tenure,
//             password: hashPassword,
//             roles: role,
//         });

//         await newUser.save();
//         return next(CreateSuccess(200, 'User Registered Successfully'));
//     } catch (error) {
//         console.error(error); 
//         return next(CreateError(500, 'Failed to register user'));
//     }
// }

// export const registerEmployee = async (req, res, next) => {
//     try {
//         const role = await Role.find({ role: 'Employee' }); 
//         if (!role) {
//             return next(CreateError(500, 'Role "Employee" not found'));
//         }

//         const salt = await bcrypt.genSalt(10);
//         const hashPassword = await bcrypt.hash(req.body.password, salt);
//         const newUser = new User({
//             fname: req.body.fname,
//             mname: req.body.mname,
//             lname: req.body.lname,
//             email: req.body.email,
//             department: req.body.department,
//             tenure: req.body.tenure,
//             password: hashPassword,
//             roles: role,
//         });

//         await newUser.save();
//         return next(CreateSuccess(200, 'User Registered Successfully'));
//     } catch (error) {
//         console.error(error); 
//         return next(CreateError(500, 'Failed to register user'));
//     }
// }

// export const registerSuperAdmin = async (req, res, next) => {
//     try {
//         const role = await Role.find({ }); 
//         if (!role) {
//             return next(CreateError(500, 'Role "Super Admin" not found'));
//         }

//         const salt = await bcrypt.genSalt(10);
//         const hashPassword = await bcrypt.hash(req.body.password, salt);
//         const newUser = new User({
//             fname: req.body.fname,
//             mname: req.body.mname,
//             lname: req.body.lname,
//             email: req.body.email,
//             department: req.body.department,
//             tenure: req.body.tenure,
//             password: hashPassword,
//             roles: role, 
            
//         });

//         await newUser.save();
//         return res.status(200).json("Super Admin Account Created");
//     } catch (error) {
//         console.error(error); 
//         return next(CreateError(500, 'Failed to register account'));
//     }
// }