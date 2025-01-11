/*
  Warnings:

  - A unique constraint covering the columns `[feedback_id,user_id]` on the table `Upvote` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Upvote_feedback_id_user_id_key" ON "Upvote"("feedback_id", "user_id");
