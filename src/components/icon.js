import React, { useRef } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const IconButton = ({ icon, tooltip, handleClick }) => {
  const buttonRef = useRef(null);

  return (
    <OverlayTrigger
      delay={{ hide: 450, show: 300 }}
      trigger={["hover", "focus"]}
      rootClose={true}
      rootCloseEvent="click"
      overlay={(props) => <Tooltip {...props}>{tooltip}</Tooltip>}
      placement="top"
    >
      <div className="btn" onClick={handleClick} ref={buttonRef}>
        {icon}
      </div>
    </OverlayTrigger>
  );
};

export default IconButton;
