import asyncHandler from 'express-async-handler';
import { prisma } from '../../prisma.js';
// import { getExercise } from '../exercise.controller';
import { UserFields } from '../../utils/user.utils.js';

export const createExerciseLog = asyncHandler(async (req, res) => {
  const id = +req.params.id

  const exercise = await prisma.exercise.findUnique({
    where: {
      id: id
    }
  })

  if (!exercise) {
    res.status(404)
    throw new Error(`Exercise ${id} not found`)
  }

  let timesDefault = []

  for (let i = 0; i < exercise.times; i++) {
    timesDefault.push({
      weight: 0,
      repeat: 0
    })
  }


  const exerciseLog = await prisma.exerciseLog.create({
    data: {
      user: {
        connect: {
          id: req.user.id
        } 
      },
      exercise: {
        connect: {
          id: id
        }
      },
      times: {
        createMany: {
          data: timesDefault
        }
      }
    },
    include: {
      times: true
      // _count: true
    }
  })

  res.json(exerciseLog)
})

