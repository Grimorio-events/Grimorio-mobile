import { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-expo";

const useAuthToken = () => {
  const { getToken, sessionId } = useAuth();

  const [authState, setAuthState] = useState<{
    token: string | null;
    sessionId: string | null;
  }>({ token: null, sessionId: null });

  useEffect(() => {
    const fetchTokenAndSessionId = async () => {
      try {
        const jwt = await getToken();
        setAuthState({ token: jwt || null, sessionId: sessionId || null });
      } catch (error) {
        console.error("Error al obtener el token o sessionId:", error);
        setAuthState({ token: null, sessionId: null });
      }
    };

    fetchTokenAndSessionId();
  }, [getToken, sessionId]);

  return authState;
};

export default useAuthToken;
