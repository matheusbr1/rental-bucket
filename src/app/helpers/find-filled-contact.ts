import { Contacts } from "../api/get-drivers";

export function findFilledContact(contacts: Contacts) {
  return contacts.cellphone || contacts.phone || contacts.email || ''
}