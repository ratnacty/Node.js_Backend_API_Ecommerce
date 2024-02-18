/*
  Warnings:

  - You are about to drop the column `role` on the `rolepermission` table. All the data in the column will be lost.
  - Added the required column `userId` to the `RolePermission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `rolepermission` DROP COLUMN `role`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `RolePermission` ADD CONSTRAINT `RolePermission_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
