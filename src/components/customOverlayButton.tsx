import React, { useRef, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Overlay from "react-bootstrap/esm/Overlay";
import { Placement } from "react-bootstrap/esm/types";

interface ICustomDatePickerProps {
  Title: string;
  Placement: Placement;
  Content: React.JSX.Element;
  Show: boolean;
  HandleClick: () => void;
}

const CustomOverlayButton: React.FC<ICustomDatePickerProps> = ({ Title, Placement, Content, Show, HandleClick }) => {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = (event: any) => {
    HandleClick();
    setTarget(event.target);
  };

  return (
    <div ref={ref}>
      <Button variant="light" onClick={handleClick} className="date-picker-button">
        {Title}
      </Button>
      <Overlay show={Show} target={target} placement={Placement} container={ref} containerPadding={100}>
        {Content}
      </Overlay>
    </div>
  );
};

export default CustomOverlayButton;
