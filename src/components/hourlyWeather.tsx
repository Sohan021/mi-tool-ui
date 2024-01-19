"use client";

import moment from "moment";
import React from "react";
import { WeatherCondition } from "./weatherForecast";
import Image from "next/image";

interface IProps {
  temp: any;
  isCelcius: boolean;
  date: any;
  condition: WeatherCondition;
}
const celsiusToFahrenheit = (celsius: any) => {
  var fahrenheit = (celsius * 9) / 5 + 32;
  return fahrenheit.toFixed(2);
};

export const imageUrl = "https://openweathermap.org/img/wn/";

export const HourlyWeather: React.FC<IProps> = ({ date, temp, isCelcius, condition }) => {
  var formattedDate = moment(date).format("LT");
  return (
    <div className="hourly-period-weather rounded">
      <div className="mt-2 hourly-period-weather-time">
        {formattedDate}
        <div>&nbsp;</div>
        <div className="hourly-period-weather-temp">
          <span className="hourly-period-weather-range-text">Temp:&nbsp;</span>
          <p className="hourly-period-weather-range-temp">
            {isCelcius ? temp : celsiusToFahrenheit(temp)}
            <span>&#176;</span>
          </p>
          {isCelcius ? "C" : "F"}
        </div>
      </div>
      <div className="hourly-forcast-condition">
        {condition.main}
        <Image id="wicon" src={imageUrl + condition.icon + "@2x.png"} width={60} height={60} alt="Weather icon" />
      </div>
    </div>
  );
};
