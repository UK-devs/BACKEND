import mongoose from "mongoose";
const { Schema } = mongoose;

const ProjectProposalSchema = new Schema(
    {
        proposal_root_id: {
            type: String,
            required: false
        },
        user_id: {
            type: String,
            required: true
        },
        role_name:{
            type: String,
            required: true
        },
        for_schoolyear:{
            type: String,
            required: true
        },
        for_semester:{
            type: String,
            required: true
        },
        sponsor_department : {
            type: String,
            required: false,
        },
        project_title : {
            type: String,
            required: true
        },
        target_beneficiary : {
            type: String,
            required: true
        },
        status:{
            type: String,
            required: true
        },
        venue: {
            type: String,
            required: true
        },
        revision_remarks: {
            type: String,
            required: false
        }, 
        revision_remarks_date_time: {
            type: String,
            required: false
        },
        revision_by_user_id: {
            type: String,
            required: false
        }
       
    },
    {
        timestamps: true
    }
);

export default mongoose.model("ProjectProposal", ProjectProposalSchema);
