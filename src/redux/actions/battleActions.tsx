import { Dispatch } from "redux";
import { UserProp } from "../../utils/interfaces";
import {
  BATTLE_SET_OPPONENT_REQUEST,
  BATTLE_SET_OPPONENT_SUCCESS,
  BATTLE_SET_OPPONENT_FAILURE,
} from "./types";

export const battleSetOpponent = (
  userData: UserProp,
  referer: string
) => async (dispatch: Dispatch) => {
  dispatch({ type: BATTLE_SET_OPPONENT_REQUEST });

  try {
    dispatch({
      type: BATTLE_SET_OPPONENT_SUCCESS,
      payload: { data: userData, referer },
    });
  } catch (error) {
    dispatch({ type: BATTLE_SET_OPPONENT_FAILURE, payload: error.message });
  }
};
