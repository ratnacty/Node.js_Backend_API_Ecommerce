-- CreateTable
CREATE TABLE `_RolePermissionToUser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_RolePermissionToUser_AB_unique`(`A`, `B`),
    INDEX `_RolePermissionToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_RolePermissionToUser` ADD CONSTRAINT `_RolePermissionToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `RolePermission`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RolePermissionToUser` ADD CONSTRAINT `_RolePermissionToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
