/*
  Warnings:

  - You are about to drop the `_permissiontorolepermission` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `permissionId` to the `RolePermission` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_permissiontorolepermission` DROP FOREIGN KEY `_PermissionToRolePermission_A_fkey`;

-- DropForeignKey
ALTER TABLE `_permissiontorolepermission` DROP FOREIGN KEY `_PermissionToRolePermission_B_fkey`;

-- AlterTable
ALTER TABLE `rolepermission` ADD COLUMN `permissionId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_permissiontorolepermission`;

-- AddForeignKey
ALTER TABLE `RolePermission` ADD CONSTRAINT `RolePermission_permissionId_fkey` FOREIGN KEY (`permissionId`) REFERENCES `Permission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
