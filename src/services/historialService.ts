import axios from "axios";
import { API_URL } from "../config/api";
import { ApiResponse, Historial } from "../types/api";

export const getHistorial = async (ubigeo: string, mes: number): Promise<ApiResponse<Historial[]>> => {
  const { data } = await axios.get<ApiResponse<Historial[]>>(
    `${API_URL}/historial/?ubigeo=${ubigeo}&mes=${mes}`
  );
  return data;
};