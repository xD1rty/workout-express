import asyncHandler from "express-async-handler";
import { prisma } from "../prisma.js";

export const createNewExercise = asyncHandler(async (req, res) => {
  console.log(req.body)
  const { name, times, iconPath } = req.body

  const exercise = await prisma.exercise.create({
    data: {
      name, 
      times, 
      iconPath
    }
  })

  res.json(exercise)
})

export const getAllExercises = asyncHandler(async (req, res) => {
  const exercises = await prisma.exercise.findMany()
  res.json(exercises)
})

export const getExercise = asyncHandler(async (req, res) => {
  const exercise = await prisma.exercise.findUnique(
    {
      where: {
        id: +req.params.id
      }
    }
  )
  res.json(exercise)
})


export const updateExercise = asyncHandler(async (req, res) => {
  // console.log(req.params)
  const { name, times, iconPath } = req.body
  try {
    const exercise = await prisma.exercise.update({
      where: {
        id: +req.params.id
      },
      data: {
        name, 
        times, 
        iconPath
      }
    })
  
    res.json(exercise)
  } catch(e) {
    res.status(404)
    throw new Error("Exercise not found!")
  }
})

export const deleteExercise = asyncHandler(async (req, res) => {
  // console.log(req.params)
  const { name, times, iconPath } = req.body
  try {
    const exercise = await prisma.exercise.delete({
      where: {
        id: +req.params.id
      }
    })
  
    res.json({msg: `Done, exercise with ID ${req.params.id} deleted`})
  } catch(e) {
    res.status(404)
    throw new Error("Exercise not found!")
  }
})