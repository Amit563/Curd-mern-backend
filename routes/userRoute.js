import express from "express";
import jwt from "jsonwebtoken";
import { dashboard, login, register } from "../controller/userController.js";

const route = express.Router();

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    return res.json("The token was not available");
  } else {
    jwt.verify(token, "jwt-secret-key", (error, decoded) => {
      if (error) return res.json("Token is wrong");
      next();
    });
  }
};

route.post("/register", register);
route.post("/login", login);

route.get("/dashboard", verifyUser, dashboard);

export default route;
