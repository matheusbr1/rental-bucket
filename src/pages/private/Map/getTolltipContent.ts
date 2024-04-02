import { IWork } from "interfaces"

export function getTolltipContent(w: IWork) {
  const client = `Cliente: ${w.customer.name ?? w.customer.fantasy_name}\n`
  const CEP = `CEP: ${w.address.CEP}\n`
  const street = `Rua: ${w.address.street}\n`
  const neighborhood = `Bairro: ${w.address.neighborhood}\n`
  const number = `Número: ${w.address.neighborhood}\n`
  const service = `Serviço: ${w.work_type.name}\n`
  const quantity = `Quantidade: ${w.quantity}`
  const title =
    client +
    (CEP + street + neighborhood + number) +
    (service + quantity)
  return title
}