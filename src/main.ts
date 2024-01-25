import express from "express";
import path from "node:path";
import cookieParser from "cookie-parser";

import * as sckk from "./routes/sckk";
import * as user from "./routes/user";
import * as matek from "./routes/matek";
import * as vakterkep from "./routes/vakterkep";
import * as nemet from "./routes/nemet";

const port = 8080;

const app = express();

app.use(express.json({ limit: "10mb" }));

app.use(
	express.urlencoded({
		extended: true,
	}),
);

app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(express.static("public"));

app.use("/sckk", sckk.router);
app.use("/user", user.router);
app.use("/matek", matek.router);
app.use("/vakterkep", vakterkep.router);
app.use("/nemet", nemet.router);

app.get("/", (req, res) => {
	res.sendFile(path.resolve("src/routes/index.html"));
});

app.use((req, res, next) => {
	res.status(404);
	if (req.accepts("html")) {
		res.sendFile(path.resolve("src/routes/404.html"));
	}
});

app.listen(port, () => {
	console.log(`http://localhost:${port}`);
});
