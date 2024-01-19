interface City {
  id: number;
  name: string;
  code: string;
}

interface IFxRateData {
  title: string;
  rate: number;
  description: string;
  targetCurrency: string;
  rateType: string;
}

export interface IFxRatesUiData {
  title?: string;
  data?: IFxRateData[];
}

export interface IEnergyRegulatoryUiData {
  title?: string;
  data?: IEnergyRegulatoryData[];
}

export interface IEnergyRegulatoryData {
  title: string;
  updatedOn: string;
  summary: string;
}

export interface IEnergyRegulatoryApiResponse {
  data: {
    energyRegulatoryEntries: IEnergyRegulatoryData[];
  };
}

export type { City, IFxRateData };
