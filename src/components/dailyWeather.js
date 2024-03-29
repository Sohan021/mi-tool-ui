import moment from "moment";
import React from "react";
import { imageUrl } from "./hourlyWeather";

const celsiusToFahrenheit = (celsius) => {
  var fahrenheit = (celsius * 9) / 5 + 32;
  return fahrenheit.toFixed(2);
};

const DailyWeather = ({
  date,
  maxTemp,
  minTemp,
  isCelcius,
  condition,
  isPast,
  temperature,
}) => {
  var formattedDate = moment(date).format("ll");
  return (
    <>
      <div className="daily-period-weather rounded">
        {isPast ? (
          <div className="mt-2 daily-period-weather-time">
            {formattedDate}
            <div>&nbsp;</div>
            <div className="daily-period-weather-temp">
              <span className="daily-period-weather-range-text">
                Temp:&nbsp;
              </span>
              <p className="daily-period-weather-range-temp">
                {isCelcius ? temperature : celsiusToFahrenheit(temperature)}
                <span>&#176;</span>
              </p>
              {isCelcius ? "C" : "F"}
            </div>
          </div>
        ) : (
          <div className="mt-2 daily-period-weather-time">
            {formattedDate}
            <div>&nbsp;</div>
            <div className="daily-period-weather-temp">
              <span className="daily-period-weather-range-text">
                High:&nbsp;
              </span>
              <p className="daily-period-weather-range-temp">
                {isCelcius ? maxTemp : celsiusToFahrenheit(maxTemp)}
                <span>&#176;</span>
              </p>
              {isCelcius ? "C" : "F"}
            </div>
            <div className="daily-period-weather-temp">
              <span className="daily-period-weather-range-text">
                Low:&nbsp;
              </span>
              <p className="daily-period-weather-range-temp">
                {isCelcius ? minTemp : celsiusToFahrenheit(minTemp)}
                <span>&#176;</span>
              </p>
              {isCelcius ? "C" : "F"}
            </div>
          </div>
        )}
        <div className="daily-forcast-condition">
          {condition.main}
          <img
            id="wicon"
            src={imageUrl + condition.icon + "@2x.png"}
            width={60}
            height={60}
            alt="Weather icon"
          />
        </div>
      </div>
    </>
  );
};

export default DailyWeather;
