"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTempList } from "../store/reducers/weatherReducer";
import { faCircleInfo, faCloudSunRain } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from "react-bootstrap/Dropdown";
import Image from "next/image";
import { City } from "@/app/model/types";
import { HourlyWeather, imageUrl } from "./hourlyWeather";
import DailyWeather from "./dailyWeather";
import IconButton from "./icon";
import { GasDataApiResponseDto } from "@/app/model/gasDataModels";
import { format, startOfToday } from "date-fns";
import { DayPicker } from "react-day-picker";
import CustomOverlayButton from "./customOverlayButton";

const locationCodes: City[] = [
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
  const dispatch: any = useDispatch();

  const tempData = useSelector((state: any) => state.weather.tempList);
  useEffect(() => {
    dispatch(fetchTempList(0, isHourly, false, formattedSelectedDate));
  }, [dispatch]);

  const [chosenCity, setChosenCity] = useState<string>(locationCodes[0].name);
  const [isCelcius, setIsCelcius] = useState<boolean>(true);
  const [isHourly, setIsHourly] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(startOfToday());
  const [showDateWindow, setShowDateWindow] = useState<boolean>(false);
  const [gasService, setGasService] = useState<GasDataApiResponseDto>();
  const formattedSelectedDate = selectedDate ? format(selectedDate, "MM/dd/yyyy") : format(startOfToday(), "MM/dd/yyyy");
  const [isPastData, setIsPastData] = useState<boolean>(false);

  const today = new Date();
  const disabledDates = { after: today };

  const onDayClickHandler = () => {
    setShowDateWindow(false);
  };

  const onDayCahangeHandler = (date: any) => {
    setSelectedDate(date);
    const currentSelected = date ? format(date, "MM/dd/yyyy") : format(startOfToday(), "MM/dd/yyyy");
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

  const handleDateSelect = () => {};

  const celsiusToFahrenheit = (celsius: any) => {
    var fahrenheit = (celsius * 9) / 5 + 32;
    return fahrenheit.toFixed(2);
  };
  console.log("date ispast weatherData", selectedDate, isPastData, tempData);
  const onSelectHandler = (selectedCity: string | null, isPastData: boolean, date: string | null) => {
    if (selectedCity == "vancouver") {
      setChosenCity(selectedCity);
      dispatch(fetchTempList(0, isHourly, isPastData, date ? date : formattedSelectedDate));
    }
    if (selectedCity == "calgary") {
      setChosenCity(selectedCity);
      dispatch(fetchTempList(1, isHourly, isPastData, date ? date : formattedSelectedDate));
    }
    if (selectedCity == "edmonton") {
      setChosenCity(selectedCity);
      dispatch(fetchTempList(2, isHourly, isPastData, date ? date : formattedSelectedDate));
    }
    if (selectedCity == "regina") {
      setChosenCity(selectedCity);
      dispatch(fetchTempList(3, isHourly, isPastData, date ? date : formattedSelectedDate));
    }
    if (selectedCity == "winnipeg") {
      setChosenCity(selectedCity);
      dispatch(fetchTempList(4, isHourly, isPastData, date ? date : formattedSelectedDate));
    }
    if (selectedCity == "toronto") {
      setChosenCity(selectedCity);
      dispatch(fetchTempList(5, isHourly, isPastData, date ? date : formattedSelectedDate));
    }
    if (selectedCity == "ottawa") {
      setChosenCity(selectedCity);
      dispatch(fetchTempList(6, isHourly, isPastData, date ? date : formattedSelectedDate));
    }
    if (selectedCity == "montreal") {
      setChosenCity(selectedCity);
      dispatch(fetchTempList(7, isHourly, isPastData, date ? date : formattedSelectedDate));
    }
    if (selectedCity == "st. john") {
      setChosenCity(selectedCity);
      dispatch(fetchTempList(8, isHourly, isPastData, date ? date : formattedSelectedDate));
    }
  };

  const onSelectHistoryData = () => {
    dispatch(fetchTempList(locationCodes.filter((_: any) => _.name == chosenCity)[0].id, isHourly, isPastData, formattedSelectedDate));
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
              <IconButton tooltip="demo" icon={<FontAwesomeIcon icon={faCircleInfo} />} />
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
          <div className="collapse navbar-collapse position-absolute  end-0" id="navbarNav">
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
            <Dropdown onSelect={(e: any) => onSelectHandler(e, isPastData, null)} className="table-dropdown">
              <Dropdown.Toggle variant="light" id="city-dropdown" className="table-drop-button">
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
                        ?.filter((_: any) => _.hourIndex == 1)
                        ?.map((item: any) => {
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
                        ?.filter((_: any) => _.hourIndex == 1)
                        ?.map((item: any) => {
                          return <>{isCelcius ? item.temperature : celsiusToFahrenheit(item.temperature)}</>;
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
              <span className="weather-date">{isPastData ? formattedSelectedDate : "Today"}</span>
              <div className="daily-temp-space">
                <span className="">
                  <Image
                    id="wicon"
                    src={
                      imageUrl +
                      tempData?.temperatureDatas
                        ?.filter((_: any) => _.dayIndex == 1)
                        ?.map((item: any) => {
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
                        <span className="temperature-range-text">Temp:&nbsp;</span>
                        <span className="temperature-value">
                          {tempData?.temperatureDatas
                            ?.filter((_: any) => _.dayIndex === 1)
                            .map((item: any) => {
                              return <>{isCelcius ? item.temperature : celsiusToFahrenheit(item.temperature)}</>;
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
                        <span className="temperature-range-text">High:&nbsp;</span>
                        <span className="temperature-value">
                          {tempData?.temperatureDatas
                            ?.filter((_: any) => _.dayIndex == 1)
                            .map((item: any) => {
                              return <>{isCelcius ? item.max : celsiusToFahrenheit(item.max)}</>;
                            })}
                        </span>
                        <span className="temperature-unit">
                          <span>&#176;</span>
                          {isCelcius ? "C" : "F"}
                        </span>
                      </div>
                      <div className="temperature-container">
                        <span className="temperature-range-text">Low:&nbsp;</span>
                        <span className="temperature-value">
                          {tempData?.temperatureDatas
                            ?.filter((_: any) => _.dayIndex == 1)
                            .map((item: any) => {
                              return <>{isCelcius ? item.min : celsiusToFahrenheit(item.min)}</>;
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
          <div className={isHourly ? "hourly-periodic-updates" : "daily-periodic-updates"}>
            {isPastData
              ? tempData?.temperatureDatas
                  ?.filter((_: any) => _.dayIndex != 1)
                  ?.map((item: any) => {
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
                  ?.filter((_: any) => _.dayIndex != 1)
                  ?.map((item: any) => {
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

export interface WeatherCondition {
  id: any;
  main: any;
  description: any;
  icon: any;
}
