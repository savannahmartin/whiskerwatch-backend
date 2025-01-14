import express from "express";
import * as behaviorController from "../controllers/behavior-controller.js";

const router = express.Router();

router
	.route("/")
	.get(behaviorController.getAllBehaviors)
	.post(behaviorController.addBehavior);

router
	.route("/:behaviorId")
	.get(behaviorController.getBehaviorById)
	.put(behaviorController.updateBehavior)
	.delete(behaviorController.deleteBehavior);

router.get("/pet/:petId", behaviorController.getBehaviorsByPet);

export default router;
