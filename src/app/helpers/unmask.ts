export function unmask(value: string) {
  return value.replace(/\D/g, '')
}