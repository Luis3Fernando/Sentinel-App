export interface ApiResponse<T> {
  type: string;
  dto: T;
  listMessage: string[];
}

export interface Riesgo {
  id: number;
  ubigeo_hecho: number;
  dist_hecho: string;
  total_robos: number;
  nivel_riesgo: string;
}
