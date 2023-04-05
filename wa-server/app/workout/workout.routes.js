import express from "express";

import { createNewWorkout, getAllWorkouts, updateWorkout, deleteWorkout, getWorkout } from "./workout.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router()

router.route("/")
  .post(protect, createNewWorkout)
  .get(protect, getAllWorkouts)
router.route("/:id")
  .put(protect, updateWorkout)
  .delete(protect, deleteWorkout)
  .get(protect, getWorkout)

export default router