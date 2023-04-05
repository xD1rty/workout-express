import { prisma } from "../../prisma.js"
import { addPrevValues } from "./add-prev-values.util.js"
import asyncHandler from 'express-async-handler';


export const getExerciseLog = asyncHandler(async (req, res) => {
  // const id = +req.params.id

  const exerciseLog = await prisma.exerciseLog.findUnique({
    where: {
      id: +req.params.id
    },
    include: {
      times: {
        orderBy: {
          id: "asc "
        }
      },
      exercise: true
    }
  })

  const prevExerciseId = await prisma.exerciseLog.findFirst({
    where: {
      exerciseId: exerciseLog.exerciseId,
      userId: req.user.id,
      isCompleted: true
    },
    orderBy: {
      createdAt: "desc"
    },
    include: {
      times: true
    }
  })
  let newTimes = addPrevValues(exerciseLog, prevExerciseId)
  res.json({...exerciseLog, times: newTimes})
})