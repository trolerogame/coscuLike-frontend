import React from "react";
import { Dropdown } from "react-bootstrap";
import Image from "next/image";
import ImageUSerUndefind from "../public/usernameUndefine.png";
import { connect } from "react-redux";
import { logOut } from "../redux/reducers/UserDuck";
import { DropdownToggle } from "../styles/style-header";
import Link from "next/link";
import {urlUpload} from '../redux/types'
const profileDropdown = ({ logOut, user }: any) => {
  return (
    <Dropdown>
      <DropdownToggle
        variant="none"
        id="dropdown-profile"
        className="d-flex align-items-center"
      >
        {/**? si el avatar existe la muestra, sino muestra una imagen predeterminada*/}
        {user.avatar ? (
          <Image
            loader={({ src }: any) =>
              urlUpload + src
            }
            src={"/" + user.avatar}
            className="rounded"
            alt="user"
            width={50}
            height={50}
          />
        ) : (
          <Image
            src={ImageUSerUndefind}
            className="rounded"
            alt="user"
            width={50}
            height={50}
          />
        )}

        <span className="mx-2">{user.username}</span>
      </DropdownToggle>
      <Dropdown.Menu>
        <Dropdown.Item>
          <Link href={`/user/${user.username}`} passHref>
            <p className="my-0">profile</p>
          </Link>
        </Dropdown.Item>
        <Dropdown.Item onClick={logOut}>Log Out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
function mapStateToProps(state: any) {
  return {
    user: state.User.user,
  };
}
export default connect(mapStateToProps, { logOut })(profileDropdown);
