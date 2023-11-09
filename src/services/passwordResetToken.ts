import { medlinked } from "@medlinked/api";
import { CreateResetToken } from "@medlinked/types";

export function sendEmail(data: CreateResetToken) {
  return medlinked.post(`password/reset?username=${data.username}`);
}
