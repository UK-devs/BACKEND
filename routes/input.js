import express from "express";
import { createDepartment, createNotification, createImplementation, createIntake, createProposalDetails, createProposalActionPlanDetails, createProposal, deleteImplementation, deleteIntakeForm, deleteProposal, getDepartment,getImplementation,getNotification, getIntakeForm, getProposal, updateImplementation, updateIntakeForm, updateNotification, updateUserDetails, updateIntake,updateProposal, createAuditTrail, getAuditTrail, getUsers, getProposalActionPlan, createCommunityOutreachProposal, getCommunityOutreachProposal, createFileUpload, getFileUpload } from "../controllers/inputs.controller.js";
import { uploadPdf, uploadImage } from "../controllers/inputs.controller.js"


const router = express.Router();


// CREATE
router.post("/create-proposal", uploadPdf, createProposal);
router.post("/create-proposal-details", createProposalDetails);
router.post("/create-proposal-action-plan", createProposalActionPlanDetails);
router.post("/create-implementation", uploadImage, createImplementation);
router.post("/create-intake-form", createIntake);
router.post("/create-community-outreach-proposal", createCommunityOutreachProposal);
router.post("/create-department-form", createDepartment);
router.post("/create-notification", createNotification);
router.post("/create-audit-trail", createAuditTrail);
router.post("/create-file-upload",createFileUpload);


// READ
router.get("/read-users", getUsers);
router.get("/read-proposal", getProposal);
router.get("/read-proposal-action-plan", getProposalActionPlan);
router.get("/read-implementation", getImplementation);
router.get("/read-community-outreach-proposal", getCommunityOutreachProposal);
router.get("/read-intake-form", getIntakeForm);
router.get("/read-notification", getNotification);
router.get("/read-department", getDepartment);
router.get("/read-audit-trail", getAuditTrail);
router.get("/read-file-upload",getFileUpload);

// UPDATE
router.put("/update-proposal", updateProposal);
router.put("/update-user", updateUserDetails);
router.put("/update-notification", updateNotification);
router.put("/update-implementation", updateImplementation);
router.put("/update-intake-form", updateIntakeForm);
router.put("/update-intake", updateIntake);

/**
router.put("/update-intake-form", async (req, res) => {

    
    try {
      const updatedData = req.body;
      // Assuming 'yourModel' is a Mongoose model
      const result = await IntakeForm.findByIdAndUpdate(updatedData._id, updatedData, { new: true });
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
    
   
  });

   */

// DELETE
router.delete("/delete-proposal/:id", deleteProposal);
router.delete("/delete-implementation/:id", deleteImplementation);
router.delete("/delete-intake-form", deleteIntakeForm);


export default router;