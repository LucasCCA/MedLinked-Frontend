import { medlinked } from "@medlinked/api";

export function sendEmail(username: string) {
  return medlinked.post(`password/reset?username${username}`);
}
