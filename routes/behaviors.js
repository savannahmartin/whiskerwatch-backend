import express from "express";
import * as behaviorController from "../controllers/behavior-controller.js";

const router = express.Router();

// Routes for all behaviors & adding a new one
router.route("/")
	.get(behaviorController.getAllBehaviors)
	.post(behaviorController.addBehavior);

// Routes for behaviors associated with a specific pet
router.route("/pet/:petId")
	.get(behaviorController.getBehaviorsByPet);

// Routes for a single behavior (view, update, delete)
router.route("/:behaviorId")
	.get(behaviorController.getBehaviorById)
	.put(behaviorController.updateBehavior)
	.delete(behaviorController.deleteBehavior);

export default router;