import ProjectProposal from "../models/Proposal.js";
import ImplementationReport from "../models/Implementation.js";
import IntakeForm from "../models/IntakeForm.js";
import DepartmentForm from "../models/DepartmentForm.js";

import { CreateSuccess } from "../utils/success.js";
import { CreateError } from "../utils/error.js";

import multer from 'multer';
import path from 'path'; 
import AuditTrail from "../models/AuditTrail.js";
import UserData from "../models/UserData.js";
import Notification from "../models/Notification.js";
import ProposedActionPlan from "../models/ProposedActionPlan.js"
import CommunityOutreachProposal from "../models/CommunityOutreachProposal.js";
import FileUpload from "../models/FileUpload.js";

// Set up multer storage and file filter for PDF files
const pdfStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Set the destination folder where PDF files will be stored
        cb(null, 'uploads/pdf/');
    },
    filename: (req, file, cb) => {
        // Set the filename to be unique
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.pdf');
    },
});

const pdfFileFilter = (req, file, cb) => {
    // Define the file filter to accept only PDF files
    const allowedFileTypes = ['.pdf'];
    const fileExtension = path.extname(file.originalname).toLowerCase();

    if (allowedFileTypes.includes(fileExtension)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only PDF files are allowed.'), false);
    }
};

// Set up multer storage and file filter for image files (jpeg, jpg, png)
const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Set the destination folder where image files will be stored
        cb(null, 'uploads/images/');
    },
    filename: (req, file, cb) => {
        // Set the filename to be unique
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});

const imageFileFilter = (req, file, cb) => {
    // Define the file filter to accept only jpeg, jpg, and png files
    const allowedFileTypes = ['.jpeg', '.jpg', '.png'];
    const fileExtension = path.extname(file.originalname).toLowerCase();

    if (allowedFileTypes.includes(fileExtension)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only jpeg, jpg, and png files are allowed.'), false);
    }
};

const uploadPdf = multer({ storage: pdfStorage, fileFilter: pdfFileFilter }).single('community_profile');
const uploadImage = multer({ storage: imageStorage, fileFilter: imageFileFilter }).any();

// module.exports = {uploadPdf, uploadImage}
export {uploadPdf, uploadImage}
// POST METHODS
// Project Proposal
// export const createProposal = async (req, res, next) => {
//     try {
//         uploadPdf(req, res, async (err) => {
//             if (err) {
//                 return next(CreateError(400, err.message));
//             }

//             try {
//                 const newProposal = new ProjectProposal({
//                     sponsor_department: req.body.sponsor_department,
//                     project_title: req.body.project_title,
//                     target_beneficiary: req.body.target_beneficiary,
//                     venue: req.body.venue,
//                     proposed_objective: req.body.proposed_objective,
//                     proposed_activity: req.body.proposed_activity,
//                     person_in_charge: req.body.person_in_charge,
//                     budget_requirement: req.body.budget_requirement,
//                     timeframe: req.body.timeframe,
//                     proposed_output: req.body.proposed_output,
//                     community_profile: req.file ? req.file.path : null,
//                 });

//                 await newProposal.save();
//                 return next(CreateSuccess(200, 'Proposal Inputted Successfully'));
//             } catch (error) {
//                 console.error(error);
//                 return next(CreateError(500, 'Failed to Input Data'));
//             }
//         });
//     } catch (error) {
//         console.error(error);
//     }
// };

export const createProposal = async (req, res, next) => {
    try {
        uploadPdf(req, res, async (err) => {
            if (err) {
                console.error(err);  // Log the multer error
                return next(CreateError(400, err.message));
            } else{
                res.setHeaders({'Content-Type': 'application/json'});
            }

            try {
                const newProposal = new ProjectProposal({
                    sponsor_department: req.body.sponsor_department,
                    project_title: req.body.project_title,
                    target_beneficiary: req.body.target_beneficiary,
                    venue: req.body.venue,
                    proposed_objective: req.body.proposed_objective,
                    proposed_activity: req.body.proposed_activity,
                    person_in_charge: req.body.person_in_charge,
                    budget_requirement: req.body.budget_requirement,
                    timeframe: req.body.timeframe,
                    proposed_output: req.body.proposed_output,
                    // community_profile: req.file ? req.file.path : null,                
                });
                console.log(newProposal)
                await newProposal.save();
                
                return next(CreateSuccess(200, 'Proposal Inputted Successfully'));
            } catch (error) {
                console.error(error);  // Log the database save error
                return next(CreateError(500, 'Failed to Input Data'));
            }
        });
    } catch (error) {
        console.error(error);  // Log any unexpected error
    }
};

export const createCommunityOutreachProposal = async (req, res, next) => {
    try {
        try {
    
            const newOutreachProposal = new CommunityOutreachProposal({                 

               proposal_id: req.body.proposal_id,
               target_objective: req.body.target_objective,
               time_frame_start: req.body.time_frame_start,
               time_frame_end: req.body.time_frame_end,
               beneficiary: req.body.beneficiary,
               budget: req.body.budget,
               progress_indicator: req.body.progress_indicator       
                
            });

            await newOutreachProposal.save().then((savedDocument) => {
              
                return next(CreateSuccess(200, 'Community Outreach Proposal Successfully Saved'));

            }).catch((error) => {

                return next(CreateError(500, 'Error Saving Community Outreach Proposal'));

            });
            // return res.status(200).json("User Registered Successfully")
            
        } catch (error) {
            console.error(error);
            return next(CreateError(500, 'Failed to Input Data - Community Outreach Proposal'));
        }
    } catch (error) {
        
    }
};

export const createProposalDetails = async (req, res, next) => {
    try {
        try {
    
            const newProposalDetails = new ProjectProposal({                 

                proposal_root_id: req.body.proposal_root_id,
                user_id: req.body.user_id,
                role_name: req.body.role_name,
                for_schoolyear: req.body.for_schoolyear,
                for_semester: req.body.for_semester,
                sponsor_department: req.body.sponsor_department,
                project_title: req.body.project_title,
                target_beneficiary: req.body.target_beneficiary,
                status: req.body.status,
                venue: req.body.venue,
                revision_remarks: req.body.revision_remarks,
                revision_remarks_date_time: req.body.revision_remarks_date_time,
                revision_by_user_id: req.body.revision_by_user_id                            
                
            });

            await newProposalDetails.save().then((savedDocument) => {
              
                return res.status(200).json(savedDocument);
                
            }).catch((error) => {

                return next(CreateError(500, 'Error Saving Proposal'));

            });
            // return res.status(200).json("User Registered Successfully")
            
        } catch (error) {
            console.error(error);
            return next(CreateError(500, 'Failed to Input Data'));
        }
    } catch (error) {
        
    }
}; // createProposalDetails

export const createProposalRevisionLog = async (req, res, next) => {
    try {
        try {
    
            const newProposalRevisionDetails = new ProposalRevisionLog({                 

                proposal_root_id: req.body.proposal_root_id,
                user_id: req.body.user_id,
                role_name: req.body.role_name,
                for_schoolyear: req.body.for_schoolyear,
                for_semester: req.body.for_semester,
                sponsor_department: req.body.sponsor_department,
                project_title: req.body.project_title,
                target_beneficiary: req.body.target_beneficiary,
                status: req.body.status,
                venue: req.body.venue,
                revision_remarks: req.body.revision_remarks,
                revision_remarks_date_time: req.body.revision_remarks_date_time,
                revision_by_user_id: req.body.revision_by_user_id              
                
            });

            await newProposalRevisionDetails.save().then((savedDocument) => {
              
                return res.status(200).json(savedDocument);
                
            }).catch((error) => {

                return next(CreateError(500, 'Error Saving Proposal Revision Detail'));

            });
            // return res.status(200).json("User Registered Successfully")
            
        } catch (error) {
            console.error(error);
            return next(CreateError(500, 'Failed to Input Data'));
        }
    } catch (error) {
        
    }
}; // createProposalDetails

export const createProposalActionPlanDetails = async (req, res, next) => {
    try {
        try {
    
            const newProposalActionPlan = new ProposedActionPlan({

                proposal_id: req.body.proposal_id,
                objectives: req.body.objectives,
                activity_title: req.body.activity_title,
                activity_details: req.body.activity_details,
                responsible_persons: req.body.responsible_persons,
                budget_requirements: req.body.budget_requirements,
                time_frame_start: req.body.time_frame_start,
                time_frame_end: req.body.time_frame_end,
                proposed_output: req.body.proposed_output

            });

            await newProposalActionPlan.save();
            return next(CreateSuccess(200, 'Proposed Action Plan Successfully Saved'));
            
        } catch (error) {
            console.error(error);
            return next(CreateError(500, 'Failed to Input Data'));
        }
    } catch (error) {
        
    }
}; // createProposalActionPlanDetails

export const createImplementation = async (req, res, next) => {
    try {
        
       

            try {
                const newImplementation = new ImplementationReport({
                    proposal_id: req.body.proposal_id,
                    proposal_type: req.body.proposal_type,
                    user_id: req.body.user_id,
                    date_implemented: req.body.date_implemented,
                    time_implemented: req.body.time_implemented,
                    accomplished_objective: req.body.accomplished_objective,
                    brief_narrative: req.body.brief_narrative,
                    project_topic: req.body.project_topic,
                    activity_speaker: req.body.activity_speaker,
                    project_volunteers: req.body.project_volunteers,
                    designation: req.body.designation,
                    venue: req.body.venue,
                    activity_category: req.body.activity_category,
                    description: req.body.description,
                    participation_type: req.body.participation_type,
                    prep_start_time: req.body.prep_start_time,
                    prep_end_time: req.body.prep_end_time,
                    learnings: req.body.learnings,
                    project_strengths: req.body.project_strengths,
                    project_weakness: req.body.project_weakness,
                    project_improvement: req.body.project_improvement,
                    project_counterpart: req.body.project_counterpart,
                    project_particulars: req.body.project_particulars,
                    project_amount: req.body.project_amount,
                    imageUpload: "",
                });

                /**
                if (req.files) {
                    let path = '';
                    req.files.forEach(function (files, index, arr) {
                        path = path + files.path + ',';
                    });
                    path = path.substring(0, path.lastIndexOf(","));
                    newImplementation.imageUpload = path;
                }
                 */

                await newImplementation.save();
                return next(CreateSuccess(200, 'Implementation Report Inputted Successfully'));
            } catch (error) {
                console.error(error);
                return next(CreateError(500, 'Failed to Input Implementation'));
            }
        
    } catch (error) {
        console.error(error);
    }
};

export const createIntake = async(req, res, next) =>{
    try {
        try {
    
            const newIntakeForm = new IntakeForm({                 

                user_id: req.body.user_id,       
                proposal_root_id: req.body.proposal_root_id,             
                date_submitted: req.body.date_submitted,
                project_title: req.body.project_title,
                organization_name: req.body.organization_name,
                organization_type: req.body.organization_type,
                organization_date_established: req.body.organization_date_established,
                for_semester: req.body.for_semester,
                for_schoolyear: req.body.for_schoolyear,       
                departments: req.body.departments,
                contact_person: req.body.contact_person,
                contact_person_position: req.body.contact_person_position,
                contact_number: req.body.contact_number,
                num_members: req.body.num_members,
                organizational_expertise: req.body.organizational_expertise,
                activity_purpose: req.body.activity_purpose,
                reason_for_choosing_community_sector: req.body.reason_for_choosing_community_sector,
                target_area: req.body.target_area,
                target_date: req.body.target_date,
                target_beneficiary: req.body.target_beneficiary,
                num_beneficiary: req.body.num_beneficiary,
                classification_community_extension_project: req.body.classification_community_extension_project,
                adviser_name: req.body.adviser_name,
                adviser_date_signature: req.body.adviser_date_signature,
                adviser_contact_number: req.body.adviser_contact_number,
                target_objectives: req.body.target_objectives,
                target_activities: req.body.target_activities,
                time_frame_start: req.body.time_frame_start,
                time_frame_end: req.body.time_frame_end,
                beneficiaries: req.body.beneficiaries,
                budget: req.body.budget,
                progress_indicator: req.body.progress_indicator,
                status: req.body.status,
                revision_remarks: req.body.revision_remarks,
                revision_remarks_date_time: req.body.revision_remarks_date_time,
                revision_by_user_id: req.body.revision_by_user_id
                
            })
            await newIntakeForm.save().then((savedDocument) => {
              
                return res.status(200).json(savedDocument);
               // return savedDocument;
                
            }).catch((error) => {

                return next(CreateError(500, 'Error Saving Intake Proposal'));

            });
            // return res.status(200).json("User Registered Successfully")
            
        } catch (error) {
            console.error(error);
            return next(CreateError(500, 'Failed to Input Data'));
        }
    } catch (error) {
        
    }
}

export const createDepartment = async(req, res, next) =>{
    try {
        try {
    
         
            const newDepartmentForm = new DepartmentForm({ 

                
                department_name: req.body.department_name,
                department_abbrev: req.body.department_abbrev,
                added_by: req.body.added_by,
                date_time_added:req.body.date_time_added,
                
                
               
            })
            
            await newDepartmentForm.save();           
            return next(CreateSuccess(200, 'New Department Saved Successfully'));
        } catch (error) {
            console.error(error);
            return next(CreateError(500, 'Failed to Input Data'));
        }
    } catch (error) {
        
    }
} // createDepartment



export const createNotification = async(req, res, next) =>{
    try {
        try {
    
         
            const newNotification = new Notification({ 

                
                notification_title: req.body.notification_title,
                notification_details: req.body.notification_details,
                path_link: req.body.path_link,
                document_type: req.body.document_type,
                document_id: req.body.document_id,
                role_visibility: req.body.role_visibility,
                notification_status:req.body.notification_status,
                send_to_id_only: req.body.send_to_id_only,
                sent_by_id: req.body.sent_by_id,
                sent_by_role: req.body.sent_by_role,
                date_time_added: req.body.date_time_added                
                
               
            })
            
            await newNotification.save();           
            return next(CreateSuccess(200, 'New Notification Added Successfully'));
        } catch (error) {
            console.error(error);
            return next(CreateError(500, 'Failed to Input Data - Notification'));
        }
    } catch (error) {
        
    }
} // createNotification

export const createAuditTrail = async(req, res, next) =>{
    try {
        try {
    
         
            const newAuditTrail = new AuditTrail({ 

                
                user_id: req.body.user_id,
                role: req.body.role,
                action_taken: req.body.action_taken,
                action_date_time: req.body.action_date_time
                
                
               
            })
            
            await newAuditTrail.save();           
            return next(CreateSuccess(200, 'Audit Trail Log Saved'));
        } catch (error) {
            console.error(error);
            return next(CreateError(500, 'Failed to Input Data'));
        }
    } catch (error) {
        
    }
} // createAuditTrail

export const createFileUpload = async(req, res, next) =>{
    try {
        try {
    
         
            const newFileUpload = new FileUpload({ 

                
                proposal_id: req.body.proposal_id,
                uploader_id: req.body.uploader_id,
                file_type: req.body.file_type,
                cloud_file_path: req.body.cloud_file_path,
                action_date_time: req.body.action_date_time
                
                
               
            })
            
            await newFileUpload.save();           
            return next(CreateSuccess(200, 'File Upload Details Saved'));
        } catch (error) {
            console.error(error);
            return next(CreateError(500, 'Failed to Input Data'));
        }
    } catch (error) {
        
    }
} // createFileUpload

// GET METHODS

export const getDepartment = async(req, res, next) => {
    try {
        const newDepartment = await DepartmentForm.find({});
        res.json(newDepartment);
        next(CreateSuccess(200, 'get propo'))
    } catch (error) {
        next(CreateError(500, "bitch error"))
    }
}

export const getAuditTrail = async(req, res, next) => {
    try {
        const auditTrailRecords = await AuditTrail.find({});
        res.json(auditTrailRecords);
        next(CreateSuccess(200, 'get propo'))
    } catch (error) {
        next(CreateError(500, "bitch error"))
    }
}

export const getFileUpload = async(req, res, next) => {
    try {
        const fileUploadRecords = await FileUpload.find({});
        res.json(fileUploadRecords);
        next(CreateSuccess(200, 'get propo'))
    } catch (error) {
        next(CreateError(500, "bitch error"))
    }
}


export const getUsers = async(req, res, next) => {
    try {
        const get_users = await  UserData.find({});
        res.json(get_users);
        next(CreateSuccess(200, 'get propo'))
    } catch (error) {
        next(CreateError(500, "bitch error"))
    }
}

export const getProposal = async(req, res, next) => {
    try {
        const newProposal = await  ProjectProposal.find({});
        res.json(newProposal);
        next(CreateSuccess(200, 'get propo'))
    } catch (error) {
        next(CreateError(500, "bitch error"))
    }
}

export const getCommunityOutreachProposal = async(req, res, next) => {
    try {
        const newCommunityOutreachProposal = await  CommunityOutreachProposal.find({});
        res.json(newCommunityOutreachProposal);
        next(CreateSuccess(200, 'get propo'))
    } catch (error) {
        next(CreateError(500, "bitch error"))
    }
}


export const getProposalActionPlan = async(req, res, next) => {
    try {
        const proposalActionPlan = await ProposedActionPlan.find({});
        res.json(proposalActionPlan);
        next(CreateSuccess(200, 'get propo'))
    } catch (error) {
        next(CreateError(500, "bitch error"))
    }
}

export const getImplementation = async(req, res, next) => {
    try {
        const newImplementation = await ImplementationReport.find({})
        res.json(newImplementation)
        next(CreateSuccess(200, 'get imple'))
    } catch (error) {
        next(CreateError(500, "bitch error"))
    }
}
export const getIntakeForm = async(req, res, next) => {
    try {
        const newIntakeForm = await IntakeForm.find({})
        res.json(newIntakeForm)
        next(CreateSuccess(200, 'get imple'))
    } catch (error) {
        next(CreateError(500, "bitch error"))
    }
}
export const getNotification = async(req, res, next) => {
    try {
        const newNotif = await Notification.find({})
        res.json(newNotif)
        next(CreateSuccess(200, 'get imple'))
    } catch (error) {
        next(CreateError(500, "bitch error"))
    }
}

// UPDATE METHODS
export const updateProposal = async(req, res, next) => {
    try {
        const proposalID = req.body._id;
        const updateProposal = await ProjectProposal.findByIdAndUpdate(proposalID, req.body, {new: true});
        if(!updateProposal){
            next(CreateError(404, " Proposal Form not found"));
        }
        res.json(updateProposal)
        next(CreateSuccess(200, "Updated proposal successfully"))
    } catch (error) {
        next(CreateError(500, "Internal Server Error", error));
    }
} 

export const updateUserDetails = async(req, res, next) => {
    try {
        const userID = req.body._id;
        const updateUser = await UserData.findByIdAndUpdate(userID, req.body, {new: true});
        if(!updateProposal){
            next(CreateError(404, " Proposal Form not found"));
        }
        res.json(updateProposal)
        next(CreateSuccess(200, "Updated proposal successfully"))
    } catch (error) {
        next(CreateError(500, "Internal Server Error", error));
    }
} 

export const updateNotification = async(req, res, next) => {
    try {

        const updatedData = req.body;
        // Assuming 'yourModel' is a Mongoose model
     
        const updateNotif =await Notification.findByIdAndUpdate(updatedData._id, updatedData, { new: true });
        if(!updateNotif){
            next(CreateError(404, "notification not found"));
        }
        res.json(updateNotif)
        next(CreateSuccess(200, "Notification Update Successfully"))
    } catch (error) {
        next(CreateError(500, "Internal Server Error", error));

    }
} 


export const updateImplementation = async(req, res, next) => {
    try {
        const implementation_id = req.body._id;
        const updateImplementation = await ImplementationReport.findByIdAndUpdate(implementation_id, req.body, {new: true});
        if(!updateImplementation){
            next(CreateError(404, "imple not found"));
        }
        res.json(updateImplementation)
        next(CreateSuccess(200, "Updated implementation successfully"))
    } catch (error) {
        next(CreateError(500, "Internal Server Error", error));

    }
} 
export const updateIntakeForm = async(req, res, next) => {



    try {
        const updatedData = req.body;
        // Assuming 'yourModel' is a Mongoose model
        const result = await IntakeForm.findByIdAndUpdate(updatedData._id, updatedData, { new: true });
        res.json(result);
        next(CreateSuccess(200, "Updated implementation successfully"))
      } catch (error) {
        console.error(error);
        //res.status(500).json({ error: 'Internal Server Error' });
        next(CreateError(500, "Internal Server Error", error));
      }
} 
export const updateIntake = async(req, res, next) => {
    try {
        const updateIntakeVar = await IntakeForm.findByIdAndUpdate(req.id,req.body);

        //const updateIntakeForm = await IntakeForm.findOneAndUpdate({ _id: req.params.id}, req.body, {new: true});
        if(!updateIntakeVar){
            next(CreateError(404, "imple not found"));
        }
        res.json(updateIntakeForm)
        next(CreateSuccess(200, "Updated implementation successfully"))
    } catch (error) {
        next(CreateError(500, "Internal Server Error", error));

    }
} 
// DELETE METHODS
export const deleteProposal = async (req, res, next) => {
    try {
        const deleteProposal = await ProjectProposal.findByIdAndDelete( req.params.id)

        if (!deleteProposal) {
            // If the proposal with the specified ID doesn't exist
            return res.status(404).json({ error: 'Proposal not found' });
        }

        // Respond with a success message
        res.status(204).json({ message: 'Proposal deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteImplementation = async (req, res, next) => {
    try {
        const deleteImplementation = await ImplementationReport.findByIdAndDelete( req.params.id)

        if (!deleteImplementation) {
            // If the proposal with the specified ID doesn't exist
            return res.status(404).json({ error: 'Proposal not found' });
        }
        // Respond with a success message
        res.status(204).json({ message: 'Implementation deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteIntakeForm = async (req, res, next) => {
    try {
        const deleteIntakeForm = await IntakeForm.findByIdAndDelete( req.params.id)

        if (!deleteIntakeForm) {
            // If the proposal with the specified ID doesn't exist
            return res.status(404).json({ error: 'Proposal not found' });
        }
        // Respond with a success message
        res.status(204).json({ message: 'Intake Form deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


