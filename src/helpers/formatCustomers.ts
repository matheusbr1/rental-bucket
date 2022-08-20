import { staticCEPMask, staticCNPJMask, staticCPFMask } from "components/FormikTextField/helpers/masks";
import { ICustomer } from "interfaces";

export function formatCustomer (customerApi: ICustomer): ICustomer {
  let data: ICustomer = {} as ICustomer

  data = {
    ...customerApi,
		CPF_CNPJ: (customerApi.person_type === "F" 
      ? staticCPFMask(customerApi.CPF_CNPJ)
      : staticCNPJMask(customerApi.CPF_CNPJ)) as string,
    adresses: customerApi?.adresses.map(address => ({
      ...address,
      CEP: staticCEPMask(address.CEP)
    })),
  }

  return data
}

export function formatCustomers (customersApi: ICustomer[]): ICustomer[] {
  return customersApi.map(customer => formatCustomer(customer))
}