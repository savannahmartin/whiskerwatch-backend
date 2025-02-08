import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import knex from "knex";
import knexConfig from "../knexfile.js";

const environment = process.env.NODE_ENV || "development";
const db = knex(knexConfig[environment]);

export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await db("users").where({ email }).first();
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert new user into the database
        const [newUserId] = await db("users").insert({
            username,
            email,
            password: hashedPassword,
        });

        // Generate JWT token
        const token = jwt.sign({ id: newUserId }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(201).json({ message: "User registered successfully", token });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await db("users").where({ email }).first();
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.json({ message: "Login successful", token, user: { id: user.id, username: user.username, email: user.email } });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Server error" });
    }
};
