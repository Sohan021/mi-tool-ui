"use client";

import { useState, useRef, memo } from "react";
import { Overlay, Popover, Form } from "react-bootstrap";
import IconButton from "./icon";

interface Props {
  icon: JSX.Element;
  tooltip: string;
  contents: string[];
}

const PreferenceSettingsButtonComponent = ({
  icon,
  tooltip,
  contents,
}: Props) => {
  const [show, setShow] = useState(false);
  const ref = useRef(null);

  const handleClick = (event: any) => {
    setShow(!show);
  };

  return (
    <div ref={ref}>
      <IconButton tooltip={tooltip} icon={icon} handleClick={handleClick} />
      <Overlay
        show={show}
        target={ref}
        placement="bottom"
        container={ref}
        containerPadding={20}
      >
        <Popover id="popover-contained">
          <Popover.Body>
            <Form>
              {contents.map((content) => (
                <Form.Check
                  key={content}
                  type="checkbox"
                  id={content}
                  label={content}
                />
              ))}
            </Form>
          </Popover.Body>
        </Popover>
      </Overlay>
    </div>
  );
};

export const PreferenceSettingsButton = memo(PreferenceSettingsButtonComponent);
