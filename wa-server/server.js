import express from 'express'
import authRoutes from "./app/auth/auth.routes.js"
import "colors";
import dotenv from "dotenv"
import morgan from 'morgan';
import { prisma } from './app/prisma.js';
import { errorHandler, notFound } from './app/middleware/error.middleware.js';
import userRoutes from "./app/user/user.routes.js"
import exerciseRoutes from './app/exercise/exercise.routes.js';
import workoutRoutes from './app/workout/workout.routes.js'
import path from "path"

dotenv.config()

const app = express();



async function main() {

  if (process.env.NODE_ENV==="development") app.use(morgan('dev'))

  const PORT = process.env.PORT || 5000;

  app.use(express.json());

  const __dirname = path.resolve()

  app.use("/uploads", express.static(path.join(__dirname, '/uploads/')))

  app.use("/api/auth", authRoutes)
  app.use("/api/users", userRoutes)
  app.use("/api/exercises", exerciseRoutes)
  app.use("/api/workouts", workoutRoutes)

  app.use(notFound)
  app.use(errorHandler)

  app.listen(
    PORT,
    console.log(
      `🚀 Server running on ${PORT} port`.blue.bold
    )
  )
}

main().then(async () => {
  await prisma.$disconnect()
})