import { useState } from "react";
import { useAuthContext } from "./useAuthContext";


type SignupResponse = {
  email: string;
  password: string;
  username: string;
  error?: string; 
};

export const useSignup = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

  const signup = async (email: string, password: string, username: string) => {
    setIsLoading(true);
    setError(null);

      const response = await fetch("http://localhost:3000/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, username }),
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
    return { signup, isLoading, error };
}
