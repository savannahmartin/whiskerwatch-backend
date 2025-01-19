import knex from "knex";
import knexConfig from "../knexfile.js";

const db = knex(knexConfig.development);

// Get all active pets
export const getAllPets = async (req, res) => {
	try {
		const pets = await db("pets").where({ status: "active" }).select("*");
		res.json(pets);
	} catch (error) {
		res.status(500).json({ message: "Error fetching pets" });
	}
};


// Get a single pet by ID
export const getPetById = async (req, res) => {
	try {
		const { petId } = req.params;
		const pet = await db("pets").where({ id: petId }).first();

		if (!pet) {
			return res.status(404).json({ message: "Pet not found" });
		}

		res.json(pet);
	} catch (error) {
		res.status(500).json({ message: "Error fetching pet" });
	}
};

// Add a pet
export const addPet = async (req, res) => {
	try {
		const { name, species, breed, age } = req.body;

		if (!name) {
			return res.status(400).json({ message: "Name is required" });
		}

		const [newPetId] = await db("pets").insert({ name, species, breed, age });

		// Fetch the newly inserted pet
		const newPet = await db("pets").where({ id: newPetId }).first();

		res.status(201).json(newPet);
	} catch (error) {
		res.status(500).json({ message: "Error adding pet" });
	}
};

// Update a pet
export const updatePet = async (req, res) => {
	try {
		const { petId } = req.params;
		const { name, species, breed, age } = req.body;

		const pet = await db("pets").where({ id: petId }).first();

		if (!pet) {
			return res.status(404).json({ message: "Pet not found" });
		}

		await db("pets")
			.where({ id: petId })
			.update({ name, species, breed, age });

		// Fetch the updated pet
		const updatedPet = await db("pets").where({ id: petId }).first();

		res.json(updatedPet);
	} catch (error) {
		res.status(500).json({ message: "Error updating pet" });
	}
};

// Archive a pet
export const archivePet = async (req, res) => {
	try {
		const { petId } = req.params;

		// Check if the pet exists
		const pet = await db("pets").where({ id: petId }).first();
		if (!pet) {
			return res.status(404).json({ message: "Pet not found" });
		}

		// Update pet status to "archived"
		await db("pets").where({ id: petId }).update({ status: "archived" });

		res.json({ message: "Pet archived successfully" });
	} catch (error) {
		res.status(500).json({ message: "Error archiving pet" });
	}
};

// Get all archived pets
export const getArchivedPets = async (req, res) => {
	try {
		const pets = await db("pets").where({ status: "archived" }).select("*");
		res.json(pets);
	} catch (error) {
		res.status(500).json({ message: "Error fetching archived pets" });
	}
};

