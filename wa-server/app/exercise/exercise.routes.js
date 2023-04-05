import express from "express";

import { createNewExercise, getAllExercises, updateExercise, deleteExercise, getExercise } from "./exercise.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { createExerciseLog, } from './log/exercise-log.controller.js';
import { getExerciseLog } from "./log/get-exercise-log.controller.js";
import { completeExerciseLog, updateExerciseLogTime } from "./log/update-exercise-log.controller.js";

const router = express.Router()

router.route("/")
  .post(protect, createNewExercise)
  .get(protect, getAllExercises)
router.route("/:id")
  .put(protect, updateExercise)
  .delete(protect, deleteExercise)
  .get(protect, getExercise)

router.route("/log/:id")
  .post(protect, createExerciseLog)
  .get(protect, getExerciseLog)

router.route("/log/complete/:id")
  .put(protect, completeExerciseLog)

router.route('/log/time/:id')
  .put(protect, updateExerciseLogTime)

export default router