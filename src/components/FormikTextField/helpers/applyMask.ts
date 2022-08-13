import {
  cep,
  currency,
  cellphone,
  telephone,
  telephoneOrCellphone,
  cpf,
  cnpj,
  rg,
  cnh,
  renavam,
  plate,
  onlyNumber,
  toUpperCase
} from './masks'

export type Mask = 'cep' | 'currency' | 'cellphone' | 'telephone' | 'telephoneOrCellphone' | 'cpf' |
'cnpj' | 'rg' | 'cnh' | 'renavam' | 'plate' | 'onlyNumber' | 'toUpperCase'

export function handleApplyMaskOnChange (e: React.KeyboardEvent<HTMLInputElement>, mask?: Mask) {
  switch (mask) {
    case 'cep': cep(e)
      break
    case 'currency': currency(e)
      break
    case 'cellphone': cellphone(e)
      break
    case 'telephone': telephone(e)
      break
    case 'telephoneOrCellphone': telephoneOrCellphone(e)
      break
    case 'cpf': cpf(e)
      break
    case 'cnpj': cnpj(e)
      break
    case 'rg': rg(e)
      break
    case 'cnh': cnh(e)
      break
    case 'renavam': renavam(e)
      break
    case 'plate': plate(e)
      break
    case 'onlyNumber': onlyNumber(e)
      break
    case 'toUpperCase': toUpperCase(e)
      break
  }
}