-- AlterTable
ALTER TABLE `Report` MODIFY `status` ENUM('awaiting_response', 'on_progress', 'success') NOT NULL DEFAULT 'awaiting_response';
