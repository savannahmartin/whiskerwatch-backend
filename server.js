import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import petRoutes from "./routes/pets.js";
import behaviorRoutes from "./routes/behaviors.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5050;

app.use("/pets", petRoutes);
app.use("/behaviors", behaviorRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
	res.send("Whisker Watch API is running!");
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
