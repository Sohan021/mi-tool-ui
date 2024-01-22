import { faCircleUser, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Dropdown from "react-bootstrap/esm/Dropdown";

const TopNavbar = () => {
  return (
    <div className="page-header">
      <div className="text-wrapper">Dashboard</div>
      <div>
        <Dropdown>
          <Dropdown.Toggle
            variant="light"
            id="dropdown-basic"
            className="circular-toggle"
          >
            <FontAwesomeIcon
              icon={faCircleUser}
              className="user-circle"
              color="#B2BBC5"
            />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="">
              <span className="text-wrapper-2">Profile</span>
            </Dropdown.Item>
            <Dropdown.Item href="">
              <span className="text-wrapper-2">User Preference</span>
            </Dropdown.Item>
            <Dropdown.Item href="">
              <span className="text-wrapper-2">
                {/* <Link
                  href={"/signin"}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  Log Out{" "}
                </Link> */}
              </span>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default TopNavbar;
