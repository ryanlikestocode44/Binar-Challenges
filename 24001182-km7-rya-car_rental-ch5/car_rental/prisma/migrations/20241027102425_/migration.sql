/*
  Warnings:

  - You are about to drop the column `profilepicture` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `roleid` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "profilepicture",
DROP COLUMN "roleid",
ADD COLUMN     "profilePicture" VARCHAR,
ADD COLUMN     "roleId" INTEGER NOT NULL DEFAULT 2;
