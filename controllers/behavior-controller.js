import knex from "knex";
import knexConfig from "../knexfile.js";

const environment = process.env.NODE_ENV || "development";
const db = knex(knexConfig[environment]);

// Get all behaviors
export const getAllBehaviors = async (req, res) => {
	try {
		const behaviors = await db("behaviors")
			.join("pets", "behaviors.pet_id", "pets.id")
			.select(
				"behaviors.id",
				"pets.name as pet_name",
				"behaviors.description",
				"behaviors.date",
				"behaviors.status" 
			)
			.where("behaviors.status", "active");

		res.json(behaviors);
	} catch (error) {
		console.error("Error fetching behaviors:", error);
		res.status(500).json({ message: "Error fetching all behaviors" });
	}
};

// Get behaviors for a specific pet
export const getBehaviorsByPet = async (req, res) => {
	try {
		const { petId } = req.params;
		const behaviors = await db("behaviors")
			.where({ pet_id: petId, status: "active" })
			.select("*");
		res.json(behaviors);
	} catch (error) {
		res.status(500).json({ message: "Error fetching behaviors for pet" });
	}
};

// Get a single behavior by ID
export const getBehaviorById = async (req, res) => {
	try {
		const { behaviorId } = req.params;
		const behavior = await db("behaviors")
		.join("pets", "behaviors.pet_id", "pets.id")
		.select(
			"behaviors.id",
			"behaviors.description",
			"behaviors.date",
			"pets.name as pet_name"
		)
		.where("behaviors.id", behaviorId)
		.first();

		if (!behavior) {
			return res.status(404).json({ message: "Behavior not found" });
		}

		res.json(behavior);
	} catch (error) {
		res.status(500).json({ message: "Error fetching behavior" });
	}
};

// Add a new behavior
export const addBehavior = async (req, res) => {
	try {
		const { pet_id, description, date } = req.body;

		console.log("Received data:", { pet_id, description, date });

		if (!pet_id || !description || !date) {
			console.error("Missing required fields");
			return res.status(400).json({ message: "All fields are required" });
		}

		await db("behaviors").insert({ pet_id, description, date });

		res.status(201).json({ message: "Behavior added successfully" });
	} catch (error) {
		console.error("Error adding behavior:", error);
		res.status(500).json({ message: "Error adding behavior" });
	}
};

// Update a behavior
export const updateBehavior = async (req, res) => {
	try {
		const { behaviorId } = req.params;
		const { description, date } = req.body;

		const behavior = await db("behaviors")
			.where({ id: behaviorId })
			.first();
		if (!behavior) {
			return res.status(404).json({ message: "Behavior not found" });
		}

		await db("behaviors")
			.where({ id: behaviorId })
			.update({ description, date });

		const updatedBehavior = await db("behaviors")
			.where({ id: behaviorId })
			.first();

		res.json(updatedBehavior);
	} catch (error) {
		res.status(500).json({ message: "Error updating behavior" });
	}
};

// Delete a behavior
export const deleteBehavior = async (req, res) => {
	try {
		const { behaviorId } = req.params;

		const result = await db("behaviors").where({ id: behaviorId }).del();

		if (!result) {
			return res.status(404).json({ message: "Behavior not found" });
		}

		res.status(204).send();
	} catch (error) {
		res.status(500).json({ message: "Error deleting behavior" });
	}
};
