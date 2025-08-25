import axios from "axios";
import { API_URL } from "../config/api";
import { ApiResponse, Modalidad } from "../types/api";

export const getModalidades = async (ubigeo: string): Promise<ApiResponse<Modalidad[]>> => {
  const { data } = await axios.get<ApiResponse<Modalidad[]>>(
    `${API_URL}/modalidades/?ubigeo=${ubigeo}`
  );
  return data;
};
