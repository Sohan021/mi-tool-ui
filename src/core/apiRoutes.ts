const baseUrl = process.env.API_BASE_URL;

export class ApiRoutes {
  static GetFxRates = `${baseUrl}/FxRate`;
  static GetEnergyRegulatory = `${baseUrl}/EnergyRegulatory`;
}
