import { Router } from "express";
import path from "node:path";

export const router = Router();

router.get("/", (req, res) => {
	res.sendFile(path.resolve("src/routes/vakterkep/index.html"));
});
