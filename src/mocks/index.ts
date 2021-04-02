export const clients = [
  {
    cpf: '568.753.008-85',
    name: 'Larissa Caroline de Paula',
    contact: {
      email: 'larissacarolinedepaula_@etec.sp.gov.br',
      telephone: ['(16) 3701-4629'],
      cellphone: ['(16) 99474-4795'],
    }
  },
  {
    cpf: '649.560.678-87',
    name: 'Antonio Kauê Lucca da Luz',
    contact: {
      email: 'antoniokaueluccadaluz_@sinelcom.com.br',
      telephone: ['(12) 2612-6444'],
      cellphone: ['(12) 98430-2458', '(12) 98589-1526'],
    }
  },
  {
    cpf: '003.786.338-05',
    name: 'Milena Aurora Márcia Fogaça',
    contact: {
      email: 'milenaauroramarciafogaca-82@graffiti.net',
      telephone: ['(14) 2795-9980'],
      cellphone: ['(14) 98991-7496'],
    }
  },
  {
    cnpj: '99.732.888/0001-14',
    stateRegistration: '99.732.888/0001-14',
    name: 'Alessandra e Pedro Vidros Ltda',
    contact: {
      site: null,
      email: 'ouvidoria@alessandraepedrovidrosltda.com.br',
      telephone: ['(19) 2747-8372'],
      cellphone: ['(19) 99623-9418'],
    }
  },
  {
    cnpj: '36.745.474/0001-00',
    stateRegistration: '641.997.789.144',
    name: 'Luciana e Thiago Gráfica ME',
    contact: {
      site: 'www.lucianaethiagograficame.com.br',
      email: 'treinamento@lucianaethiagograficame.com.br',
      telephone: ['(11) 2657-5882'],
      cellphone: ['(11) 98299-6434'],
    }
  }
]

export const adresses = [
  { 
    cep: '05763-440', 
    street: 'Rua João Rodrigues de Moura', 
    number: '321',  
    neighborhood: 'Jardim Piracuama',
    state: 'SP', 
    city: 'São Paulo'
  },
  { 
    cep: '05628-040',  
    street: 'Rua Doutor João José de Carvalho', 
    number: '12',  
    neighborhood: 'Vila Sônia',
    state: 'SP', 
    city: 'São Paulo'
  },
  { 
    cep: '08030-170',  
    street: 'Rua Guarupu', 
    number: '987',  
    neighborhood: 'Vila Curuçá',
    state: 'SP', 
    city: 'São Paulo'
  },
  { 
    cep: '04457-120',  
    street: 'Rua Luís Bueno de Miranda', 
    number: '12387',  
    neighborhood: 'Jardim Palmares (Zona Sul)',
    state: 'SP', 
    city: 'São Paulo'
  },
]

export const drivers = [
  {
    name: 'Theo Thomas Leonardo das Neves',
    cpf: '337.117.348-80',
    rg: '20.498.441-5',
    birthday: '23/06/1972',
    adress: { 
      cep: '05396-010', 
      street: 'Rua Antenor de Freitas', 
      number: '393',  
      neighborhood: 'Parque dos Príncipes',
      state: 'SP', 
      city: 'São Paulo'
    },
    contact: {
      telephone: ['(11) 2644-3809'],
      cellphone: ['(11) 99141-9747'],
      email: null
    }
  },
  {
    name: 'João Diogo da Rosa',
    cpf: '345.402.988-01',
    rg: '24.495.594-3',
    birthday: '25/03/1972',
    adress: { 
      cep: '19025-460', 
      street: 'Rua Christiano Kliemchem', 
      number: '423',  
      neighborhood: 'Parque São Matheus',
      state: 'SP', 
      city: 'São Paulo'
    },
    contact: {
      telephone: ['(18) 2590-3843'],
      cellphone: ['(18) 98788-1759'],
      email: 'joaodiogodarosa-95@willianareiaepedra.com.br'
    }
  },
  {
    name: 'Thiago Julio Isaac Martins',
    cpf: '842.253.568-84',
    rg: '11.520.885-9',
    birthday: '26/02/1972',
    adress: { 
      cep: '19804-320', 
      street: 'Rua Caxambu', 
      number: '938',  
      neighborhood: 'Vila Carvalho',
      state: 'SP', 
      city: 'Assis'
    },
    contact: {
      telephone: ['(18) 2590-3843'],
      cellphone: ['(18) 98788-1759'],
      email: 'thiagojulioisaacmartins..thiagojulioisaacmartins@protenisbarra.com.br'
    }
  }
]

export const trucks = [
  {
    brand: 'Ford',
    model: 'F-1000 XLT 4x4 Diesel Turbo',
    year: {
      manufacture: 1996,
      model: 1996
    },
    renavam: 36783908793,
    plate: 'FKF-7151',
    equipament: {
      id: 1,
      name: 'Poliguindaste',
    } 
  },
  {
    brand: 'Ford',
    model: 'Ranger XLT 3.0 PSE 163cv 4x4 CD TB Dies.',
    year: {
      manufacture: 2005,
      model: 2005
    },
    renavam: 70007064510,
    plate: 'DAD-8320',
     equipament: {
      id: 1,
      name: 'Poliguindaste',
    } 
  },
  {
    brand: 'Ford',
    model: 'F-250 XLT 3.9 4x4 CD TB Diesel',
    year: {
      manufacture: 2007,
      model: 2007
    },
    renavam: 23756275112,
    plate: 'FWY-0640',
     equipament: {
      id: 1,
      name: 'Poliguindaste',
    } 
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

export const services = [
  'Troca',
  'Retirada',
  'Coloca'
]