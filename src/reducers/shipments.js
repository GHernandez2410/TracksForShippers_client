import {
  SET_SHIPMENTS,
  SHIPMENTS_FAIL,
} from "../actions/types";

const initialState = { shipments: [] };

export default function (state = initialState, action) {
  const { type, payload } = action;
  
  switch (type) {
    case SET_SHIPMENTS:
      return {
        ...state,
        shipments: payload?.shipments,
      };
    case SHIPMENTS_FAIL:
      return {
        ...state,
        shipments: [],
      };
    default:
      return state;
  }
}
