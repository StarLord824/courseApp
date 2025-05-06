import jwt from "jsonwebtoken";
import express from "express";

import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

const userAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, "secret", (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "Invalid token" });
      } else {
        client.user
          .findUnique({
            where: {
              id: decoded.userId,
            },
          })
          .then((user) => {
            if (user) {
              req.user = user;
              next();
            } else {
              res.status(401).json({ message: "Invalid token" });
            }
          });
      }
    });
  } else {
    res.status(401).json({ message: "No token provided" });
  }
};  

export default userAuth;    