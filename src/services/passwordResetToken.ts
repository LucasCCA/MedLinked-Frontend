import { medlinked } from "@medlinked/api";
import { CreateNewPassword, CreateResetToken } from "@medlinked/types";

export function sendEmail(data: CreateResetToken) {
  return medlinked.post(`password/reset?username=${data.username}`);
}

export function changePassword(data: CreateNewPassword, token: string) {
  return medlinked.post("password/save", {
    token: token,
    newPassword: data.password,
  });
}

export function verifyResetToken(token: string) {
  return medlinked.get(`password/change?token=${token}`);
}
