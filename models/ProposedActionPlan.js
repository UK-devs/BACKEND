import mongoose from "mongoose";
const { Schema } = mongoose;

const ProposedActionPlanSchema = new Schema(
    {
      
        proposal_id: {
            type: String,
            required: true,
        },
        objectives:{
            type: String,
            required: true,
        },
        activity_title: {
            type: String,
            required: true,
        },
        activity_details: {
            type: String,
            required: true,
        },
        responsible_persons: {
            type: String,
            required: true,
        },
        budget_requirements:{
            type: String,
            required: true,
        },
        time_frame_start: {
            type: String,
            required:true,
        },
        time_frame_end: {
            type: String,
            required:true,  
        },
        proposed_output: {
            type: String,
            required:true, 
        }
       
    },
    {
        timestamps: true
    }
);

export default mongoose.model("ProposedActionPlan", ProposedActionPlanSchema);
