import { useEffect, useState } from "react";
import { getZonas } from "../services/zonasService";
import { Zona } from "../types/api";

export const useZonas = () => {
  const [data, setData] = useState<Zona[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchZonas = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await getZonas();
      setData(res.dto);
    } catch (err: any) {
      setError(err.message || "Error al obtener zonas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchZonas();
  }, []);

  return { data, loading, error, fetchZonas };
};
