import React, {
  createContext, ReactNode, useEffect,
  useMemo, useState,
} from "react";
import { useCookies } from "react-cookie";
import { isExpired, decodeToken } from "react-jwt";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { isResponseSuccessful } from "../../../helpers";
import { IServiceResponse } from "../../../models"
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
  const [jwt, setJwt] = useState<string>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);

  const router = useRouter();
  const AuthTokenCookieName = "AuthToken";
  const [cookies, setCookie, removeCookie] = useCookies([AuthTokenCookieName]);

  useEffect(() => {
    loginFromCookie()
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
        firstName: serviceResponse.data.user.firstName,
        lastName: serviceResponse.data.user.lastName,
        defaultCameraDeviceId: serviceResponse.data.user.defaultCameraDeviceId,
        defaultTelescopeDeviceId: serviceResponse.data.user.defaultTelescopeDeviceId,
        defaultObservatoryId: serviceResponse.data.user.defaultObservatoryId,
      })
      const authToken = serviceResponse.data.authToken;
      setJwt(authToken);
      setCookie(AuthTokenCookieName, authToken, {
        sameSite: "none"
      })
      toast(serviceResponse.message)
    } else {
      toast.error(serviceResponse.message)
    }
    setLoading(false);
    router.push("/")
  }

  const refetchSessionData = async () => {
    if (jwt) {
      const user = await getSessionData(jwt)
      if (user !== null) {
        setUser(user)
      }
    }
  }

  const getSessionData = async (jwt: string) => {
    const response = await fetch(`${API_URL}/Auth/session`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`
      }
    })

    const serviceResponse: IServiceResponse = await response.json();
    if (serviceResponse.success) {
      return serviceResponse.data;
    }
    return null;
  }

  async function loginFromCookie() {
    if (Object.keys(cookies).includes(AuthTokenCookieName)) {
      const authToken = cookies.AuthToken
      if (!isExpired(authToken)) {
        const user = await getSessionData(authToken)
        if (user !== null) {
          setUser(user)
          setJwt(authToken)
          console.log({ user })
        }
      } else {
        logout()
      }
    }

    setLoadingInitial(false);
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
      refetchSessionData,
      signUp,
      jwt,
      logout,
      loginFromCookie,
    }),
    [user, loading, error, jwt, refetchSessionData]
  );

  return (
    <AuthContext.Provider value={memoedValue} >
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
}

interface User {
  firstName: string;
  lastName: string;
  defaultCameraDeviceId?: number;
  defaultTelescopeDeviceId?: number;
  defaultObservatoryId?: number;
}

interface IDecodedToken {
  firstName: string,
  lastName: string,
  defaultObservatoryId?: number;
  defaultCameraDeviceId?: number;
  defaultTelescopeDeviceId?: number;
}

interface AuthContextType {
  user?: User;
  loading: boolean;
  error?: any;
  login: (email: string, password: string) => void;
  signUp: (email: string, name: string, password: string) => void;
  jwt?: string;
  logout: () => void;
  refetchSessionData: () => void;
  loginFromCookie: () => void;
}