import { toast } from "sonner"

export async function copyToClipboard(text: string | number) {
  await navigator.clipboard.writeText(String(text))
  toast.success('Texto copiado!')
}