import { IWork } from "interfaces";

interface SendWhatsappProps {
  phoneNumber: string
  work: IWork
}

export function sendWhatsapp({
  work,
  phoneNumber
}: SendWhatsappProps) {
  const client = `Cliente: ${work.customer.name}\n`
  const address = `Endereço: ${work.address.CEP} - ${work.address.street} - ${work.address.neighborhood} - ${work.address.number}\n`
  const service = `Serviço: ${work.work_type.name}\nQuantidade: ${work.quantity}`

  const message = client + address + service

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappLink, '_blank');
}