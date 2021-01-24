import { 
  SET_SHIPMENTS, 
  SHIPMENTS_FAIL, 
  SET_MESSAGE 
} from "./types";

import UserService from "../services/user.service";

export const getShipments = (params) => (dispatch) => {
  return UserService.getShipments(params).then(
    (response) => {
      dispatch({
        type: SET_SHIPMENTS,
        payload: { shipments: response.data },
      });
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: SHIPMENTS_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  );
};