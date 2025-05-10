// import jwt from "jsonwebtoken";
// import express from "express";

// import { PrismaClient } from "@prisma/client";

// const client = new PrismaClient();

// const adminAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
//   const token = req.headers.authorization;

//   if (token) {
//     jwt.verify(token, "secret", (err, decoded) => {
//       if (err) {
//         res.status(401).json({ message: "Invalid token" });
//       } else {
//         client.admin
//           .findUnique({
//             where: {
//               id: decoded.adminId,
//             },
//           })
//           .then((admin) => {
//             if (admin) {
//               req.admin = admin;
//               next();
//             } else {
//               res.status(401).json({ message: "Invalid token" });
//             }
//           });
//       }
//     });
//   } else {
//     res.status(401).json({ message: "No token provided" });
//   }
// };                

// export default adminAuth;