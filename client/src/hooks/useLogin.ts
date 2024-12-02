import { useState } from "react";
import { useAuthContext } from "./useAuthContext";


type SignupResponse = {
  email: string;
  password: string;
  username: string;
  error?: string; 
};

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

      const response = await fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const json: SignupResponse = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(json.error || "An error occurred");
        return;
      }

      localStorage.setItem("user", JSON.stringify(json));

      dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);


    }
    return { login, isLoading, error };
}
