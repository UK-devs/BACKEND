import User from "../models/UserData.js"
import { CreateError } from "../utils/error.js"
import { CreateSuccess } from "../utils/success.js";

export const getAllUser = async (req, res, next)=>{
    try {
        const users = await User.find();
        return res.status(200).json({ success: true, message: "All users", data: users });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
export const getById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user)
            return res.status(404).json({ success: false, message: "User not found" });
        
        return res.status(200).json({ success: true, message: "Single User", data: user });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
