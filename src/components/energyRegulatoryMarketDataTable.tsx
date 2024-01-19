"use client";

import { faCircleInfo, faFire } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useMemo, useRef } from "react";
import { IFxRatesUiData, IEnergyRegulatoryUiData, IEnergyRegulatoryData } from "@/app/model/types";
import { Dropdown } from "react-bootstrap";
import _ from "lodash";
import IconButton from "./icon";

const markets = ["Gas Market", "Oil Market", "Power Market"];
const today = new Date();
const date = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();

const EnergyRegulatoryMarketDataTable = ({ title, data }: IEnergyRegulatoryUiData) => {
  const tableRef = useRef<HTMLTableElement>(null);

  const columns = useMemo(() => {
    return data && data.length > 0 ? Object?.keys(data[0]).map((key) => key as keyof IEnergyRegulatoryData) : [];
  }, [data]);

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
                <Dropdown className="table-dropdown">
                  <Dropdown.Toggle variant="light" className="table-drop-button">
                    <span className="text-wrapper-2">Select Commodity</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="table-drop-menu">
                    <Dropdown.Item key={"gas"}>Natural Gas</Dropdown.Item>
                    <Dropdown.Item key={"lng"}>LNG</Dropdown.Item>
                    <Dropdown.Item key={"oil"}>Oil</Dropdown.Item>
                    <Dropdown.Item key={"power"}>Power</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
              {/*  <li className="nav-item">
                <a className="nav-link active">
                  <span className=" nav-link  ">
                    <span className="text-wrapper-2">
                      <div className="vr"></div>
                    </span>
                  </span>
                </a>
              </li> */}
              <li className="nav-item">
                <Dropdown className="table-dropdown">
                  <Dropdown.Toggle variant="light" className="table-drop-button">
                    <span className="text-wrapper-2">Select Agency</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="table-drop-menu">
                    <Dropdown.Item>Canada Energy Regulatory</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      {data && data.length > 0 ? (
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
              {data.map((row, rowIndex) => {
                return (
                  <tr key={rowIndex}>
                    {columns.map((column, columnIndex) =>
                      columnIndex === 0 ? (
                        <td key={columnIndex} className="table-main-text">
                          {row[column]}
                        </td>
                      ) : (
                        <td key={columnIndex} className="">
                          {row[column]}
                        </td>
                      )
                    )}
                  </tr>
                );
              })}
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

export default EnergyRegulatoryMarketDataTable;
