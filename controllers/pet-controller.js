import knex from "knex";
import knexConfig from "../knexfile.js";

const db = knex(knexConfig.development);

// Get all pets
export const getAllPets = async (req, res) => {
	try {
		const pets = await db("pets").select("*");
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

// Delete a pet
export const deletePet = async (req, res) => {
	try {
		const { petId } = req.params;

		const result = await db("pets").where({ id: petId }).del();

		if (!result) {
			return res.status(404).json({ message: "Pet not found" });
		}

		res.status(204).send();
	} catch (error) {
		res.status(500).json({ message: "Error deleting pet" });
	}
};
