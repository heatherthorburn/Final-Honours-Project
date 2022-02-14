/*
* This is the Redux store.
* This combines all the reducers into one store so that state changes can be accessed from
* anywhere in the application.
*/

import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk"; //Allows for the actions to be defined as functions rather than objects.
import {
  studentClassReducer,
  classListReducer,
  datesListReducer,
  timesListReducer,
  setClassReducer,
} from "./Reducers/classReducers";
import {
  classPDFReducer,
  departmentStudentReducer,
  detailedProfileReducer,
  adviseeListReducer,
  studentListReducer,
  studentDetailsReducer,
} from "./Reducers/studentReducers";
import {
  registerStaffReducer,
  staffNotificationsReducer,
  staffAdviseeReducer,
  staffLoginReducer,
  staffClassesReducer,
} from "./Reducers/staffReducers";
import {
  studentAttendanceQRReducer,
  addSubReducer,
  getSubClassesReducer,
  getSubClassesRegisterReducer,
  getLectureSessionsReducer,
  getLectureAttendanceReducer,
  addLectureReducer,
  logLectureAttendanceReducer,
  logLectureAttendanceEmailReducer,
} from "./Reducers/lectureReducers";
import {
  batchUploadCourseworkReducer,
  updateCourseworkMarksReducer,
  getStudentCourseworkReducer,
  getCourseworkMarksReducer,
  updateCourseworkReducer,
  getCourseworkByIDReducer,
  getClassCourseworkReducer,
  addCourseworkReducer,
  deleteCourseworkReducer,
} from "./Reducers/courseworkReducers";
import {
  getCircumstanceSubmissionsReducer,
  submitCircumstanceReducer,
  getStudentCircumstancesResourcesReducer,
  studentLoginReducer,
  studentNotificationsReducer,
  registerStudentReducer 
} from "./Reducers/studentUserReducer";

const initialState = {
  staffSignIn: {
    staffInfo: localStorage.getItem("staffInfo")
      ? JSON.parse(localStorage.getItem("staffInfo"))
      : null,
  },
  studentSignIn: {
    studentInfo: localStorage.getItem("studentInfo")
      ? JSON.parse(localStorage.getItem("studentInfo"))
      : null,
  },
};

const reducer = combineReducers({

  notifications : staffNotificationsReducer,
  studentNotifications : studentNotificationsReducer,
  
  //student user reducers

  studentRegister : registerStudentReducer,
  circumstanceSubmissions: getCircumstanceSubmissionsReducer,
  submitCircumstance: submitCircumstanceReducer,
  studentSignIn: studentLoginReducer,
  resources: getStudentCircumstancesResourcesReducer,

  //lecture reducers

  studentQR: studentAttendanceQRReducer,
  addSubClass : addSubReducer,
  subClasses : getSubClassesReducer, 
  subClassesRegister : getSubClassesRegisterReducer,
  getAttendance: getLectureAttendanceReducer,
  logLectureAttendanceEmail: logLectureAttendanceEmailReducer,
  logLectureAttendance: logLectureAttendanceReducer,
  addLectureToDB: addLectureReducer,
  lectureSessions: getLectureSessionsReducer,
  
  //coursework reducers

  batchUploadMarks: batchUploadCourseworkReducer,
  updateCourseworkMarks: updateCourseworkMarksReducer,
  studentCoursework: getStudentCourseworkReducer,
  courseworkDelete: deleteCourseworkReducer,
  updateCoursework: updateCourseworkReducer,
  addCourseworkToDB: addCourseworkReducer,
  coursework: getCourseworkByIDReducer,
  courseworkMarks: getCourseworkMarksReducer,
  classCoursework: getClassCourseworkReducer,

  //class w/ student reducers

  studentClassList: studentClassReducer,
  studentDetails: studentDetailsReducer,
  classPDF: classPDFReducer,
  departmentStudents: departmentStudentReducer,
  advisees: adviseeListReducer,

  //department w/ student reducers

  superProfile: detailedProfileReducer,
  adviseeList: staffAdviseeReducer,
  staffClasses: staffClassesReducer,
  classesList: classListReducer,
  datesList: datesListReducer,
  timesList: timesListReducer,
  currentClass: setClassReducer,
  studentList: studentListReducer,
  staffSignIn: staffLoginReducer,
  registerStaff : registerStaffReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //used in development for using the Chrome extension to monitor Redux state
const store = createStore( 
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
