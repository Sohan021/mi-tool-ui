import MarketDataTable from "@/components/marketDataTable";
import { IEnergyRegulatoryApiResponse, IEnergyRegulatoryData, IEnergyRegulatoryUiData, IFxRateData, IFxRatesUiData } from "../model/types";
import { ApiRoutes } from "@/core/apiRoutes";
import { format } from "date-fns";
import EnergyRegulatoryMarketDataTable from "@/components/energyRegulatoryMarketDataTable";
import GasDataTable from "@/components/gasDataTable";
import WeatherForecast from "@/components/weatherForecast";

function filterFxRateData(jsonData: any): IFxRateData {
  const { title, rate, description, targetCurrency, rateType } = jsonData;
  return { title, rate, description, targetCurrency, rateType };
}

function filterEnergyRegulatoryData(jsonData: any): IEnergyRegulatoryData {
  const { title, summary, updatedOn } = jsonData;
  return {
    title,
    summary,
    updatedOn: format(new Date(updatedOn), "MM/dd/yyyy"),
  };
}

const DashboardPage = async () => {
  let fxRateData: IFxRatesUiData;
  let energyRegulatoryData: IEnergyRegulatoryUiData;
  try {
    const fxRateResponse = await fetch(ApiRoutes.GetFxRates, {
      cache: "no-cache",
    });
    const fxRateResponseData: IFxRatesUiData = await fxRateResponse.json();

    const energyRegulatoryResponse = await fetch(ApiRoutes.GetEnergyRegulatory, { cache: "no-cache" });
    const energyRegulatoryResponseData: IEnergyRegulatoryApiResponse = await energyRegulatoryResponse.json();

    fxRateData = {
      title: "Fx Rate",
      data: fxRateResponseData?.data?.map((data) => filterFxRateData(data)),
    };

    energyRegulatoryData = {
      title: "Canada Energy Regulatory",
      data: energyRegulatoryResponseData?.data?.energyRegulatoryEntries.map((data) => filterEnergyRegulatoryData(data)),
    };
  } catch (err) {
    fxRateData = { title: "Fx Rate" };
    energyRegulatoryData = { title: "Energy Regulatory" };
  }

  return (
    <>
      <div className="container-fluid dashboard-page">
        <div className="row mb-3">
          <div className="col-6 overflow-auto">
            <MarketDataTable title={fxRateData.title} data={fxRateData.data} />
          </div>
          <div className="col-6 overflow-auto">
            <EnergyRegulatoryMarketDataTable title={energyRegulatoryData?.title} data={energyRegulatoryData?.data} />
          </div>
        </div>
        <hr />
        <div className="row mb-3">
          <div className="col-6 overflow-auto">
            <GasDataTable />
          </div>
          <div className="col-6 overflow-auto">
            <WeatherForecast />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
