/**
 * navigation for logged in staff member
 */

import { useSelector } from "react-redux";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import NotificationBell from "../Indicators/NotificationBell";
import UserProfileIcon from "../Indicators/UserProfileIcon";
import { GrClose } from "react-icons/gr";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getStaffClasses, staffSignout } from "../../Actions/staffUserActions";
import { AiOutlineHome, AiOutlineLogout } from "react-icons/ai";
import { BsBook } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { FaChalkboardTeacher } from "react-icons/fa";

export default function Navbar() {
  const dispatch = useDispatch();
  const staffSignIn = useSelector((state) => state.staffSignIn);
  const staffLoggedIn = staffSignIn.staffInfo;

  const [drawerToggle, setDrawerToggle] = useState(false);

  function setDrawerToggleClick() {
    setDrawerToggle(!drawerToggle);
  }

  const signOutClick = () => dispatch(staffSignout());

  /**
   * DRAWER COMPONENT
   * */

  function Drawer() {
    const staffSignIn = useSelector((state) => state.staffSignIn);
    const staffLoggedIn = staffSignIn.staffInfo.data;
    const classDispatch = useDispatch();
    const [classes, setClasses] = useState(false);
    const [departments, setDepartments] = useState(false);

    useEffect(() => {
      if (staffLoggedIn.classes.length > 0) {
        setClasses(staffLoggedIn.classes);
      }

      if (staffLoggedIn.departments.length > 0) {
        setDepartments(staffLoggedIn.departments);
      }
    }, [staffSignIn]);

    const signOutClick = () => classDispatch(staffSignout());

    return staffLoggedIn == null ? null : (
      <nav>
        <Link to="/">
          <Button onClick={() => setDrawerToggleClick()} className="menu-item">
            <div className="icon">
              <AiOutlineHome />{" "}
            </div>
            Home
          </Button>
        </Link>

        {/* SUBMENU FOR TEACHERS */}

        {!classes ? null : (
          <div>
            <div className="divider">CLASSES</div>
            {classes.map((item, key) => {
              return <StaffSubMenu item={item} key={key} />;
            })}
          </div>
        )}

        {/* SUBMENU FOR DEPARTMENT HEAD */}

        {!departments ? null : (
          <div>
            <div className="divider">DEPARTMENT</div>
            {departments.map((item, key) => {
              return (
                <Link
                  key={key}
                  to={"/department/" + item.dept_id.toLowerCase()}
                >
                  <Button onClick={() => setDrawerToggleClick()} className="menu-item">
                    <div className="icon">
                      <FiUsers />{" "}
                    </div>
                    {item.dept_title}
                  </Button>
                </Link>
              );
            })}
          </div>
        )}

        {/*SUBMENU FOR ADVISORS */}

        {!staffLoggedIn.advisor ? null : (
          <div>
            <div className="divider">ADVISEES</div>
            <Link to="/advisees">
              <Button onClick={() => setDrawerToggleClick()}  className="menu-item">
                <div className="icon">
                  <FiUsers />{" "}
                </div>
                Students
              </Button>
            </Link>
          </div>
        )}

        {/*SUBMENU FOR YEAR HEAD */}

        <div className="divider"></div>
        <Button
          className="log-out-nav menu-item"
          onClick={() => signOutClick()}
        >
          <div className="icon">
            <AiOutlineLogout />
          </div>
          Log out
        </Button>
      </nav>
    );
  }

  /**
   * COMPONENT FOR THE SUB MENUS
   * @param {*} props
   */

  function StaffSubMenu(props) {
    const item = props.item;

    const [showSubMenu, setShowMenu] = useState(false);

    const toggleMenu = () => setShowMenu(!showSubMenu);

    return (
      <div className="divide">
        <Button
          className="menu-item"
          aria-label={item.class_code + "-class-menu"}
          onClick={() => toggleMenu()}
        >
          <div className="icon">
            {" "}
            {showSubMenu ? <AiFillCaretUp /> : <AiFillCaretDown />}{" "}
          </div>{" "}
          {item.class_code} - {item.class_title}{" "}
        </Button>
        {showSubMenu ? (
          <div>
            <Link to={"/students/" + item.class_code.toLowerCase()}>
              <div
                onClick={() => setDrawerToggleClick()}
                className="sub-menu-item"
              >
                Students
              </div>
            </Link>
            <Link to={"/coursework/" + item.class_code.toLowerCase()}>
              <div
                onClick={() => setDrawerToggleClick()}
                className="sub-menu-item"
              >
                Manage Coursework
              </div>
            </Link>
            <Link to={"/attendance/" + item.class_code.toLowerCase()}>
              <div
                onClick={() => setDrawerToggleClick()}
                className="sub-menu-item"
              >
                Lecture Attendance
              </div>
            </Link>
            {item.subclass_groups.length > 0 ? (
              <Link to={"/attendance/subclasses/" + item.class_code.toLowerCase()}>
                <div
                  onClick={() => setDrawerToggleClick()}
                  className="sub-menu-item"
                >
                  Tutorials and Lab Attendance
                </div>
              </Link>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className="nav-wrapper">
      <div className="header-style">
        <div className="flex-vertical-align ">
          <Button
            aria-label="navigation-button"
            className="header-button"
            onClick={() => setDrawerToggleClick()}
          >
            {drawerToggle ? (
              <GrClose className="flex-vertical-align header-icon-border " />
            ) : (
                <GiHamburgerMenu className="flex-vertical-align header-icon-border" />
              )}
          </Button>

          <Link className="logo header-padding" to="/">
            StudentCheck
          </Link>
        </div>

        {staffLoggedIn ? (
          <div className="flex-vertical-align margin-left">
            <Link to="/staff/notifications">
              <Button className="header-button">
                <NotificationBell className="flex-vertical-align" />{" "}
              </Button>
            </Link>
            <Button style={{fontSize : "2rem"}} onClick={() => signOutClick()} className="header-button" aria-label="navigation-button">
              Log Out <AiOutlineLogout className="flex-vertical-align" />
            </Button>
          </div>
        ) : (
            <Link to="/login">Sign In</Link>
          )}
      </div>
      <div className={drawerToggle ? "drawer active" : "drawer"}>
        <Drawer />
      </div>
    </div>
  );
}
