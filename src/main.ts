import express from "express";
import path from "node:path";
import bodyParser from "body-parser";

import * as sckk from "./routes/sckk";
import * as user from "./routes/user";

const port = 8080;

const app = express();

app.use(express.json());

app.use(bodyParser.json({ limit: "10mb" }));

app.use(express.static("public"));

app.use("/sckk", sckk.router);
app.use("/user", user.router);

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
