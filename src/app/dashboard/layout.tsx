"use client";

import "../../styles/styles.scss";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { IconDefinition, config } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SideNavBar } from "@/components/sideNavbar";
import TopNavbar from "@/components/topNavbar";
import { CloseButton, Offcanvas } from "react-bootstrap";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <html lang="en">
      <body className={inter.className}>
        <>
          <SideNavBar onClickHandler={handleShow} />
          <Offcanvas show={show} onHide={handleClose} className="sidebar-offcanvas">
            <Offcanvas.Header>
              <Offcanvas.Title className="sidebar-header-text">MiTool</Offcanvas.Title>
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
                    { title: "Natural Gas", icon: <FontAwesomeIcon icon={faFire} /> },
                    { title: "Oil", icon: <FontAwesomeIcon icon={faDroplet} /> },
                  ]}
                />
                <ListItem
                  text="Helpful Tools"
                  icon={faWrench}
                  subItems={[
                    { title: "Fx Rate", icon: <FontAwesomeIcon icon={faFire} /> },
                    { title: "Canada Energy Regulatory", icon: <FontAwesomeIcon icon={faFire} /> },
                    { title: "Pipeline Flow- TransCanada", icon: <FontAwesomeIcon icon={faFire} /> },
                    { title: "Weather Update", icon: <FontAwesomeIcon icon={faCloudSunRain} /> },
                  ]}
                />
              </ul>
            </Offcanvas.Body>
          </Offcanvas>
        </>
        <div className="custom-container">
          <TopNavbar />
          <div className="custom-content">{children}</div>
        </div>
      </body>
    </html>
  );
}

interface IconProps {
  icon: IconDefinition;
}

function Icon({ icon }: IconProps) {
  return <FontAwesomeIcon icon={icon} />;
}

interface IsubItem {
  title: string;
  icon: JSX.Element;
}
interface ListItemProps {
  text: string;
  icon: IconDefinition;
  subItems?: IsubItem[];
}

function ListItem({ text, icon, subItems }: ListItemProps) {
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
