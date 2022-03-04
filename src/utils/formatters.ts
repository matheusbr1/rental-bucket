export function removeMask (masked: string) {
  return !masked ? masked : masked.replace(/\D/g, '')
}