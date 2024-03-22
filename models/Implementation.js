import mongoose from "mongoose";
const { Schema } = mongoose;

const ImplementationReportSchema = new Schema(
    {
        proposal_id:{
            type:  String, 
            required: true,
        },
        proposal_type:{
            type: String,
            required: true,
        },
        user_id:{
            type: String,
            required: true,
        },
        date_implemented:{
            type:  String, 
            required: true,
        },
        time_implemented: {
            type: String,
            required: true
        },
        accomplished_objective:{
            type: String,
            required: true
        },
        brief_narrative:{
            type:String,
            required: true
        },
        project_topic:{
            type: String,
            required: true
        },
        activity_speaker:{
            type: String,
            required: false
        },
        project_volunteers:{
            type: String,
            required: true
        },
        designation:{
            type: String,
            required: true
        },
        participation_type:{
            type: String,
            required: true
        },
        prep_start_time:{
            type: String,
            required: true
        },
        prep_end_time:{
            type: String,
            required: true
        },
        activity_category:{
            type: String,
            required: true
        },
        description:{
            type: String,
            required: false
        },
        venue: {
            type: String,
            required: false
        },
        learnings:{
            type: String,
            required: true
        },
        project_strengths:{
            type: String,
            required: true
        },
        project_weakness:{
            type: String,
            required: true
        },
        project_improvement:{
            type: String,
            required: true
        },
        project_counterpart:{
            type: String,
            required: true
        },
        project_particulars:{
            type: String,
            required: true
        },
        project_amount:{
            type: String,
            required: true
        },
        imageUpload: {
            type: String,
            required: false
        }
    }
);

export default mongoose.model("ImplementationReport", ImplementationReportSchema);