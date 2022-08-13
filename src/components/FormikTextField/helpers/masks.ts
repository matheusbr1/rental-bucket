import React from 'react'

export function cep (e: React.FormEvent<HTMLInputElement>) {
  e.currentTarget.maxLength = 9
  let value = e.currentTarget.value
  value = value?.replace(/\D/g, '')
  value = value?.replace(/^(\d{5})(\d)/, '$1-$2')
  e.currentTarget.value = value
  return e
}

export function staticCEPMask (CEP: string) {
  return CEP.replace(/(\d{5})?(\d{3})/, '$1-$2')
}

export function currency (e: React.FormEvent<HTMLInputElement>, onlyDecimals?: boolean) {
  e.currentTarget.maxLength = 25
  let value = e.currentTarget.value
  value = value.replace(/\D/g, '')
  value = value.replace(/^[0.]+/, '')
  value = value.replace(/(\d)(\d{2})$/, '$1,$2')
  value = value.replace(/(?=(\d{3})+(\D))\B/g, '.')
  e.currentTarget.value = onlyDecimals ? value : value && ('R$ ' + value)
  return e
}

export function numberTocurrency (value: string) {
  value = value.replace(/\D/g, '')
  value = value.replace(/^[0.]+/, '')
  value = value.replace(/(\d)(\d{2})$/, '$1,$2')
  value = value.replace(/(?=(\d{3})+(\D))\B/g, '.')
  return value
}

export function cellphone (e: React.FormEvent<HTMLInputElement>) {
  e.currentTarget.maxLength = 16
  let value = e.currentTarget.value
  value = value.replace(/\D/g, '')
  value = value.substring(0, 11)
  value = value.replace(/^(\d{2})(\d)/g, '($1)9')
  value = value.replace(/(\d)(\d{5})/, '9.$2')
  value = value.replace(/(\d)(\d{4})$/, '$1-$2')
  e.currentTarget.value = value
  return e
}

export function staticCellphoneMask (cellphone: string) {
  return cellphone.replace(/(\d{2})?(\d{1})?(\d{4})?(\d{4})/g, '($1)$2.$3-$4')
}

export function telephone (e: React.FormEvent<HTMLInputElement>) {
  e.currentTarget.maxLength = 13
  let value = e.currentTarget.value
  value = value.replace(/\D/g, '')
  value = value.substring(0, 11)
  value = value.replace(/^(\d{2})(\d)/g, '($1)$2')
  value = value.replace(/(\d)(\d{4})$/, '$1-$2')
  e.currentTarget.value = value
  return e
}

export function telephoneOrCellphone (e: React.FormEvent<HTMLInputElement>) {
  e.currentTarget.maxLength = 14
  let value = e.currentTarget.value
  value = value.replace(/\D/g, '')
  value = value.substring(0, 11)
  value = value.replace(/^(\d{2})(\d)/g, '($1)$2')
  value = value.replace(/(\d)(\d{4})$/, '$1-$2')
  e.currentTarget.value = value
  return e
}

export function staticPhoneMask (phone: string) {
  return phone.replace(/(\d{2})?(\d{4})?(\d{4})/g, '($1) $2-$3')
}

export function cpf (e: React.FormEvent<HTMLInputElement>) {
  e.currentTarget.maxLength = 14
  let value = e.currentTarget.value
  value = value.replace(/\D/g, '')
  value = value.replace(/(\d)(\d{2})$/, '$1-$2')
  value = value.replace(/(?=(\d{3})+(\D))\B/g, '.')
  e.currentTarget.value = value
  return e
}

export function staticCPFMask (CPF: string) {
  if (!Number(CPF)) {
    return null
  }

  return CPF.padStart(11, '0').replace(/(\d{3})?(\d{3})?(\d{3})?(\d{2})/, '$1.$2.$3-$4')
}

export function cnpj (e: React.FormEvent<HTMLInputElement>) {
  e.currentTarget.maxLength = 18
  let value = e.currentTarget.value
  value = value.replace(/\D/g, '')
  value = value.replace(/^(\d{2})(\d)/, '$1.$2')
  value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
  value = value.replace(/\.(\d{3})(\d)/, '.$1/$2')
  value = value.replace(/(\d{4})(\d)/, '$1-$2')
  e.currentTarget.value = value
  return e
}

export function staticCNPJMask (CNPJ: string | number) {
  return String(CNPJ).padStart(14, '0').replace(/(\d{2})?(\d{3})?(\d{3})?(\d{4})?(\d{2})/, '$1.$2.$3/$4-$5')
}

export function rg (e: React.FormEvent<HTMLInputElement>) {
  e.currentTarget.maxLength = 13
  let value = e.currentTarget.value.toUpperCase()

  value = value.replace(/\W/g, '')
  value = value.replace(/_/g, '')

  e.currentTarget.value = value

  return e
}

export function cnh (e: React.FormEvent<HTMLInputElement>) {
  e.currentTarget.maxLength = 11
  let value = e.currentTarget.value
  value = value.replace(/\D/g, '')
  e.currentTarget.value = value
  return e
}

export function renavam (e: React.FormEvent<HTMLInputElement>) {
  e.currentTarget.maxLength = 11
  let value = e.currentTarget.value
  value = value.replace(/\D/g, '')
  e.currentTarget.value = value
  return e
}

export function onlyNumber (e: React.FormEvent<HTMLInputElement>) {
  let value = e.currentTarget.value
  value = value.replace(/[^0-9]+/g, '')
  e.currentTarget.value = value
  return e
}

export function plate (e: React.FormEvent<HTMLInputElement>) {
  e.currentTarget.maxLength = 8
  let value = e.currentTarget.value

  if (value.includes('_')) {
    value = ''
  }

  // verify if first char is a letter
  const firstChar = value.substring(0, 1)
  const isFirstCharNumber = !isNaN(Number(firstChar))

  if (isFirstCharNumber) {
    value = ''
  }

  // verify is the two last chars are numbers
  if (value.length === 7) {
    const lastChar = value.substring(value.length - 1, value.length)
    const isNotANumber = isNaN(Number(lastChar))

    if (isNotANumber) {
      const newValue = value.slice(0, value.length - 1)
      value = newValue
    }
  } else if (value.length === 8) {
    const lastChar = value.substring(value.length - 1, value.length)
    const penultimateChar = value.substring(value.length - 2, value.length - 1)

    const lastCharIsNotANumber = isNaN(Number(lastChar))
    const penultimateCharIsNotANumber = isNaN(Number(penultimateChar))

    let newValue = ''
    if (lastCharIsNotANumber) {
      newValue = value.slice(0, value.length - 1)
    }
    if (penultimateCharIsNotANumber) {
      newValue = value.slice(0, value.length - 2)
    }

    if (lastCharIsNotANumber || penultimateCharIsNotANumber) {
      value = newValue
    }
  }

  value = value.replace(/\W/g, '')
  value = value.replace(/(\w{3})(\w)/, '$1-$2')

  value = value.toUpperCase()
  e.currentTarget.value = value
  return e
}

export function toUpperCase (e: React.FormEvent<HTMLInputElement>) {
  let value = e.currentTarget.value
  value = value.toUpperCase()
  e.currentTarget.value = value
  return e
}
