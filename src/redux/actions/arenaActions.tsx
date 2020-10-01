import { firestore } from "firebase";
import { Dispatch } from "redux";
import { firebaseApp, firestoreApp } from "../../utils/firebase";
import {
  ARENA_REWARD_REQUEST,
  ARENA_REWARD_SUCCESS,
  ARENA_REWARD_FAILURE,
} from "./types";

export const arenaReward = (xp: number) => (dispatch: Dispatch) => {
  dispatch({ type: ARENA_REWARD_REQUEST });
  const userId = firebaseApp.auth().currentUser?.uid;
  const userRef = firestoreApp.collection("users").doc(userId);

  userRef.update({'xp': firestore.FieldValue.increment(xp)}).then(() => {
    dispatch({type: ARENA_REWARD_SUCCESS, payload: xp})
  }).catch((error) => dispatch({type: ARENA_REWARD_FAILURE, payload: error.message}) )

};
