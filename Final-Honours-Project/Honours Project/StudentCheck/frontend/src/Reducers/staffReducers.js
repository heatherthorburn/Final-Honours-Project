const {
  STAFF_NOTIFICATIONS_FAIL, 
  STAFF_NOTIFICATIONS_SUCCESS,
  STAFF_NOTIFICATIONS_REQUEST,
  STAFF_LOGIN_REQUEST,
  STAFF_LOGIN_SUCCESS,
  STAFF_LOGIN_FAIL,
  STAFF_LOGOUT,
  STAFF_CLASSES_REQUEST,
  STAFF_CLASSES_SUCCESS,
  STAFF_CLASSES_FAIL,
  STAFF_ADVISEES_REQUEST,
  STAFF_ADVISEES_SUCCESS,
  STAFF_ADVISEES_FAIL,
  STAFF_REGISTER_REQUEST,
} = require("../Constants/staffUserConstants");

export const staffLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case STAFF_LOGIN_REQUEST:
      return { loading: true };
    case STAFF_LOGIN_SUCCESS:
      return { loading: false, staffInfo: action.payload };
    case STAFF_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case STAFF_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const staffAdviseeReducer = (state = {}, action) => {
  switch (action.type) {
    case STAFF_ADVISEES_REQUEST:
      return { loading: true };
    case STAFF_ADVISEES_SUCCESS:
      return { loading: false, staffInfo: action.payload };
    case STAFF_ADVISEES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const staffClassesReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case STAFF_CLASSES_REQUEST:
      return { loading: true };
    case STAFF_CLASSES_SUCCESS:
      return { loading: false, classes: action.payload };
    case STAFF_CLASSES_FAIL:
      return { loading: false, classes: action.payload };
    default:
      return state;
  }
};

export const staffNotificationsReducer = (state = { }, action) => {
  switch (action.type) {
    case STAFF_NOTIFICATIONS_REQUEST:
      return { loading: true };
    case STAFF_NOTIFICATIONS_SUCCESS:
      return { loading: false, notifications: action.payload };
    case STAFF_NOTIFICATIONS_FAIL:
      return { loading: false, error : action.payload };
    default:
      return state;
  }
};

export const registerStaffReducer = (state = { }, action) => {
  switch (action.type) {
    case STAFF_REGISTER_REQUEST:
      return {submitted: true};
    default:
      return state;
  }
};