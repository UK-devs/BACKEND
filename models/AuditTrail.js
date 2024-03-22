import mongoose from "mongoose";
import { Schema } from "mongoose";

const auditTrailSchema = new Schema(
    {
        
        user_id:{
            type: String,
            required: false,
        },
        role:{
            type: String,
            required: false,
        },
        action_taken:{
            type: String,
            required: false,
        },
        action_date_time: {
            type: String,          
            required: false,
        }
        

    }
)
export default mongoose.model('AuditTrail', auditTrailSchema);