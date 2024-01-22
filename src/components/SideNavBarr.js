import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolderTree,
  faGauge,
  faGear,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";

const SideNavBar = ({ onClickHandler }) => {
  return (
    <div className="side-navbar" onClick={onClickHandler}>
      <div className="text-wrapper">Mi</div>
      <FontAwesomeIcon icon={faGauge} className="gauge-instance" />
      <FontAwesomeIcon icon={faFolderTree} className="settings-icon" />
      <FontAwesomeIcon icon={faWrench} className="wrench-icon" />
    </div>
  );
};

export default SideNavBar;
