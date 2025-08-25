import axios from "axios";
import { API_URL } from "../config/api";
import { ApiResponse, Riesgo } from "../types/api";

export const getRiesgo = async (ubigeo: string): Promise<ApiResponse<Riesgo[]>> => {
  const { data } = await axios.get<ApiResponse<Riesgo[]>>(
    `${API_URL}/riesgo/?ubigeo=${ubigeo}`
  );
  return data;
};
