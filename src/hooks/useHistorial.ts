import { useState } from "react";
import { getHistorial } from "../services/historialService";
import { Historial } from "../types/api";

export const useHistorial = () => {
  const [data, setData] = useState<Historial[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHistorial = async (ubigeo: string, mes: number) => {
    try {
      setLoading(true);
      setError(null);

      const res = await getHistorial(ubigeo, mes);
      setData(res.dto);
    } catch (err: any) {
      setError(err.message || "Error al obtener historial");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchHistorial };
};
