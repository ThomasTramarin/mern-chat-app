import { createContext, ReactNode, useReducer, Dispatch, useEffect } from "react";

interface User {
  username: string;
  email: string;
}

interface AuthState {
  user: User | null;
}


interface AuthAction {
  type: "LOGIN" | "LOGOUT";
  payload?: User;
}


interface AuthContextData {
  user: User | null;
  dispatch: Dispatch<AuthAction>;
}

export const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload || null,
      };
    case "LOGOUT":
      return {
        user: null,
      };
    default:
      return state;
  }
};


export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") as string);

    if(user){
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  return (
    <AuthContext.Provider value={{...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
