import {
  LEAGUE_GET_OPPONENT_REQUEST,
  LEAGUE_GET_OPPONENT_SUCCESS,
  LEAGUE_GET_OPPONENT_FAILURE,
  LEAGUE_HANDLE_WIN_REQUEST,
  LEAGUE_HANDLE_WIN_SUCCESS,
  LEAGUE_HANDLE_WIN_FAILURE,
} from "../actions/types";

const initialState = {
  loading: false,
  error: null,
  data: null,
};

const leagueReducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case LEAGUE_GET_OPPONENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case LEAGUE_GET_OPPONENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };

    case LEAGUE_GET_OPPONENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case LEAGUE_HANDLE_WIN_REQUEST:
    case LEAGUE_HANDLE_WIN_SUCCESS:
    case LEAGUE_HANDLE_WIN_FAILURE:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default leagueReducer;
