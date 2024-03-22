import mongoose from "mongoose";
import { Schema } from "mongoose";

const fileUploadSchema = new Schema(
    {
        
        proposal_id:{
            type: String,
            required: true,
        },
        uploader_id:{
            type: String,
            required: true,
        },
        file_type:{
            type:String,
            required:true,
        },
        cloud_file_path:{
            type: String,
            required: true,
        },
        action_date_time: {
            type: String,          
            required: true,
        }
        

    }
)
export default mongoose.model('FileUpload', fileUploadSchema);