import { ICustomer, IWork } from "interfaces"

export const works: IWork[] = [
  {
    id: 1,
    address: "05628-040",
    customer: "Antonio Kauê Lucca da Luz",
    driver: "João Diogo da Rosa",
    endDate: new Date(),
    equipment: "Container de lixo",
    quantity: 1,
    type: "Retirada",
    truck: "DAD-8320",
  }
]

export const customers: ICustomer[] = [
  {
    id: 1,
    CPF: '568.753.008-85',
    name: 'Larissa Caroline de Paula',
    contact: {
      email: 'larissacarolinedepaula_@etec.sp.gov.br',
      telephone: '(16) 3701-4629',
      cellphone: '(16) 99474-4795',
    },
    address: [
      { 
        CEP: '05763-440', 
        street: 'Rua João Rodrigues de Moura', 
        number: '321',  
        neighborhood: 'Jardim Piracuama',
        state: null, 
        city: null,
        complement: ''
      },
      { 
        CEP: '05628-040',  
        street: 'Rua Doutor João José de Carvalho', 
        number: '12',  
        neighborhood: 'Vila Sônia',
        state: null, 
        city: null,
        complement: ''
      }
    ]
  }
]

export const equipments = [
  'Sacos de lixo',
  'Container de lixo',
  'Caçamba 5m³',
  'Caçamba 7m³',
  'Caçamba 12m³',
  'Caçamba 16m³'
]

export const workTypes = [
  'Troca',
  'Retirada',
  'Coloca'
]

export const brands = [
  'Ford',
  'Mercedes',
  'volkswagen'
]

export const models = [
  'F-1000 XLT 4x4 Diesel Turbo',
  'Ranger XLT 3.0 PSE 163cv 4x4 CD TB Dies'
]

export const years = [
 '1996',
 '1997',
 '1998',
 '1999',
 '2000',
 '2001',
]

export const truckEquipments = [
  'Poliguindaste',
  'Coletor',
  'Basculante',
  'Rollon'
]