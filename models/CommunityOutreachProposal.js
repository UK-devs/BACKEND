import mongoose from "mongoose";
import { Schema } from "mongoose";

const communityOutreachProposalSchema = new Schema(
    {
        intake_proposal_id: {
            type: String,
            required: true,
        },
        target_objective: {
            type: String,          
            required: true,
        },
        activity: {
            type: String,
            required: true,
        },
        time_frame_start: {
            type: String,
            required: true,
        },
        time_frame_end: {
            type: String,
            required: true,
        },
        beneficiary:{
            type: String,
            required: true,
        },
        budget:{
            type: String,
            required: true,
        },
        progress_indicator:{
            type: String,
            required: true,
        }
    
    }
)
export default mongoose.model('CommunityOutreachProposal', communityOutreachProposalSchema);