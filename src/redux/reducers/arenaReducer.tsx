import {
  ARENA_REWARD_REQUEST,
  ARENA_REWARD_SUCCESS,
  ARENA_REWARD_FAILURE,
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
    case ARENA_REWARD_REQUEST:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case ARENA_REWARD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };

    case ARENA_REWARD_FAILURE:
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
