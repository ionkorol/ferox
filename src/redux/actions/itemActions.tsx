import { firestore } from "firebase";
import Toast from "../../components/Toast";
import { Dispatch } from "redux";
import { firebaseApp, firestoreApp } from "../../utils/firebase";

import {
  ITEM_EQUIP_REQUEST,
  ITEM_EQUIP_SUCCESS,
  ITEM_EQUIP_FAILURE,
  ITEM_BUY_REQUEST,
  ITEM_BUY_SUCCESS,
  ITEM_BUY_FAILURE,
  ITEM_SELL_REQUEST,
  ITEM_SELL_SUCCESS,
  ITEM_SELL_FAILURE,
} from "./types";

export const itemEquip = (itemRef: firestore.DocumentReference) => async (
  dispatch: Dispatch,
  getState: any
) => {
  dispatch({ type: ITEM_EQUIP_REQUEST });
  const userId = firebaseApp.auth().currentUser?.uid;
  const userRef = firestoreApp.collection("users").doc(userId);
  const userData = getState().userReducer.data;
  const itemType = (await itemRef.get()).get("type");

  // Add item to equipment, remove from inventory
  const inventory = userData.items[itemType]
    ? [
        ...userData.inventory.filter(
          (item: firestore.DocumentReference) => item !== itemRef
        ),
        userData.items[itemType],
      ]
    : [
        ...userData.inventory.filter(
          (item: firestore.DocumentReference) => item !== itemRef
        ),
      ];

  try {
    await userRef.update({
      [`items.${itemType}`]: itemRef,
      inventory,
    });
    dispatch({ type: ITEM_EQUIP_SUCCESS });
    Toast.success("Item Equiped");
  } catch (error) {
    dispatch({ type: ITEM_EQUIP_FAILURE, payload: error.message });
    Toast.error(error.message);
  }

  // Remove item from inventory
};

export const itemBuy = (
  itemRef: firestore.DocumentReference,
  currency: string,
  amount: number
) => async (dispatch: Dispatch, getState: any) => {
  dispatch({ type: ITEM_BUY_REQUEST });
  const userId = firebaseApp.auth().currentUser?.uid;
  const userRef = firestoreApp.collection("users").doc(userId);
  const userData = getState().userReducer.data;
  try {
    await userRef.update({
      [currency]: firestore.FieldValue.increment(-amount),
      inventory: [...userData.inventory, itemRef],
    });
    dispatch({ type: ITEM_BUY_SUCCESS });
    Toast.success("Item Bought");
  } catch (error) {
    dispatch({ type: ITEM_BUY_FAILURE, payload: error.message });
    Toast.error(error.message);
  }
};

export const itemSell = (
  itemRef: firestore.DocumentReference,
  amount: number
) => async (dispatch: Dispatch, getState: any) => {
  dispatch({ type: ITEM_SELL_REQUEST });
  const userId = firebaseApp.auth().currentUser?.uid;
  const userRef = firestoreApp.collection("users").doc(userId);
  const userData = getState().userReducer.data;
  try {
    await userRef.update({
      silver: firestore.FieldValue.increment(amount),
      inventory: userData.inventory.filter(
        (item: firestore.DocumentReference) => item !== itemRef
      ),
    });
    dispatch({ type: ITEM_SELL_SUCCESS });
    Toast.success("Item Sold");
  } catch (error) {
    dispatch({ type: ITEM_SELL_FAILURE });
    Toast.error("Item Bought");
  }
};
