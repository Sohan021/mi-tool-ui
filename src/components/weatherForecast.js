import React, { useEffect, useState } from "react";
import {
  faCircleInfo,
  faCloudSunRain,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from "react-bootstrap/Dropdown";
import Image from "react-bootstrap/Image";
import { HourlyWeather, imageUrl } from "./hourlyWeather";
import DailyWeather from "./dailyWeather";
import IconButton from "./icon";
import { format, startOfToday } from "date-fns";
import { DayPicker } from "react-day-picker";
import CustomOverlayButton from "./customOverlayButton";
import axios from "axios";

const locationCodes = [
  { id: 0, name: "vancouver", code: "cabc0778" },
  { id: 1, name: "calgary", code: "caab0403" },
  { id: 2, name: "edmonton", code: "caab0780" },
  { id: 3, name: "regina", code: "cask0306" },
  { id: 4, name: "winnipeg", code: "camb0204" },
  { id: 5, name: "toronto", code: "caon0416" },
  { id: 6, name: "ottawa", code: "caon0343" },
  { id: 7, name: "montreal", code: "caqc0438" },
  { id: 8, name: "st. john", code: "canb0506" },
];

const WeatherForecast = () => {
  const [tempData, setTempList] = useState([]);

  useEffect(() => {
    getWeatherData(0, isHourly, false, formattedSelectedDate);
  }, []);

  const getWeatherData = (cityId, isHourly, isPastData, dateTime) => {
    axios
      .get(
        `https://um97nbuab2.execute-api.ca-central-1.amazonaws.com/Prod/api/weather/canada?Location=${cityId}&isHourly=${isHourly}&isPastData=${isPastData}&date=${dateTime}`
      )
      .then((res) => {
        setTempList(res.data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  };

  const [chosenCity, setChosenCity] = useState("vancouver");
  const [isCelcius, setIsCelcius] = useState(true);
  const [isHourly, setIsHourly] = useState(false);
  const [selectedDate, setSelectedDate] = useState(startOfToday());
  const [showDateWindow, setShowDateWindow] = useState(false);
  const [gasService, setGasService] = useState();
  const formattedSelectedDate = selectedDate
    ? format(selectedDate, "MM/dd/yyyy")
    : format(startOfToday(), "MM/dd/yyyy");
  const [isPastData, setIsPastData] = useState(false);

  const today = new Date();
  const disabledDates = { after: today };

  const onDayClickHandler = () => {
    setShowDateWindow(false);
  };

  const onDayCahangeHandler = (date) => {
    setSelectedDate(date);
    const currentSelected = date
      ? format(date, "MM/dd/yyyy")
      : format(startOfToday(), "MM/dd/yyyy");
    var isPastData;
    if (currentSelected !== format(startOfToday(), "MM/dd/yyyy")) {
      isPastData = true;
      setIsPastData(true);
    } else {
      isPastData = false;
      setIsPastData(false);
    }
    onSelectHandler(chosenCity, isPastData, format(date, "MM/dd/yyyy"));
    console.log("Check dates", date, format(startOfToday(), "MM/dd/yyyy"));
  };

  const popover = (
    <div style={{ zIndex: 100, backgroundColor: "white" }}>
      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={onDayCahangeHandler}
        onDayClick={onDayClickHandler}
        disabled={disabledDates}
      />
    </div>
  );

  const onSelectHandler = (selectedCity, isPastData, date) => {
    if (selectedCity == "vancouver") {
      setChosenCity(selectedCity);

      getWeatherData(
        0,
        isHourly,
        isPastData,
        date ? date : formattedSelectedDate
      );
    }
    if (selectedCity == "calgary") {
      setChosenCity(selectedCity);

      getWeatherData(
        1,
        isHourly,
        isPastData,
        date ? date : formattedSelectedDate
      );
    }
    if (selectedCity == "edmonton") {
      setChosenCity(selectedCity);

      getWeatherData(
        2,
        isHourly,
        isPastData,
        date ? date : formattedSelectedDate
      );
    }
    if (selectedCity == "regina") {
      setChosenCity(selectedCity);

      getWeatherData(
        3,
        isHourly,
        isPastData,
        date ? date : formattedSelectedDate
      );
    }
    if (selectedCity == "winnipeg") {
      setChosenCity(selectedCity);

      getWeatherData(
        4,
        isHourly,
        isPastData,
        date ? date : formattedSelectedDate
      );
    }
    if (selectedCity == "toronto") {
      setChosenCity(selectedCity);

      getWeatherData(
        5,
        isHourly,
        isPastData,
        date ? date : formattedSelectedDate
      );
    }
    if (selectedCity == "ottawa") {
      setChosenCity(selectedCity);

      getWeatherData(
        6,
        isHourly,
        isPastData,
        date ? date : formattedSelectedDate
      );
    }
    if (selectedCity == "montreal") {
      setChosenCity(selectedCity);

      getWeatherData(
        7,
        isHourly,
        isPastData,
        date ? date : formattedSelectedDate
      );
    }
    if (selectedCity == "st. john") {
      setChosenCity(selectedCity);

      getWeatherData(
        8,
        isHourly,
        isPastData,
        date ? date : formattedSelectedDate
      );
    }
  };

  const celsiusToFahrenheit = (celsius) => {
    var fahrenheit = (celsius * 9) / 5 + 32;
    return fahrenheit.toFixed(2);
  };

  const onSelectHistoryData = () => {
    getWeatherData(
      locationCodes.filter((_) => _.name == chosenCity)[0].id,
      isHourly,
      isPastData,
      formattedSelectedDate
    );
  };

  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <a className="navbar-brand" href="#">
            <span className="icon">
              <FontAwesomeIcon icon={faCloudSunRain} />
            </span>
            <span className="text-wrapper">
              Weather Update
              <IconButton
                tooltip="demo"
                icon={<FontAwesomeIcon icon={faCircleInfo} />}
              />
            </span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse position-absolute  end-0"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                {
                  <CustomOverlayButton
                    Title={formattedSelectedDate}
                    Placement="bottom"
                    Content={popover}
                    Show={showDateWindow}
                    HandleClick={() => setShowDateWindow(!showDateWindow)}
                  />
                }
              </li>
            </ul>
          </div>
        </nav>
        <div className="row">
          <div className="col-12 text-center">
            <Dropdown
              onSelect={(e) => onSelectHandler(e, isPastData, null)}
              className="table-dropdown"
            >
              <Dropdown.Toggle
                variant="light"
                id="city-dropdown"
                className="table-drop-button"
              >
                <span className="text-wrapper-2">{chosenCity}</span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="table-drop-menu">
                {locationCodes.map((loc) => (
                  <Dropdown.Item key={loc.id} eventKey={loc.name} href="#">
                    {loc.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className="row">
          {isHourly ? (
            <div className="col-12 daily-weather text-center">
              <span className="weather-date">Now</span>
              <div className="daily-temp-space">
                <span className="">
                  <Image
                    id="wicon"
                    src={
                      imageUrl +
                      tempData?.temperatureDatas
                        ?.filter((_) => _.hourIndex == 1)
                        ?.map((item) => {
                          return item.weather.icon;
                        }) +
                      "@2x.png"
                    }
                    width={100}
                    height={100}
                    alt="Weather icon"
                  />
                </span>
                <div className="daily-temp-data">
                  <div className="temperature-container">
                    <span className="temperature-range-text">Temp:&nbsp;</span>
                    <span className="temperature-value">
                      {tempData?.temperatureDatas
                        ?.filter((_) => _.hourIndex == 1)
                        ?.map((item) => {
                          return (
                            <>
                              {isCelcius
                                ? item.temperature
                                : celsiusToFahrenheit(item.temperature)}
                            </>
                          );
                        })}
                    </span>
                    <span className="temperature-unit">
                      <span>&#176;</span>
                      {isCelcius ? "C" : "F"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="col-12 daily-weather text-center">
              <span className="weather-date">
                {isPastData ? formattedSelectedDate : "Today"}
              </span>
              <div className="daily-temp-space">
                <span className="">
                  <Image
                    id="wicon"
                    src={
                      imageUrl +
                      tempData?.temperatureDatas
                        ?.filter((_) => _.dayIndex == 1)
                        ?.map((item) => {
                          return item.weather.icon;
                        }) +
                      "@2x.png"
                    }
                    width={100}
                    height={100}
                    alt="Weather icon"
                  />
                </span>
                <div className="daily-temp-data">
                  {isPastData ? (
                    <>
                      <div className="temperature-container">
                        <span className="temperature-range-text">
                          Temp:&nbsp;
                        </span>
                        <span className="temperature-value">
                          {tempData?.temperatureDatas
                            ?.filter((_) => _.dayIndex === 1)
                            .map((item) => {
                              return (
                                <>
                                  {isCelcius
                                    ? item.temperature
                                    : celsiusToFahrenheit(item.temperature)}
                                </>
                              );
                            })}
                        </span>
                        <span className="temperature-unit">
                          <span>&#176;</span>
                          {isCelcius ? "C" : "F"}
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="temperature-container">
                        <span className="temperature-range-text">
                          High:&nbsp;
                        </span>
                        <span className="temperature-value">
                          {tempData?.temperatureDatas
                            ?.filter((_) => _.dayIndex == 1)
                            .map((item) => {
                              return (
                                <>
                                  {isCelcius
                                    ? item.max
                                    : celsiusToFahrenheit(item.max)}
                                </>
                              );
                            })}
                        </span>
                        <span className="temperature-unit">
                          <span>&#176;</span>
                          {isCelcius ? "C" : "F"}
                        </span>
                      </div>
                      <div className="temperature-container">
                        <span className="temperature-range-text">
                          Low:&nbsp;
                        </span>
                        <span className="temperature-value">
                          {tempData?.temperatureDatas
                            ?.filter((_) => _.dayIndex == 1)
                            .map((item) => {
                              return (
                                <>
                                  {isCelcius
                                    ? item.min
                                    : celsiusToFahrenheit(item.min)}
                                </>
                              );
                            })}
                        </span>
                        <span className="temperature-unit">
                          <span>&#176;</span>
                          {isCelcius ? "C" : "F"}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="row ">
          <div
            className={
              isHourly ? "hourly-periodic-updates" : "daily-periodic-updates"
            }
          >
            {isPastData
              ? tempData?.temperatureDatas
                  ?.filter((_) => _.dayIndex != 1)
                  ?.map((item) => {
                    return (
                      <DailyWeather
                        key={item}
                        isPast={isPastData}
                        temperature={item.temperature}
                        date={item.dateTime}
                        maxTemp={item.max}
                        minTemp={item.min}
                        isCelcius={isCelcius}
                        condition={item.weather}
                      />
                    );
                  })
              : tempData?.temperatureDatas
                  ?.filter((_) => _.dayIndex != 1)
                  ?.map((item) => {
                    return (
                      <DailyWeather
                        key={item}
                        isPast={isPastData}
                        temperature={item.temperature}
                        date={item.dateTime}
                        maxTemp={item.max}
                        minTemp={item.min}
                        isCelcius={isCelcius}
                        condition={item.weather}
                      />
                    );
                  })}
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherForecast;
