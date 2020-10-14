import {
  BATTLE_SET_OPPONENT_REQUEST,
  BATTLE_SET_OPPONENT_SUCCESS,
  BATTLE_SET_OPPONENT_FAILURE,
} from "../actions/types";

const initialState = {
  loading: false,
  error: null,
  data: null,
  referer: null,
};

const arenaReducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case BATTLE_SET_OPPONENT_REQUEST:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case BATTLE_SET_OPPONENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload.data,
        referer: action.payload.referer,
      };

    case BATTLE_SET_OPPONENT_FAILURE:
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
