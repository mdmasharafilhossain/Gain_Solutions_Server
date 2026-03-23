/*
  Warnings:

  - A unique constraint covering the columns `[studentId,courseId,year]` on the table `Result` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Result_studentId_courseId_year_key" ON "Result"("studentId", "courseId", "year");
