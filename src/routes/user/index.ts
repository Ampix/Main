import express from "express";
import path from "node:path";

import { api } from "../../main";

export const router = express.Router();

router.get("/", async (req, res) => {
	const ip = req.ip ? req.ip : "nincs";
	if (req.signedCookies.userAuthCode) {
		const cucc = await fetch(
			`${api}/users/auth/${req.signedCookies.userAuthCode}/${ip}`,
		);
		if (cucc.status === 200) {
			res.sendFile(path.resolve("src/routes/user/index.html"));
			console.log(cucc);
		} else {
			res.redirect(303, "/user/login");
		}
	} else {
		res.redirect(303, "/user/login");
	}
});

router.get("/login", async (req, res) => {
	res.sendFile(path.resolve("src/routes/user/login.html"));
});

router.get("/login/code", async (req, res) => {
	res.sendFile(path.resolve("src/routes/user/code.html"));
});

router.post("/post-login", async (req, res) => {
	const body = await req.body;
	if (body?.email) {
		const cucc = await fetch(`${api}/users/login/mail`, {
			method: "POST",
			cache: "no-cache",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: body.email,
			}),
		});
		console.log(cucc);
		if (cucc.status === 200) {
			res.redirect(303, "/user/login/code");
		} else {
			res.sendStatus(cucc.status);
		}
	} else {
		res.redirect(303, "/user/login");
	}
});

router.post("/post-code", async (req, res) => {
	const body = await req.body;
	const ip = req.ip ? req.ip : "nincs";
	if (body?.code) {
		const cucc = await fetch(`${api}/users/login/code`, {
			method: "POST",
			cache: "no-cache",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				code: body.code,
			}),
		});
		const mama = await cucc.text();
		if (!mama) return res.redirect(303, "/user/login/code");
		await fetch(`${api}/users/bind/addresstocode/${mama}/${ip}`);
		res.cookie("userAuthCode", mama, {
			signed: true,
			secure: true,
			sameSite: true,
		});
		if (cucc.status === 200) {
			res.redirect(303, "/user");
		} else {
			res.sendStatus(cucc.status);
		}
	} else {
		res.redirect(303, "/user/login/code");
	}
});
