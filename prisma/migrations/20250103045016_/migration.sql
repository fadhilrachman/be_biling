/*
  Warnings:

  - Added the required column `title` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_at` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_at` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Report` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `title` VARCHAR(191) NOT NULL,
    ADD COLUMN `update_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Transaction` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `update_at` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `ReportFeedback` (
    `id` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `title` VARCHAR(191) NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `report_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ReportFeedback` ADD CONSTRAINT `ReportFeedback_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReportFeedback` ADD CONSTRAINT `ReportFeedback_report_id_fkey` FOREIGN KEY (`report_id`) REFERENCES `Report`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
