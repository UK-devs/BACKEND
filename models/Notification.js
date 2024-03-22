import mongoose from "mongoose";
import { Schema } from "mongoose";

const notificationSchema = new Schema(
    {
        notification_title: {
            type: String,
            required: true,
        },
        notification_details: {
            type: String,          
            required: true,
        },
        path_link: {
            type: String,
            required: true,
        },
        document_type: {
            type: String,
            required: false,
        },
        document_id: {
            type: String,
            required: false,
        },
        role_visibility: {
            type: String,
            required: true,
        },
        notification_status: {
            type: String,
            required: true,
        },
        send_to_id_only: {
            type: String,
            required: false,
        },
        sent_by_id:{
            type: String,
            required: false,
        },
        sent_by_role:{
            type: String,
            required: false,
        },
        date_time_added: {
            type: String,
            required: false,
        },
    
    }
)
export default mongoose.model('Notification', notificationSchema);