import { useRef } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

interface Props {
  icon: JSX.Element;
  tooltip: string;
  handleClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const IconButton = ({ icon, tooltip, handleClick }: Props) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  return (
    <OverlayTrigger
      delay={{ hide: 450, show: 300 }}
      trigger={["hover", "focus"]}
      rootClose={true}
      rootCloseEvent="click"
      overlay={(props) => <Tooltip {...props}>{tooltip}</Tooltip>}
      placement="top"
    >
      <div className="btn" onClick={handleClick}>
        {icon}
      </div>
    </OverlayTrigger>
  );
};

export default IconButton;
