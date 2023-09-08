import { useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import useLoguedUser from "../../hooks/useLoguedUser";
import { useEffect } from "react";
import { getAlumnosById } from "../../helpers/alumnos";

function ProfileMenu() {
  const [menu, setMenu] = useState(false);
  const userLogued = useLoguedUser();
  const [alumno, setAlumno] = useState(null);

  // useEffect(() => {
  //   //get alumnos by id
  //   const getAlumnosApi = async () => {
  //     try {
  //       const response = await getAlumnosById(userLogued.sub);
  //       setAlumno(response);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   if (userLogued?.sub) getAlumnosApi();
  // }, [userLogued?.sub]);

  return (
    <>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item "
          id="page-header-user-dropdown"
          tag="button"
        >
          {/* <img
                className="rounded-circle header-profile-user"
                src={user1}
                alt="Header Avatar"
              /> */}
          <span className="d-xl-inline-block ms-2 me-1"></span>
          <i className="mdi mdi-chevron-down d-xl-inline-block" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          {/* <DropdownItem tag="a" href="/dashboard#">
                {" "}
                <i className="bx bx-user font-size-16 align-middle me-1"/>
                Profile
              </DropdownItem>                   
              <div className="dropdown-divider"/> */}
          <Link to="/logout" className="dropdown-item">
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
            <span>Logout</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </>
  );
}

export default ProfileMenu;
