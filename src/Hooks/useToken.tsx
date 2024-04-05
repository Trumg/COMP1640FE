import { useState } from "react";

const useToken = () => {
  const [token, setToken] = useState<string | null>(null);

  const saveToken = (token: string) => {
    setToken(token);
  };

  return { token, setToken: saveToken };
};

export default useToken;
