import { IWork } from "interfaces"

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