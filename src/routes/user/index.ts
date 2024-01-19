import express from "express";
import path from "node:path"

export const router = express.Router();

router.get("/", (req, res) => {
	res.sendFile(path.resolve("src/routes/user/index.html"))
});

router.get("/");
