/*
  Warnings:

  - You are about to drop the column `workout_id` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `exerciseId` on the `Exercise_log` table. All the data in the column will be lost.
  - You are about to drop the column `times` on the `Exercise_log` table. All the data in the column will be lost.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_workout_id_fkey";

-- DropForeignKey
ALTER TABLE "Exercise_time" DROP CONSTRAINT "Exercise_time_exercise_log_id_fkey";

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "workout_id";

-- AlterTable
ALTER TABLE "Exercise_log" DROP COLUMN "exerciseId",
DROP COLUMN "times";

-- AlterTable
ALTER TABLE "Exercise_time" ALTER COLUMN "weight" SET DEFAULT 0,
ALTER COLUMN "repeat" SET DEFAULT 0,
ALTER COLUMN "exercise_log_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET NOT NULL;

-- CreateTable
CREATE TABLE "_ExerciseToWorkout" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ExerciseToWorkout_AB_unique" ON "_ExerciseToWorkout"("A", "B");

-- CreateIndex
CREATE INDEX "_ExerciseToWorkout_B_index" ON "_ExerciseToWorkout"("B");

-- AddForeignKey
ALTER TABLE "Exercise_time" ADD CONSTRAINT "Exercise_time_exercise_log_id_fkey" FOREIGN KEY ("exercise_log_id") REFERENCES "Exercise_log"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToWorkout" ADD CONSTRAINT "_ExerciseToWorkout_A_fkey" FOREIGN KEY ("A") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToWorkout" ADD CONSTRAINT "_ExerciseToWorkout_B_fkey" FOREIGN KEY ("B") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;
