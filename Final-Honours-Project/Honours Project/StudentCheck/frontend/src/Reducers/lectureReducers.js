const {
  STUDENT_QR_ATTENDANCE_FAIL,
  STUDENT_QR_ATTENDANCE_REQUEST,
  STUDENT_QR_ATTENDANCE_SUCCESS,
  ADD_SUB_FAIL,
  ADD_SUB_RESET,
  ADD_SUB_SUCCESS,
  ADD_SUB_REQUEST,
  GET_SUB_REGISTER_SUCCESS,
  GET_SUB_REGISTER_RESET,
  GET_SUB_REGISTER_REQUEST,
  GET_SUB_REGISTER_FAIL,
  GET_SUB_CLASSES_FAIL,
  GET_SUB_CLASSES_SUCCESS,
  GET_SUB_CLASSES_REQUEST,
  GET_SUB_CLASSES_RESET,
  GET_LECTURE_SESSIONS_SUCCESS,
  GET_LECTURE_SESSIONS_REQUEST,
  GET_LECTURE_SESSIONS_FAIL,
  GET_LECTURE_ATTENDANCE_REQUEST,
  GET_LECTURE_ATTENDANCE_FAIL,
  GET_LECTURE_ATTENDANCE_SUCCESS,
  ADD_LECTURE_REQUEST,
  ADD_LECTURE_SUCCESS,
  ADD_LECTURE_FAIL,
  ADD_LECTURE_RESET,
  LOG_ATTENDANCE_REQUEST,
  LOG_ATTENDANCE_SUCCESS,
  LOG_ATTENDANCE_FAIL,
  LOG_ATTENDANCE_RESET,
  LOG_ATTENDANCE_EMAIL_FAIL,
  LOG_ATTENDANCE_EMAIL_SUCCESS,
  LOG_ATTENDANCE_EMAIL_REQUEST,
  LOG_ATTENDANCE_EMAIL_RESET,
  DEFAULT_ATTENDANCE_REQUEST,
} = require("../Constants/lectureConstants");

export const defaultAttendanceReducer = (state = { }, action) => {
  switch (action.type) {
    case DEFAULT_ATTENDANCE_REQUEST:
      return {submitted: true};
    default:
      return state;
  }
};

export const getSubClassesRegisterReducer = (
  state = { },
  action
) => {
  switch (action.type) {
    case GET_SUB_REGISTER_REQUEST:
      return { loading: true };
    case GET_SUB_REGISTER_SUCCESS:
      return { loading: false, students: action.payload };
    case GET_SUB_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case GET_SUB_REGISTER_RESET :
      return {}
    default:
      return state;
  }
};

export const getSubClassesReducer = (
  state = { },
  action
) => {
  switch (action.type) {
    case GET_SUB_CLASSES_REQUEST:
      return { loading: true };
    case GET_SUB_CLASSES_SUCCESS:
      return { loading: false, classes: action.payload };
    case GET_SUB_CLASSES_FAIL:
      return { loading: false, error: action.payload };
    case GET_SUB_CLASSES_RESET :
      return {}
    default:
      return state;
  }
};

export const addLectureReducer = (
  state = { },
  action
) => {
  switch (action.type) {
    case ADD_LECTURE_REQUEST:
      return { loading: true };
    case ADD_LECTURE_SUCCESS:
      return { loading: false, classes: action.payload };
    case ADD_LECTURE_FAIL:
      return { loading: false, error: action.payload };
    case ADD_LECTURE_RESET :
      return {}
    default:
      return state;
  }
};

export const addSubReducer = (
  state = { },
  action
) => {
  switch (action.type) {
    case ADD_SUB_REQUEST:
      return { loading: true };
    case ADD_SUB_SUCCESS:
      return { loading: false, classes: action.payload };
    case ADD_SUB_FAIL:
      return { loading: false, error: action.payload };
    case ADD_SUB_RESET :
      return {}
    default:
      return state;
  }
};

export const logLectureAttendanceReducer = (
  state = { loading: true },
  action
) => {
  switch (action.type) {
    case LOG_ATTENDANCE_REQUEST:
      return { loading: true };
    case LOG_ATTENDANCE_SUCCESS:
      return { loading: false, success: "success", lecture: action.payload };
    case LOG_ATTENDANCE_FAIL:
      return { loading: false, error: action.payload };
    case LOG_ATTENDANCE_RESET:
      return {};
    default:
      return state;
  }
};

export const logLectureAttendanceEmailReducer = (
  state = { loading: true },
  action
) => {
  switch (action.type) {
    case LOG_ATTENDANCE_EMAIL_REQUEST:
      return { loading: true };
    case LOG_ATTENDANCE_EMAIL_SUCCESS:
      return { loading: false, success: "success", lecture: action.payload };
    case LOG_ATTENDANCE_EMAIL_FAIL:
      return { loading: false, error: action.payload };
    case LOG_ATTENDANCE_EMAIL_RESET:
      return {};
    default:
      return state;
  }
};

export const getLectureAttendanceReducer = (
  state = { loading: true, lecture: [] },
  action
) => {
  switch (action.type) {
    case GET_LECTURE_ATTENDANCE_REQUEST:
      return { loading: true };
    case GET_LECTURE_ATTENDANCE_SUCCESS:
      return { loading: false, classes: action.payload };
    case GET_LECTURE_ATTENDANCE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getLectureSessionsReducer = (
  state = { loading: true, lecture: [] },
  action
) => {
  switch (action.type) {
    case GET_LECTURE_SESSIONS_REQUEST:
      return { loading: true };
    case GET_LECTURE_SESSIONS_SUCCESS:
      return { loading: false, classes: action.payload };
    case GET_LECTURE_SESSIONS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const studentAttendanceQRReducer = (
  state = { loading: true },
  action
) => {
  switch (action.type) {
    case STUDENT_QR_ATTENDANCE_REQUEST:
      return { loading: true };
    case STUDENT_QR_ATTENDANCE_SUCCESS:
      return { loading: false, attendance: action.payload };
    case STUDENT_QR_ATTENDANCE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};