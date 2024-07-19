export function driverFactory() {
  return {
    name: '',
    CPF: '',
    RG: '',
    CNH: '',
    birthday: '',
    address: {
      id: '',
      CEP: '',
      street: '',
      number: '',
      neighborhood: '',
      state: '',
      city: '',
      complement: '',
      lat: '',
      lng: '',
    },
    contacts: {
      cellphone: '',
      phone: '',
      email: '',
    }
  }
}