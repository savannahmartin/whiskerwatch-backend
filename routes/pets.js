import express from "express";
import * as petController from "../controllers/pet-controller.js";

const router = express.Router();

router.route("/").get(petController.getAllPets).post(petController.addPet);

router
	.route("/:petId")
	.get(petController.getPetById)
	.put(petController.updatePet)
	.delete(petController.deletePet);

export default router;
