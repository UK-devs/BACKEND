import mongoose from "mongoose";
import { Schema } from "mongoose";

const departmentSchema = new Schema(
    {
        department_name: {
            type: String,
            required: true,
        },
        department_abbrev: {
            type: String,          
            required: true,
        },
        added_by: {
            type: String,
            required: false,
        },
        date_time_added: {
            type: String,
            required: false,
        },
    
    }
)
export default mongoose.model('Department', departmentSchema);