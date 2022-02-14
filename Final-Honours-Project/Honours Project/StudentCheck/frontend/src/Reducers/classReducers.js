const {
  CLASS_LIST_REQUEST,
  CLASS_LIST_SUCCESS,
  CLASS_LIST_FAIL,
  DATE_LIST_FAIL,
  DATE_LIST_REQUEST,
  DATE_LIST_SUCCESS,
  TIME_LIST_SUCCESS,
  SESSION_LIST_REQUEST,
  SESSION_LIST_SUCCESS,
  SESSION_LIST_FAIL,
  TIME_LIST_REQUEST,
  TIME_LIST_FAIL,
  SET_CLASS_FAIL,
  SET_CLASS_SUCCESS,
  SET_CLASS_REQUEST,
  STUDENT_CLASS_REQUEST,
  STUDENT_CLASS_SUCCESS,
  STUDENT_CLASS_FAIL,
  STUDENT_CLASS_CLEANUP,
} = require("../Constants/classConstants");

export const classListReducer = (
  state = { loading: true, classes: [] },
  action
) => {
  switch (action.type) {
    case CLASS_LIST_REQUEST:
      return { loading: true };
    case CLASS_LIST_SUCCESS:
      return { loading: false, classes: action.payload };
    case CLASS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const datesListReducer = (
  state = { loading: true, dates: [] },
  action
) => {
  switch (action.type) {
    case DATE_LIST_REQUEST:
      return { loading: true };
    case DATE_LIST_SUCCESS:
      return { loading: false, dates: action.payload };
    case DATE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const sessionListReducer = (
  state = { loading: true, sessions: [] },
  action
) => {
  switch (action.type) {
    case SESSION_LIST_REQUEST:
      return { loading: true };
    case SESSION_LIST_SUCCESS:
      return { loading: false, sessions: action.payload };
    case SESSION_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const timesListReducer = (
  state = { loading: true, times: [] },
  action
) => {
  switch (action.type) {
    case TIME_LIST_REQUEST:
      return { loading: true };
    case TIME_LIST_SUCCESS:
      return { loading: false, times: action.payload };
    case TIME_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const studentClassReducer = (state = {}, action) => {
  switch (action.type) {
    case STUDENT_CLASS_REQUEST:
      return { loading: true };
    case STUDENT_CLASS_SUCCESS:
      return { loading: false, students: action.payload };
    case STUDENT_CLASS_FAIL:
      return { loading: false, error: action.payload };
    case STUDENT_CLASS_CLEANUP:
      return { "loading" : "HERE"};
    default:
      return state;
  }
};

export const setClassReducer = (
  state = { loading: true, code: [] },
  action
) => {
  switch (action.type) {
    case SET_CLASS_REQUEST:
      return { loading: true };
    case SET_CLASS_SUCCESS:
      return { loading: false, currentClass: action.payload };
    case SET_CLASS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
