import { useState } from "react";
import { getModalidades } from "../services/modalidades";
import { Modalidad } from "../types/api";

export const useModalidades = () => {
  const [data, setData] = useState<Modalidad[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchModalidades = async (ubigeo: string) => {
    try {
      setLoading(true);
      setError(null);

      const res = await getModalidades(ubigeo);
      setData(res.dto);
    } catch (err: any) {
      setError(err.message || "Error al obtener modalidades");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchModalidades };
};
