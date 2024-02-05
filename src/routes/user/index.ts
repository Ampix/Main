import express from "express";
import path from "node:path";

import { api } from "../../main";

export const router = express.Router();

router.get("/", async (req, res) => {
	const ip = req.ip ? req.ip : "nincs";
	if (req.signedCookies.auth_token) {
		res.send("login done");
	} else {
		res.redirect(303, "/user/login");
	}
});

router.get("/login", async (req, res) => {
	res.sendFile(path.resolve("src/routes/user/login/index.html"));
});
router.get("/login/pop", async (req, res) => {
	res.sendFile(path.resolve("src/routes/user/login/pop.html"));
});
