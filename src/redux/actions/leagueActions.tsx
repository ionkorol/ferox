import { RootStateOrAny } from "react-redux";
import { Dispatch } from "redux";
import { firestoreApp } from "../../utils/firebase";
import { UserProp } from "../../utils/interfaces";
import { UserObject } from "../../utils/objects";
import {
  LEAGUE_GET_OPPONENT_REQUEST,
  LEAGUE_GET_OPPONENT_SUCCESS,
  LEAGUE_GET_OPPONENT_FAILURE,
  LEAGUE_HANDLE_WIN_REQUEST,
  LEAGUE_HANDLE_WIN_SUCCESS,
  LEAGUE_HANDLE_WIN_FAILURE,
} from "./types";

export const getOpponent = () => async (
  dispatch: Dispatch,
  getState: RootStateOrAny
) => {
  dispatch({ type: LEAGUE_GET_OPPONENT_REQUEST });

  // Get current user data
  const userData = getState().userReducer.data as UserProp;

  try {
    let oppLeague;
    let oppRank;
    if (userData.league.rank === 1) {
      oppRank = 100;
      if (userData.league.tier === "bronze") {
        oppLeague = "silver";
      } else if (userData.league.tier === "silver") {
        oppLeague = "gold";
      } else {
        oppLeague = "gold";
      }
    } else {
      oppRank = userData.league.rank - 1;
      oppLeague = userData.league.tier;
    }

    const oppLeagueSnap = await firestoreApp
      .collection("leagues")
      .doc(oppLeague)
      .get();
    const oppRef = oppLeagueSnap.get(String(oppRank)) as
      | firebase.firestore.DocumentReference
      | undefined;

    let oppData;
    if (oppRef) {
      oppData = (await oppRef.get()).data();
    } else {
      oppData = generateUser(oppRank, oppLeague);
    }
    dispatch({ type: LEAGUE_GET_OPPONENT_SUCCESS, payload: oppData });
  } catch (error) {
    dispatch({ type: LEAGUE_GET_OPPONENT_FAILURE, payload: error.message });
  }
};

const generateUser = (rank: number, tier: string) => {
  const userData = UserObject;
  UserObject.league.rank = rank;
  UserObject.league.tier = tier;
  return userData;
};

export const leagueHandleWin = () => async (
  dispatch: Dispatch,
  getState: RootStateOrAny
) => {
  dispatch({ type: LEAGUE_HANDLE_WIN_REQUEST });
  const userData = getState().userReducer.data as UserProp;
  const oppData = getState().leagueReducer.data as UserProp;

  const userRef = firestoreApp.collection("users").doc(userData.uid);

  let oppRef;
  if (oppData.uid === "test-uid") {
    oppRef = null;
  } else {
    oppRef = firestoreApp.collection("users").doc(oppData.uid);
  }

  // Update the leagues
  // Same league as the opponent
  if (userData.league.tier === oppData.league.tier) {
    const leagueRef = firestoreApp
      .collection("leagues")
      .doc(oppData.league.tier);
    try {
      await leagueRef.update({
        [oppData.league.rank]: userRef,
        [userData.league.rank]: oppRef,
      });
    } catch (error) {
      console.log(error);
    }
    // Diferent leagues
  } else if (userData.league.tier !== oppData.league.tier) {
    const oppLeagueRef = firestoreApp
      .collection("leagues")
      .doc(oppData.league.tier);
    const userLeagueRef = firestoreApp
      .collection("leagues")
      .doc(userData.league.tier);

    try {
      await oppLeagueRef.update({
        [oppData!.league.rank]: userRef,
      });
      await userLeagueRef.update({
        [userData.league.rank]: oppRef,
      });
    } catch (error) {
      console.log(error);
    }
  }
  // Update user and opp
  try {
    await userRef.update({
      "league.rank": oppData.league.rank,
      "league.tier": oppData.league.tier,
    });

    if (oppRef) {
      await oppRef.update({
        "league.rank": userData.league.rank,
        "league.tier": userData.league.tier,
      });
    }

    dispatch({ type: LEAGUE_HANDLE_WIN_SUCCESS });
  } catch (error) {
    console.log(error);
    dispatch({ type: LEAGUE_HANDLE_WIN_FAILURE });
  }
};
