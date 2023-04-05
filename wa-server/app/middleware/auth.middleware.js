import jwt from "jsonwebtoken";
import {prisma} from "../prisma.js"
import { UserFields } from "../utils/user.utils.js"; 
import asyncHandler from "express-async-handler";

export const protect = asyncHandler(async (req, res, next) => {
  let token

  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(" ")[1]
    // console.log(token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // console.log(token, decoded)

    const userFound = await prisma.user.findUnique({
      where: {
        id: decoded.userId
      },
      
    })

    if (userFound) {
      req.user = userFound
      next()
    } else{
      res.status(401)
      throw new Error("Token failed")
    }
  }

  if (!token) {
    res.status(401)
    throw new Error("Token not found")
  }
})