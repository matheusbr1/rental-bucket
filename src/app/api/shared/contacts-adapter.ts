import { Contacts } from "../get-drivers";

export function contactsAdapter(contacts: Contacts) {
  return Object.entries(contacts)
    .map(([contact_type, contact]) => ({
      contact,
      contact_type
    }))
    .filter(c => !!c.contact)
}