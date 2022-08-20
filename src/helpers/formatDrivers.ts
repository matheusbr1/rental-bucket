import { staticCEPMask, staticCPFMask } from "components/FormikTextField/helpers/masks";
import { IDriver } from "interfaces";

export function formatDriver (driverApi: IDriver): IDriver {
  let data: IDriver = {} as IDriver

  data = {
    ...driverApi,
    CPF: staticCPFMask(driverApi.CPF) as string,
  }

  if (driverApi?.address) {
    data.address = {
      ...driverApi?.address,
      CEP: staticCEPMask(driverApi.address?.CEP)
    }
  }

  return data
}

export function formatDrivers (driversApi: IDriver[]): IDriver[] {
  return driversApi.map(driver => formatDriver(driver))
}