-- DropForeignKey
ALTER TABLE "Password" DROP CONSTRAINT "Password_user_id_fkey";

-- AddForeignKey
ALTER TABLE "Password" ADD CONSTRAINT "Password_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
