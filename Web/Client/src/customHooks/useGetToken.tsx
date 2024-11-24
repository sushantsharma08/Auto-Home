import { useState, useEffect } from "react";


const useGetToken = (): string | null => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  return token;
};

export default useGetToken;
