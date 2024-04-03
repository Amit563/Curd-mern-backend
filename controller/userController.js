import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      User.create({ name, email, password: hash })
        .then((user) => res.json(user))
        .catch((error) => console.log(error.message));
    })
    .catch((error) => console.log(error.message));
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (error, response) => {
          if (response) {
            // JWT
            const token = jwt.sign({ email: user.email }, "jwt-secret-key", {
              expiresIn: "1d",
            });
            res.cookie("token", token);
            res.json("Success");
          } else {
            res.json("Password is incorrect");
          }
        });
      } else {
        res.json("No record existed");
      }
    })
    .catch((error) => res.json(error));
};

export const dashboard = (req, res) => {
  return res.json("Success");
};
