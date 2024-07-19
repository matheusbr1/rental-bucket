import { User } from "../auth/sign-in/page";
import { APP_NAME } from "../constants/app-infos";

export function getUserFromSession(): User {
  return JSON.parse(sessionStorage.getItem(`${APP_NAME}:user`)!)
}