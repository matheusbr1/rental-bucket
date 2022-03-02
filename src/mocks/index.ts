import { ICustomer, IDriver, ITruck, IWork } from "interfaces"

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
        state: 'SP', 
        city: 'São Paulo',
        complement: ''
      },
      { 
        CEP: '05628-040',  
        street: 'Rua Doutor João José de Carvalho', 
        number: '12',  
        neighborhood: 'Vila Sônia',
        state: 'SP', 
        city: 'São Paulo',
        complement: ''
      }
    ]
  },
  {
    id: 2,
    CPF: '649.560.678-87',
    name: 'Antonio Kauê Lucca da Luz',
    contact: {
      email: 'antoniokaueluccadaluz_@sinelcom.com.br',
      telephone: '(12) 2612-6444',
      cellphone: '(12) 98430-2458',
    },
    address: [
      { 
        CEP: '08030-170',  
        street: 'Rua Guarupu', 
        number: '987',  
        neighborhood: 'Vila Curuçá',
        state: 'SP', 
        city: 'São Paulo',
        complement: ''
      }
    ]
  },
  {
    id: 3,
    CPF: '003.786.338-05',
    name: 'Milena Aurora Márcia Fogaça',
    contact: {
      email: 'milenaauroramarciafogaca-82@graffiti.net',
      telephone: '(14) 2795-9980',
      cellphone: '(14) 98991-7496',
    },
    address: [
      { 
        CEP: '04457-120',  
        street: 'Rua Luís Bueno de Miranda', 
        number: '12387',  
        neighborhood: 'Jardim Palmares (Zona Sul)',
        state: 'SP', 
        city: 'São Paulo',
        complement: ''
      }
    ]
  },
  {
    id: 4,
    CNPJ: '99.732.888/0001-14',
    stateRegistration: '99.732.888/0001-14',
    name: 'Alessandra e Pedro Vidros Ltda',
    contact: {
      email: 'ouvidoria@alessandraepedrovidrosltda.com.br',
      telephone: '(19) 2747-8372',
      cellphone: '(19) 99623-9418',
    },
    address: [
      { 
        CEP: '04457-120',  
        street: 'Rua Luís Bueno de Miranda', 
        number: '12387',  
        neighborhood: 'Jardim Palmares (Zona Sul)',
        state: 'SP', 
        city: 'São Paulo',
        complement: ''
      }
    ]
  },
  {
    id: 5,
    CNPJ: '36.745.474/0001-00',
    stateRegistration: '641.997.789.144',
    name: 'Luciana e Thiago Gráfica ME',
    contact: {
      email: 'treinamento@lucianaethiagograficame.com.br',
      telephone: '(11) 2657-5882',
      cellphone: '(11) 98299-6434',
    },
    address: [
      { 
        CEP: '04457-120',  
        street: 'Rua Luís Bueno de Miranda', 
        number: '12387',  
        neighborhood: 'Jardim Palmares (Zona Sul)',
        state: 'SP', 
        city: 'São Paulo',
        complement: ''
      }
    ]
  }
]

export const drivers: IDriver[] = [
  {
    id: 1,
    name: 'Theo Thomas Leonardo das Neves',
    CPF: '337.117.348-80',
    RG: '20.498.441-5',
    CNH: '123123',
    birthday: '23/06/1972',
    address: { 
      CEP: '05396-010', 
      street: 'Rua Antenor de Freitas', 
      number: '393',  
      neighborhood: 'Parque dos Príncipes',
      state: 'SP', 
      city: 'Osasco',
      complement: ''
    },
    contact: {
      telephone: '(11) 2644-3809',
      cellphone: '(11) 99141-9747',
      email: 'theoThomas@gmail.com'
    }
  }
]

export const trucks: ITruck[] = [
  {
    id: 1,
    brand: 'Ford',
    model: 'F-1000 XLT 4x4 Diesel Turbo',
    renavam: '36783908793',
    plate: 'FKF-7151',
    equipment: 'Poliguindaste',
    year: {
      manufacture: '1996',
      model: '1996'
    },
  },
  {
    id: 2,
    brand: 'Ford',
    model: 'Ranger XLT 3.0 PSE 163cv 4x4 CD TB Dies.',
    renavam: '70007064510',
    plate: 'DAD-8320',
    equipment: 'Poliguindaste',
    year: {
      manufacture: '2005',
      model: '2005'
    },
  },
  {
    id: 3,
    brand: 'Ford',
    model: 'F-250 XLT 3.9 4x4 CD TB Diesel',
    renavam: '23756275112',
    plate: 'FWY-0640',
     equipment: 'Poliguindaste',
     year: {
      manufacture: '2007',
      model: '2007'
    },
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