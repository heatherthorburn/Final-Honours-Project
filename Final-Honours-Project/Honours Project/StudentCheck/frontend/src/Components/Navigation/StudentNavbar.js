/**
 * navigation for logged in student.
 */

import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { GrClose } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import StudentNotificationBell from "../Indicators/StudentNotificationBell";
import { Link, Redirect } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai"
import { AiOutlineHome } from "react-icons/ai";
import { RiFilePaperLine } from "react-icons/ri"
import { FaRegHeart } from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux";
import { studentSignout } from "../../Actions/studentUserActions";

export default function StudentNavbar() {
  const dispatch = useDispatch();
  const [drawerToggle, setDrawerToggle] = useState(false);
  const studentSignIn = useSelector((state) => state.studentSignIn);

  function handleSignOutClick() {
    dispatch(studentSignout());
  }

  function Drawer() {
    return (
      <nav>
        <Link to="/">
          <div className="menu-item">
            <div className="icon">
              <AiOutlineHome />{" "}
            </div>
            Profile
          </div>
        </Link>
        <Link
          to={"/student/circumstances/" + studentSignIn.studentInfo.data.matric}
        >
          <div className="menu-item">
            <div className="icon">
              <RiFilePaperLine />{" "}
            </div>
            Submit Circumstances Form
          </div>
        </Link>
        <Link to={"/student/advice/" + studentSignIn.studentInfo.data.matric} >
          <div className="menu-item">
            <div className="icon">
              <FaRegHeart />{" "}
            </div>
            Your Advice
          </div>
        </Link>
      </nav>
    );
  }

  return (
    <div className="nav-wrapper">
      <div className="header-style">
        <div className="flex-vertical-align ">
          <Button
            className="header-button"
            onClick={() => setDrawerToggle(!drawerToggle)}
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

        <div className="flex-vertical-align margin-left">
        <Link to="/student/notifications">
          <Button className="header-button">
            <StudentNotificationBell className="flex-vertical-align" />{" "}
            </Button> 
            </Link>
            <Link to = "/">
            <Button style={{fontSize : "2rem"}} onClick={() => handleSignOutClick()} className="header-button" aria-label="navigation-button">
              Log Out <AiOutlineLogout className="flex-vertical-align" />
            </Button>
            </Link>
        </div>
      </div>
      <div className={drawerToggle ? "drawer active" : "drawer"}>
        <Drawer />
      </div>
    </div>
  );
}
