import express from "express";
import * as petController from "../controllers/pet-controller.js";

const router = express.Router();

router.route("/").get(petController.getAllPets).post(petController.addPet);

router.route("/archived")
	.get(petController.getArchivedPets);

router
	.route("/:petId")
	.get(petController.getPetById)
	.put(petController.updatePet)
	.delete(petController.archivePet);

export default router;
