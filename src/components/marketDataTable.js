import React, { useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faFire } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "react-bootstrap";
import _ from "lodash";
import IconButton from "./icon";

const today = new Date();
const date =
  today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();

const MarketDataTable = ({ title, data }) => {
  const [isSelectedAll, setIsSelectedAll] = useState(true);
  const [chosenCurrency, setChosenCurrency] = useState("");
  const tableRef = useRef(null);

  const onCurrencySelectHandler = (selectedCurrency) => {
    if (selectedCurrency === "SELECT ALL") setIsSelectedAll(true);
    else setIsSelectedAll(false);
    if (selectedCurrency) setChosenCurrency(selectedCurrency);
  };

  const columns = useMemo(() => {
    return data && data.length > 0 ? Object.keys(data[0]) : [];
  }, [data]);

  const targetCurrencyList = _.uniq(_.map(data, "targetCurrency"));
  const filteredData = isSelectedAll
    ? data
    : _.filter(data, ["targetCurrency", chosenCurrency]);

  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <a className="navbar-brand" href="#">
            <span className="icon">
              <FontAwesomeIcon icon={faFire} />
            </span>
            <span className="text-wrapper">
              {title}

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
                <a className="nav-link active" aria-current="page">
                  <span className=" nav-link  ">
                    <span className="text-wrapper-2">{date}</span>
                  </span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active">
                  <span className=" nav-link  ">
                    <span className="text-wrapper-2">
                      <div className="vr"></div>
                    </span>
                  </span>
                </a>
              </li>
              <li className="nav-item">
                <Dropdown
                  onSelect={onCurrencySelectHandler}
                  className="table-dropdown"
                  align={"end"}
                >
                  <Dropdown.Toggle
                    variant="light"
                    className="table-drop-button"
                  >
                    <span className="text-wrapper-2">
                      {isSelectedAll ? "ALL" : chosenCurrency}
                    </span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    className="table-drop-menu"
                    flip={true}
                    align={"end"}
                  >
                    <Dropdown.Item key={"SELECT ALL"} eventKey={"SELECT ALL"}>
                      SELECT ALL
                    </Dropdown.Item>

                    {targetCurrencyList.map((targetCur) => (
                      <Dropdown.Item key={targetCur} eventKey={targetCur}>
                        {targetCur}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      {filteredData && filteredData.length > 0 ? (
        <div className="table-responsive market-data-table">
          <table className="table table-bordered table-hover" ref={tableRef}>
            <thead>
              <tr>
                {columns.map((column, columnIndex) => (
                  <th key={columnIndex} className="text-center">
                    {column.toUpperCase()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((column, columnIndex) => (
                    <td
                      key={columnIndex}
                      className={`text-center ${
                        columnIndex === 0 ? "table-main-text" : ""
                      }`}
                    >
                      {row[column]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <center>
          <p>No Data Available. </p>
        </center>
      )}
    </>
  );
};

export default MarketDataTable;
