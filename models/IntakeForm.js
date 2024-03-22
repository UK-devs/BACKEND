import mongoose from "mongoose";
import { Schema } from "mongoose";

const studentIntakeSchema = new Schema(
    {
        user_id:{
            type: String,            
            required: true,
        },
        proposal_root_id:{
            type: String,
            required: false,
        },
        for_semester:{
            type: String,            
            required: true,
        },
        for_schoolyear:{
            type: String,            
            required: true,
        },
        date_submitted:{
            type: String,            
            required: true,
        },       
        project_title: {
            type: String,
            required: true
        }, 
        organization_name: {
            type: String,
            required: true,
        },
        organization_type: {
            type: String,            
            required: true,
        },
        organization_date_established: {
            type: String,            
            required: true,
        },
        departments:{
            type: String,            
            required: true,
        },       
        contact_person: {
            type: String,
            required: true,
        },
        contact_person_position: {
            type: String,
            required: true,
        },
        contact_number: {
            type: String,
            required: true,
        },
        num_members: {
            type: String,
            required: true,
        },
        organizational_expertise:{
            type: String,
            required: false
        },        
        activity_purpose:{
            type: String,
            required: true,
        },
        reason_for_choosing_community_sector:{
            type: String,
            required: true,
        },
        target_area:{
            type: String,
            required: true,
        },
        target_date:{
            type: String,
            required: true,
        },
        target_beneficiary:{
            type: String,
            required: true,
        },
        num_beneficiary:{
            type: String,
            required: true,
        },
        classification_community_extension_project:{
            type: String,
            required: true,
        },
        adviser_name:{
            type: String,
            required: true,
        },
        adviser_date_signature:{
            type: String,
            required: false,
        },
        adviser_contact_number:{
            type: String,
            required: false,
        },
        target_objectives:{
            type: String,
            required: true,
        },
        target_activities:{
            type: String,
            required: true,
        },
        time_frame_start:{
            type: String,
            required: true,
        },
        time_frame_end:{
            type: String,
            required: true,
        },
        beneficiaries:{
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
        },
        status: {
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

    }
)
export default mongoose.model('IntakeForm', studentIntakeSchema);