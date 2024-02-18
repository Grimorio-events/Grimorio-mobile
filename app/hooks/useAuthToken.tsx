import { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-expo";

const useAuthToken = () => {
  const [token, setToken] = useState<string | null>(null);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const jwt = await getToken();
        setToken(jwt);
      } catch (error) {
        console.error("Error al obtener el token:", error);
        setToken(null);
      }
    };

    fetchToken();
  }, [getToken]);

  return token;
};

export default useAuthToken;
