import React, { useEffect, useState } from "react";
import MarketDataTable from "./marketDataTable";
import EnergyRegulatoryMarketDataTable from "./energyRegulatoryMarketDataTable";
import GasDataTable from "./gasDataTable";
import WeatherForecast from "./weatherForecast";
import { ApiRoutes } from "../components/apiRoutes";
import { format } from "date-fns";

function filterFxRateData(jsonData) {
  const { title, rate, description, targetCurrency, rateType } = jsonData;
  return { title, rate, description, targetCurrency, rateType };
}

function filterEnergyRegulatoryData(jsonData) {
  const { title, summary, updatedOn } = jsonData;
  return {
    title,
    summary,
    updatedOn: format(new Date(updatedOn), "MM/dd/yyyy"),
  };
}

const DashboardPage = () => {
  const [fxRateData, setFxRateData] = useState({ title: "Fx Rate" });
  const [energyRegulatoryData, setEnergyRegulatoryData] = useState({
    title: "Energy Regulatory",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fxRateResponse = await fetch(ApiRoutes.GetFxRates, {
          cache: "no-cache",
        });
        const fxRateResponseData = await fxRateResponse.json();

        const energyRegulatoryResponse = await fetch(
          ApiRoutes.GetEnergyRegulatory,
          { cache: "no-cache" }
        );
        const energyRegulatoryResponseData =
          await energyRegulatoryResponse.json();

        setFxRateData({
          title: "Fx Rate",
          data: fxRateResponseData?.data?.map((data) => filterFxRateData(data)),
        });

        setEnergyRegulatoryData({
          title: "Canada Energy Regulatory",
          data: energyRegulatoryResponseData?.data?.energyRegulatoryEntries.map(
            (data) => filterEnergyRegulatoryData(data)
          ),
        });
      } catch (err) {
        setFxRateData({ title: "Fx Rate" });
        setEnergyRegulatoryData({ title: "Energy Regulatory" });
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="container-fluid dashboard-page">
        <div className="row mb-3">
          <div className="col-6 overflow-auto">
            <MarketDataTable title={fxRateData.title} data={fxRateData.data} />
          </div>
          <div className="col-6 overflow-auto">
            <EnergyRegulatoryMarketDataTable
              title={energyRegulatoryData.title}
              data={energyRegulatoryData.data}
            />
          </div>
        </div>
        <hr />
        <div className="row mb-3">
          <div className="col-6 overflow-auto">
            <GasDataTable />
          </div>
          <div className="col-6 overflow-auto">{<WeatherForecast />}</div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
