const {
  STUDENT_NOTIFICATIONS_FAIL,
  STUDENT_NOTIFICATIONS_SUCCESS,
  STUDENT_NOTIFICATIONS_REQUEST,
  STUDENT_CIRCUMSTANCE_SUBMISSIONS_FAIL,
  STUDENT_CIRCUMSTANCE_SUBMISSIONS_SUCCESS,
  STUDENT_CIRCUMSTANCE_SUBMISSIONS_REQUEST,
  GET_STUDENT_CIRCUMSTANCES_FAIL,
  GET_STUDENT_CIRCUMSTANCES_SUCCESS,
  GET_STUDENT_CIRCUMSTANCES_REQUEST,
  STUDENT_REGISTER_REQUEST,
  STUDENT_LOGIN_REQUEST,
  STUDENT_LOGIN_SUCCESS,
  STUDENT_LOGIN_FAIL,
  STUDENT_LOGOUT,
  SUBMIT_CIRCUMSTANCE_REQUEST,
  SUBMIT_CIRCUMSTANCE_SUCCESS,
  SUBMIT_CIRCUMSTANCE_FAIL,
  SUBMIT_CIRCUMSTANCE_RESET,
} = require("../Constants/studentUserConstants");

export const studentLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case STUDENT_LOGIN_REQUEST:
      return { loading: true };
    case STUDENT_LOGIN_SUCCESS:
      return { loading: false, studentInfo: action.payload };
    case STUDENT_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case STUDENT_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const getStudentCircumstancesResourcesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_STUDENT_CIRCUMSTANCES_REQUEST:
      return { loading: true };
    case GET_STUDENT_CIRCUMSTANCES_SUCCESS:
      return { loading: false, resources: action.payload };
    case GET_STUDENT_CIRCUMSTANCES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const submitCircumstanceReducer = (state = {}, action) => {
  switch (action.type) {
    case SUBMIT_CIRCUMSTANCE_REQUEST:
      return { loading: true };
    case SUBMIT_CIRCUMSTANCE_SUCCESS:
      return { loading: false, resources: action.payload };
    case SUBMIT_CIRCUMSTANCE_FAIL:
      return { loading: false, error: action.payload };
    case SUBMIT_CIRCUMSTANCE_RESET:
      return {};
    default:
      return state;
  }
};

export const getCircumstanceSubmissionsReducer = (state = {}, action) => {
  switch (action.type) {
    case STUDENT_CIRCUMSTANCE_SUBMISSIONS_REQUEST:
      return { loading: true };
    case STUDENT_CIRCUMSTANCE_SUBMISSIONS_SUCCESS:
      return { loading: false, resources: action.payload };
    case STUDENT_CIRCUMSTANCE_SUBMISSIONS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const studentNotificationsReducer = (state = { }, action) => {
  switch (action.type) {
    case STUDENT_NOTIFICATIONS_REQUEST:
      return { loading: true };
    case STUDENT_NOTIFICATIONS_SUCCESS:
      return { loading: false, notifications: action.payload };
    case STUDENT_NOTIFICATIONS_FAIL:
      return { loading: false, error : action.payload };
    default:
      return state;
  }
};

export const registerStudentReducer = (state = { }, action) => {
  switch (action.type) {
    case STUDENT_REGISTER_REQUEST:
      return {submitted: true};
    default:
      return state;
  }
};
