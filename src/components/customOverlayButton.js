import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import { Placement } from "react-bootstrap/types";

const CustomOverlayButton = ({
  Title,
  Placement,
  Content,
  Show,
  HandleClick,
}) => {
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = (event) => {
    HandleClick();
    setTarget(event.target);
  };

  return (
    <div ref={ref}>
      <Button
        variant="light"
        onClick={handleClick}
        className="date-picker-button"
      >
        {Title}
      </Button>
      <Overlay
        show={Show}
        target={target}
        placement={Placement}
        container={ref}
        containerPadding={100}
      >
        {Content}
      </Overlay>
    </div>
  );
};

export default CustomOverlayButton;
