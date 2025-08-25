import axios from "axios";
import { API_URL } from "../config/api";
import { ApiResponse, Zona } from "../types/api";

export const getZonas = async (): Promise<ApiResponse<Zona[]>> => {
  const { data } = await axios.get<ApiResponse<Zona[]>>(`${API_URL}/zonas`);
  return data;
};
