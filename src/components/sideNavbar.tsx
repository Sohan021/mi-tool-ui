import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderTree, faGauge, faGear, faWrench } from "@fortawesome/free-solid-svg-icons";

interface IsidebarProps {
  onClickHandler?: () => void;
}

export const SideNavBar: React.FC<IsidebarProps> = ({ onClickHandler }): JSX.Element => {
  return (
    <div className="side-navbar" onClick={onClickHandler}>
      <div className="text-wrapper">Mi</div>
      <FontAwesomeIcon icon={faGauge} className="gauge-instance" />
      <FontAwesomeIcon icon={faFolderTree} className="settings-icon" />
      <FontAwesomeIcon icon={faWrench} className="wrench-icon" />
    </div>
  );
};
