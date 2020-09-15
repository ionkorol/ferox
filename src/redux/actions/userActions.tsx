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
} from "./types";

import { firebaseApp, firestoreApp } from "../../utils/firebase";
import { Dispatch } from "redux";

export const userLogin = (username: string, password: string) => (
  dispatch: Dispatch
) => {
  const email = username + "@ferox.io";
  dispatch({ type: USER_LOGIN_REQUEST });
  firebaseApp
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCred) => {
      dispatch({ type: USER_LOGIN_SUCCESS, payload: userCred.user });
    })
    .catch((error) =>
      dispatch({ type: USER_LOGIN_FAILURE, payload: error.message })
    );
};

export const userLogout = () => (dispatch: Dispatch) => {
  dispatch({ type: USER_LOGOUT_REQUEST });
  firebaseApp
    .auth()
    .signOut()
    .then(() => {
      dispatch({ type: USER_LOGOUT_SUCCESS });
    })
    .catch((error) =>
      dispatch({ type: USER_LOGOUT_FAILURE, payload: error.message })
    );
};

export const userSignup = (username: string, password: string) => (
  dispatch: Dispatch
) => {
  const email = username + "@ferox.io";
  dispatch({ type: USER_SIGNUP_REQUEST });
  firebaseApp
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCred) => {
      firestoreApp
        .collection("users")
        .doc(userCred.user?.uid)
        .set({
          username,
        })
        .then((user) => dispatch({ type: USER_SIGNUP_SUCCESS, payload: user }))
        .catch((error) =>
          dispatch({ type: USER_SIGNUP_FAILURE, payload: error.message })
        );
    })
    .catch((error) =>
      dispatch({ type: USER_SIGNUP_FAILURE, payload: error.message })
    );
};

export const userUpdate = () => (dispatch: Dispatch) => {
  firebaseApp.auth().onAuthStateChanged((user) => {
    if (user) {
      return firestoreApp
        .collection("users")
        .doc(firebaseApp.auth().currentUser?.uid)
        .onSnapshot(
          (userSnap) => {
            dispatch({ type: USER_LOGIN_SUCCESS, payload: userSnap.data() });
          },
          (error) =>
            dispatch({ type: USER_LOGIN_FAILURE, payload: error.message })
        );
    } else {
      dispatch({ type: USER_LOGOUT_SUCCESS });
    }
  });
};
