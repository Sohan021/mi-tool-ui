import React, { useState } from "react";
import SideNavBar from "./SideNavBarr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { IconDefinition, config } from "@fortawesome/fontawesome-svg-core";
import { CloseButton, Offcanvas } from "react-bootstrap";
import TopNavbar from "./topNavbar";
import "./styles.scss";
import DashboardPage from "./DashboardPage";
import {
  faBolt,
  faChevronDown,
  faChevronUp,
  faCloudSunRain,
  faCube,
  faDroplet,
  faFire,
  faFolderTree,
  faGauge,
  faHome,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";
const Dashboard = () => {
  config.autoAddCss = false;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <SideNavBar onClickHandler={handleShow} />
      <Offcanvas show={show} onHide={handleClose} className="sidebar-offcanvas">
        <Offcanvas.Header>
          <Offcanvas.Title className="sidebar-header-text">
            MiTool
          </Offcanvas.Title>
          <CloseButton onClick={handleClose} variant="white" />
        </Offcanvas.Header>
        <Offcanvas.Body className="canvas-body">
          <ul className="custom-list">
            <ListItem text="Dashboard" icon={faGauge} />
            <ListItem
              text="Commodities"
              icon={faFolderTree}
              subItems={[
                { title: "Power", icon: <FontAwesomeIcon icon={faBolt} /> },
                {
                  title: "Natural Gas",
                  icon: <FontAwesomeIcon icon={faFire} />,
                },
                { title: "Oil", icon: <FontAwesomeIcon icon={faDroplet} /> },
              ]}
            />
            <ListItem
              text="Helpful Tools"
              icon={faWrench}
              subItems={[
                { title: "Fx Rate", icon: <FontAwesomeIcon icon={faFire} /> },
                {
                  title: "Canada Energy Regulatory",
                  icon: <FontAwesomeIcon icon={faFire} />,
                },
                {
                  title: "Pipeline Flow- TransCanada",
                  icon: <FontAwesomeIcon icon={faFire} />,
                },
                {
                  title: "Weather Update",
                  icon: <FontAwesomeIcon icon={faCloudSunRain} />,
                },
              ]}
            />
          </ul>
        </Offcanvas.Body>
      </Offcanvas>

      <div className="custom-container">
        <TopNavbar />
        <DashboardPage />
      </div>
    </>
  );
};

function ListItem({ text, icon, subItems }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <li>
      <div className="list-item-header" onClick={toggleExpand}>
        <div>
          <Icon icon={icon} />
          <span>{text}</span>
        </div>
        {subItems && subItems.length > 0 && (
          <button className="expand-button">
            <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} />
          </button>
        )}
      </div>
      {isExpanded && subItems && subItems.length > 0 && (
        <ul className="subitem-list">
          {subItems.map((subItem, index) => (
            <li key={index}>
              <span>{subItem.icon}</span>
              <span className="subitem-text">{subItem.title}</span>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

function Icon({ icon }) {
  return <FontAwesomeIcon icon={icon} />;
}

export default Dashboard;
