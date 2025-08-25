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

export interface Historial {
  id: number;
  anio: number;
  mes: number;
  ubigeo_hecho: number;
  total: number;
}

export interface Modalidad {
  id: number;
  ubigeo_hecho: number;
  p_modalidades: string;
  total: number;
}

export interface Temporal {
  id: number;
  mes: number;
  total: number;
}

export interface Zona {
  id: number;
  ubigeo_hecho: number;
  dist_hecho: string;
  total: number;
}
