import express from "express";
import * as petController from "../controllers/pet-controller.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router
	.route("/")
	.get(petController.getAllPets)
	.post(authenticateUser, petController.addPet);

router
	.route("/:petId")
    .get(petController.getPetById)
    .put(authenticateUser, petController.updatePet)
	
router
	.route("/archived")
	.get(authenticateUser, petController.getArchivedPets);

router
	.route("/:petId/archive")
	.put(authenticateUser, petController.archivePet);

export default router;