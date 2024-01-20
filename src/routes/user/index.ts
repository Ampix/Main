import express from "express";
import path from "node:path";
import cookieParser from "cookie-parser";

export const router = express.Router();

router.use(cookieParser(process.env.COOKIE_SECRET));

router.get("/", async (req, res) => {
	res.send(req.ip);
	// res.sendFile(path.resolve("src/routes/user/index.html"));
	// if (req.signedCookies.userAuthCode) {
	// 	const cucc = await fetch(
	// 		`https://api.ampix.cloud/auth/${req.signedCookies.userAuthCode}/${req.ip}`,
	// 	);
	// 	if (cucc) {
	// 		console.log(cucc);
	// 	}
	// } else {
	// 	res.send("nem csa");
	// }
});

router.get("/setcookie/:cookie/:forthis", (req, res) => {
	res.cookie(req.params.cookie, req.params.forthis, {
		maxAge: 200000,
		signed: true,
	});
	res.redirect("/user");
});
