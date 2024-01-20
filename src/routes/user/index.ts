import express from "express";
import path from "node:path"
import cookieParser from "cookie-parser";

export const router = express.Router();

router.use(cookieParser(process.env.COOKIE_SECRET))

router.get("/", (req, res) => {
	if(req.signedCookies["userAuthCode"]){
		res.send("csa")
	}else{
		res.send("nem csa")
	}
});

router.get("/setcookie/:cookie/:forthis", (req,res) => {
	res.cookie(req.params.cookie,req.params.forthis,{
		maxAge: 2000,
		signed:true
	})
	res.redirect("/user")
});
