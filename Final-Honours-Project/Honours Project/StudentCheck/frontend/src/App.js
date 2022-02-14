/* 
This is the main component of the application. 
Routes will determine what screen components are displayed in the main part of this component
Depending on what kind of user is logged in, a constant navigation will be displayed.

Staff/Student routers prevents logged out or unauthorised users from accessing pages.
*/

import React from "react";

/* Coursework Screens */
import AddCourseworkScreen from "./Screens/Coursework/AddCourseworkScreen";
import EditCourseworkScreen from "./Screens/Coursework/EditCourseworkScreen";
import ManageCourseworkScreen from "./Screens/Coursework/ManageCourseworkScreen";
import EditCourseworkGradeScreen from "./Screens/Coursework/EditCourseworkGradeScreen";
import CourseworkCSVScreen from "./Screens/Coursework/CourseworkCSVScreen";
import CourseworkScreen from "./Screens/Coursework/CourseworkScreen";

/* Attendance Screens */
import SubAttendanceScreen from "./Screens/Attendance/SubAttendanceScreen";
import TakeAttendanceQR from "./Screens/Attendance/TakeAttendanceQR";
import AttendanceScreen from "./Screens/Attendance/AttendanceScreen";
import SubClassAttendanceScreen from "./Screens/Attendance/SubClassAttendanceScreen"

/* Displaying Students and Profile Screens */
import StudentScreen from "./Screens/ViewStudentsScreens/StudentScreen";
import DepartmentStudentScreen from "./Screens/ViewStudentsScreens/DepartmentStudentScreen";
import SuperProfileScreen from "./Screens/Profiles/SuperProfileScreen";
import StudentClassProfile from "./Screens/Profiles/StudentClassProfile";

/* Misc Screens */
import StaffHomeScreen from "./Screens/StaffHomeScreen";
import AdviseesScreen from "./Screens/ViewStudentsScreens/AdviseesScreen";
import CircumstanceScreen from "./Screens/CircumstanceScreen";
import AdviceScreen from "./Screens/AdviceScreen";
import StaffNoticationScreen from "./Screens/StaffNotificationScreen";
import LoginScreen from "./Screens/LoginScreen";
import StudentNotificationScreen from "./Screens/StudentNotificationScreen"

/* Routes for authorisation */
import StaffRoute from "./Components/Utilities/StaffRoute";
import StudentRoute from "./Components/Utilities/StudentRoute";

/* Navigation Components */
import StudentNavbar from "./Components/Navigation/StudentNavbar";
import StaffNavbar from "./Components/Navigation/StaffNavbar";
import LoggedOutNav from "./Components/Navigation/LoggedOutNav";

import { useSelector } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

function App() {
  const staffSignIn = useSelector((state) => state.staffSignIn);
  const studentSignIn = useSelector((state) => state.studentSignIn);
  const { staffInfo } = staffSignIn;
  const { studentInfo } = studentSignIn;

  return (
    <>
      <BrowserRouter basename="/gtb17118-nodejs"> {/* Basename was necessary for deployment, should be removed if working locally */}

        {/* Navigation */}

        {staffInfo ? (
          <StaffNavbar />
        ) : studentInfo ? (
          <StudentNavbar />
        ) : (
              <LoggedOutNav />
            )}

        {/* Main Component */}

        <main>
          <Switch>
            {/* Staff Routes */}
            <StaffRoute
              path="/coursework/:class_code/grades/:id/csv"
              component={CourseworkCSVScreen}
              exact
            ></StaffRoute>
            <StaffRoute
              path="/coursework/:class_code/grades/:coursework_id/:student_id"
              component={EditCourseworkGradeScreen}
              exact
            ></StaffRoute>
            <StaffRoute
              path="/attendance/subclasses/:class_code"
              component={SubClassAttendanceScreen}
              exact
            ></StaffRoute>
            <StaffRoute
              path="/attendance/subclasses/:class_code/:group_id"
              component={SubAttendanceScreen}
              exact
            ></StaffRoute>
            <StaffRoute
              path="/coursework/:class_code/addcw"
              component={AddCourseworkScreen}
              exact
            ></StaffRoute>
            <StaffRoute
              path="/staff/circumstances/:id"
              component={CircumstanceScreen}
              exact
            ></StaffRoute>
            <StaffRoute
              path="/department/:id"
              component={DepartmentStudentScreen}
              exact
            ></StaffRoute>
            <StaffRoute
              path="/department/:dept_id/:id"
              component={SuperProfileScreen}
              exact
            ></StaffRoute>
            <StaffRoute
              path="/staff/notifications"
              component={StaffNoticationScreen}
              exact
            ></StaffRoute>
            <StaffRoute
              path="/profile/advisor/:id"
              component={SuperProfileScreen}
              exact
            ></StaffRoute>
            <StaffRoute
              path="/advisees"
              component={AdviseesScreen}
              exact
            ></StaffRoute>
            <StaffRoute
              path="/coursework/:class_code"
              component={CourseworkScreen}
              exact
            ></StaffRoute>
            <StaffRoute
              path="/students/:class_code"
              component={StudentScreen}
              exact
            ></StaffRoute>
            <StaffRoute
              path="/attendance/:class_code"
              component={AttendanceScreen}
              exact
            ></StaffRoute>
            <StaffRoute
              path="/profile/:class_code/:student_id"
              component={StudentClassProfile}
              exact
            ></StaffRoute>
            <StaffRoute
              path="/coursework/:class_code/edit/:id"
              exact
              component={EditCourseworkScreen}
            ></StaffRoute>
            <StaffRoute
              path="/coursework/:class_code/grades/:id"
              component={ManageCourseworkScreen}
              exact
            ></StaffRoute>
            <StaffRoute path="/staff" exact component={StaffHomeScreen} />

            {/* Student Routes */}
            <StudentRoute
              path="/student/notifications"
              component={StudentNotificationScreen}
              exact
            ></StudentRoute>
            <StudentRoute
              path="/student/:id"
              component={() => <SuperProfileScreen student={true} />}
              exact
            ></StudentRoute>
            <StudentRoute
              path="/student/advice/:id"
              component={AdviceScreen}
              exact
            ></StudentRoute>

            {/* Accessible routes */}
            <Route path="/login" component={LoginScreen} exact></Route>
            <Route
              path="/student/circumstances/:id"
              component={CircumstanceScreen}
              exact
            ></Route>
            <Route
              path="/takeattendance/qr/:id"
              component={TakeAttendanceQR}
              exact
            ></Route>

            {/*To ensure that logged out users are navigated to the log in page*/}
            <Route path="/" exact>
              {studentInfo ? (
                <Redirect to={"/student/" + studentInfo.data.matric} />
              ) : staffInfo ? (
                <Redirect to={"/staff"} />
              ) : (
                    <LoginScreen />
                  )}
            </Route>
          </Switch>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
