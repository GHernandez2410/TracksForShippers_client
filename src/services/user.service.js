import axios from "axios";

const API_URL = "http://localhost:8000/api/shipments/list";

const getShipments = (params) => {
  return axios.get(API_URL + `?type_of_goods=${params?.type_of_goods}&type_of_calculations=${params?.type_of_calculations}&start_city=${params?.start_city}&end_city=${params?.end_city}&start_time=${params?.start_time}&end_time=${params?.end_time}`);
};

export default {
  getShipments,
};