import {
  ARENA_CREATE_REQUEST,
  ARENA_CREATE_SUCCESS,
  ARENA_CREATE_FAILURE,
} from "../actions/types";

const initialState = {
  loading: false,
  error: null,
  data: null,
};

const arenaReducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case ARENA_CREATE_REQUEST:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case ARENA_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };

    case ARENA_CREATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default arenaReducer;
