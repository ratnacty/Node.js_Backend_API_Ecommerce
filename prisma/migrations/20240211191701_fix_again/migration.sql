/*
  Warnings:

  - You are about to drop the column `userId` on the `rolepermission` table. All the data in the column will be lost.
  - Added the required column `role` to the `RolePermission` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `rolepermission` DROP FOREIGN KEY `RolePermission_userId_fkey`;

-- AlterTable
ALTER TABLE `rolepermission` DROP COLUMN `userId`,
    ADD COLUMN `role` ENUM('USER', 'ADMIN', 'SUPERADMIN') NOT NULL;
