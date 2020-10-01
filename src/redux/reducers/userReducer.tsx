import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAILURE,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE,
} from "../actions/types";

const initialState = {
  loading: false,
  error: null,
  data: null,
  isAuthenticated: false,
};

const userReducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  console.log(action);
  switch (action.type) {
    case USER_LOGIN_REQUEST:
    case USER_SIGNUP_REQUEST:
      return {
        loading: true,
        error: null,
        data: null,
        isAuthenticated: false,
      };

    case USER_LOGIN_SUCCESS:
    case USER_SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
        isAuthenticated: true,
      };

    case USER_LOGIN_FAILURE:
    case USER_SIGNUP_FAILURE:
      return {
        loading: false,
        error: action.payload,
        data: null,
        isAuthenticated: false,
      };

    case USER_LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case USER_LOGOUT_SUCCESS:
      return {
        loading: false,
        error: null,
        data: null,
        isAuthenticated: false,
      };

    case USER_LOGOUT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
