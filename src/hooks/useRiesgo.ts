import { useEffect, useState } from "react";
import { getRiesgo } from "../services/riesgoService";
import { Riesgo } from "../types/api";

export const useRiesgo = (ubigeo: string) => {
    const [data, setData] = useState<Riesgo[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await getRiesgo(ubigeo);
                setData(response.dto);
            } catch (err: any) {
                console.log("Error detalle:", err.response?.data || err.message);
                setError("Error al obtener los datos de riesgo");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [ubigeo]);

    return { data, loading, error };
};
