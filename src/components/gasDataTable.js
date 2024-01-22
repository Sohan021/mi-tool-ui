import React, { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { faCircleInfo, faFire } from "@fortawesome/free-solid-svg-icons";
import IconButton from "./icon";
import Dropdown from "react-bootstrap/Dropdown";
import CustomOverlayButton from "./customOverlayButton";
import { format, startOfToday } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function GasDataTable() {
  const [isSelectMainLineLinePack, setIsSelectMainLineLinePack] =
    useState(true);
  const [isSelectCapacityRemaining, setIsSelectCapacityRemaining] =
    useState(false);
  const [isSelectGasServices, setIsSelectGasServices] = useState(false);
  const [selectedGasService, setSelectedGasService] = useState(null);
  const [selectedDate, setSelectedDate] = useState();
  const [showDateWindow, setShowDateWindow] = useState(false);

  const [gasService, setGasService] = useState();
  const formattedSelectedDate = selectedDate
    ? format(selectedDate, "yyyy_MM_dd")
    : format(startOfToday(), "yyyy_MM_dd");

  const today = new Date();
  const disabledDates = { after: today };
  const popover = (
    <div style={{ zIndex: 100, backgroundColor: "white" }}>
      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        onDayClick={() => setShowDateWindow(false)}
        disabled={disabledDates}
      />
    </div>
  );

  useEffect(() => {
    const getWeatherData = (cityId) => {
      axios
        .get(
          `https://um97nbuab2.execute-api.ca-central-1.amazonaws.com/Prod/api/GasData?RequestedDate=${formattedSelectedDate}`
        )
        .then((res) => {
          setGasService(res.data.data);
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
    };
    getWeatherData(0);
  }, [formattedSelectedDate]);

  const handleChangeType = (typeId) => {
    if (typeId === 1) {
      setIsSelectMainLineLinePack(true);
      setIsSelectCapacityRemaining(false);
      setIsSelectGasServices(false);
    }
    if (typeId === 2) {
      setIsSelectMainLineLinePack(false);
      setIsSelectCapacityRemaining(true);
      setIsSelectGasServices(false);
    }
    if (typeId === 3) {
      setIsSelectMainLineLinePack(false);
      setIsSelectCapacityRemaining(false);
      setIsSelectGasServices(true);
    }
  };

  const keysofServices = useMemo(() => {
    return gasService?.gasServices?.fT_STS
      ? Object.keys(gasService?.gasServices?.fT_STS)
      : [];
  }, [gasService?.gasServices?.fT_STS]);

  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <a className="navbar-brand" href="#">
            <span className="icon">
              <FontAwesomeIcon icon={faFire} />
            </span>
            <span className="text-wrapper">
              {"Pipeline Flow - TransCanada"}
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
                <CustomOverlayButton
                  Title={
                    selectedDate ? format(selectedDate, "PP") : "Select Gas Day"
                  }
                  Placement="bottom"
                  Content={popover}
                  Show={showDateWindow}
                  HandleClick={() => setShowDateWindow(!showDateWindow)}
                />
              </li>
              <li className="nav-item">
                <Dropdown className="table-dropdown">
                  <Dropdown.Toggle
                    variant="light"
                    className="table-drop-button"
                  >
                    <span className="text-wrapper-2">Filter Service</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="table-drop-menu">
                    <Dropdown.Item onClick={() => setSelectedGasService(null)}>
                      All Services
                    </Dropdown.Item>
                    {keysofServices.length > 0 &&
                      keysofServices.map((key) => (
                        <Dropdown.Item
                          key={key}
                          onClick={() => setSelectedGasService(key)}
                        >
                          {gasService?.gasServices?.serviceTitle
                            ? gasService?.gasServices?.serviceTitle[key]
                            : ""}
                        </Dropdown.Item>
                      ))}
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      {isSelectMainLineLinePack && (
        <div className="market-data-table">
          <div>
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>Services</th>
                  <th className="text-center">FT/STS</th>
                  <th className="text-center">FTD</th>
                  <th className="text-center">IT/STS-O/PAL/LBA</th>
                </tr>
              </thead>
              <tbody>
                {keysofServices.length > 0 &&
                  keysofServices
                    .filter((serviceKey) =>
                      selectedGasService === null
                        ? true
                        : selectedGasService === serviceKey
                    )
                    .map((key) => (
                      <tr key={key}>
                        <td className="table-main-text">
                          {gasService?.gasServices?.serviceTitle
                            ? gasService?.gasServices?.serviceTitle[key]
                            : ""}
                        </td>
                        <td className="text-center">
                          {gasService?.gasServices?.fT_STS
                            ? gasService?.gasServices?.fT_STS[key]
                            : ""}
                        </td>
                        <td className="text-center">
                          {gasService?.gasServices?.ftd
                            ? gasService?.gasServices?.ftd[key]
                            : "b"}
                        </td>
                        <td className="text-center">
                          {gasService?.gasServices?.iT_STSO_PAL_LBA
                            ? gasService?.gasServices?.iT_STSO_PAL_LBA[key]
                            : ""}
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
