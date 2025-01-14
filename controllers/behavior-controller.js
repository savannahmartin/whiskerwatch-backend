import knex from "knex";
import knexConfig from "../knexfile.js";

const db = knex(knexConfig.development);

// Get all behaviors
export const getAllBehaviors = async (req, res) => {
	try {
		const behaviors = await db("behaviors").select("*");
		res.json(behaviors);
	} catch (error) {
		res.status(500).json({ message: "Error fetching all behaviors" });
	}
};

// Get behaviors for a specific pet
export const getBehaviorsByPet = async (req, res) => {
	try {
		const { petId } = req.params;
		const behaviors = await db("behaviors")
			.where({ pet_id: petId })
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
			.where({ id: behaviorId })
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
		const { pet_id, description, date, time } = req.body;
		const [newBehavior] = await db("behaviors")
			.insert({ pet_id, description, date, time })
			.returning("*");
		res.status(201).json(newBehavior);
	} catch (error) {
		res.status(500).json({ message: "Error adding behavior" });
	}
};

// Update a behavior
export const updateBehavior = async (req, res) => {
	try {
		const { behaviorId } = req.params;
		const { description, date, time } = req.body;
		const behavior = await db("behaviors")
			.where({ id: behaviorId })
			.first();

		if (!behavior) {
			return res.status(404).json({ message: "Behavior not found" });
		}

		const updatedBehavior = await db("behaviors")
			.where({ id: behaviorId })
			.update({ description, date, time })
			.returning("*");

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
