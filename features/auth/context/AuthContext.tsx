import React, {
  createContext, ReactNode, useEffect,
  useMemo, useState,
} from "react";
import { useCookies } from "react-cookie";
import { isExpired, decodeToken } from "react-jwt";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { IServiceResponse, isResponseSuccessful } from "../../../helpers";
import { API_URL } from "../../../static/API";

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export default function AuthProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);

  const router = useRouter();
  const AuthTokenCookieName = "AuthToken";
  const [cookies, setCookie, removeCookie] = useCookies([AuthTokenCookieName]);

  useEffect(() => {
    loginFromCookie()
    setLoadingInitial(false);
  }, []);

  async function login(EmailAddress: string, Password: string) {
    setLoading(true);

    const userLogin = { EmailAddress, Password }
    const response = await fetch(`${API_URL}/Auth/login`, {
      body: JSON.stringify(userLogin),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    })

    const serviceResponse: IServiceResponse = await response.json();
    if (isResponseSuccessful(serviceResponse)) {
      setUser({
        FirstName: serviceResponse.data.user.firstName,
        LastName: serviceResponse.data.user.lastName,
        AuthToken: serviceResponse.data.authToken
      })
      setCookie(AuthTokenCookieName, JSON.stringify(serviceResponse.data.authToken))
      toast(serviceResponse.message)
    } else {
      toast.error(serviceResponse.message)
    }
    setLoading(false);
    router.push("/")
  }

  function loginFromCookie() {
    if (Object.keys(cookies).includes("AuthToken")) {
      if (!isExpired(cookies.AuthToken)) {
        const decodedToken: IDecodedToken | null = decodeToken(cookies.AuthToken)
        if (decodedToken) {
          setUser({
            FirstName: decodedToken.FirstName,
            LastName: decodedToken.LastName,
            AuthToken: cookies.AuthToken
          });
        }
      } else {
        logout()
      }
    }
  }

  function signUp(email: string, name: string, password: string) {
    setLoading(true);
    // TODO
    setLoading(false);
  }

  function logout() {
    toast.info("You Have Been Logged Out.")
    removeCookie(AuthTokenCookieName);
    setUser(undefined);
  }

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      login,
      signUp,
      logout,
      loginFromCookie,
    }),
    [user, loading, error]
  );

  return (
    <AuthContext.Provider value={memoedValue} >
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
}

interface User {
  FirstName: string;
  LastName: string;
  AuthToken: string;
  DefaultObservatoryId?: number;
}

interface IDecodedToken {
  FirstName: string,
  LastName: string,
  DefaultObservatoryId?: number;
}

interface AuthContextType {
  user?: User;
  loading: boolean;
  error?: any;
  login: (email: string, password: string) => void;
  signUp: (email: string, name: string, password: string) => void;
  logout: () => void;
  loginFromCookie: () => void;
}