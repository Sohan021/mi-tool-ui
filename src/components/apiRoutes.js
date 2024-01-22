const baseUrl = "https://um97nbuab2.execute-api.ca-central-1.amazonaws.com/Prod/api";

export class ApiRoutes {
  static GetFxRates = `${baseUrl}/FxRate`;
  static GetEnergyRegulatory = `${baseUrl}/EnergyRegulatory`;
}
