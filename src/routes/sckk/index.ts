import express from "express";
import path from "node:path";

export const router = express.Router();

router.get("/", (req, res) => {
	res.sendFile(path.resolve("src/routes/sckk/index.html"));
});

router.get("/app", (req, res) => {
	res.sendFile(path.resolve("src/routes/sckk/app.html"));
});
