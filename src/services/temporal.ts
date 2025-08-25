import axios from "axios";
import { API_URL } from "../config/api";
import { ApiResponse, Temporal } from "../types/api";

export const getTemporal = async (): Promise<ApiResponse<Temporal[]>> => {
  const { data } = await axios.get<ApiResponse<Temporal[]>>(
    `${API_URL}/temporal`
  );
  return data;
};
