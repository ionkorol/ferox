import { Dispatch } from "redux";
import { firestoreApp } from "../../utils/firebase";
import {
  ARENA_CREATE_REQUEST,
  ARENA_CREATE_SUCCESS,
  ARENA_CREATE_FAILURE,
} from "./types";

export const arenaCreate = () => (dispatch: Dispatch) => {
  dispatch({ type: ARENA_CREATE_REQUEST });
  firestoreApp.collection("arena-rooms").add({});
};
