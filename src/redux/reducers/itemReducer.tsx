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
} from "../actions/types";

const initialState = {
  loading: false,
  error: null,
  data: null,
};

const itemReducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case ITEM_EQUIP_REQUEST:
    case ITEM_BUY_REQUEST:
    case ITEM_SELL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ITEM_EQUIP_SUCCESS:
    case ITEM_BUY_SUCCESS:
    case ITEM_SELL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case ITEM_EQUIP_FAILURE:
    case ITEM_BUY_FAILURE:
    case ITEM_SELL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default itemReducer;
