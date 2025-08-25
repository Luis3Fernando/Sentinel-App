import { useState } from "react";
import { getTemporal } from "../services/temporal";
import { Temporal } from "../types/api";

export const useTemporal = () => {
  const [data, setData] = useState<Temporal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTemporal = async () => {
    try {
      setLoading(true); 
      setError(null);

      const res = await getTemporal();
      setData(res.dto);
    } catch (err: any) {
      setError(err.message || "Error al obtener datos temporales");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchTemporal };
};
