import React, {
  createContext, ReactNode, useEffect,
  useMemo, useState,
} from "react";
import { useCookies } from "react-cookie";
import { isExpired, decodeToken } from "react-jwt";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { isResponseSuccessful } from "../../../helpers";
import { AuthContextType, IRegisterValues, IServiceResponse, IUser } from "../../../models"
import { API_URL } from "../../../static/API";
import { HTTP } from "../../../static/HTTP";

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export default function AuthProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [user, setUser] = useState<IUser>();
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

  const setUserFromObject = (userObject: Partial<IRegister>) => {
    setUser({
      firstName: userObject.firstName,
      lastName: userObject.lastName,
      email: userObject.email
    })
  }

  async function login(EmailAddress: string, Password: string) {
    setLoading(true);

    const userLogin = { EmailAddress, Password }
    const response = await fetch(`${API_URL}/Auth/Login`, {
      body: JSON.stringify(userLogin),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    })

    const serviceResponse: IServiceResponse = await response.json();
    if (isResponseSuccessful(serviceResponse)) {
      setUserFromObject(serviceResponse.data.user);
      const authToken = serviceResponse.data.authToken;
      setJwt(authToken);
      console.log("attempting to set cookie")
      setCookie(AuthTokenCookieName, authToken, {
        sameSite: "none"
      })
      toast(serviceResponse.message)
      router.push("/")
    } else {
      toast.error(serviceResponse.message)
    }
    setLoading(false);
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
    const response = await fetch(`${API_URL}/Auth/Session`, {
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

  async function updateUser(values: Partial<IRegisterValues>) {
    const response = await fetch(`${API_URL}/Users`, {
      method: HTTP.PUT,
      body: JSON.stringify(values),
      headers: {
        "Authorization": `Bearer ${jwt}`,
        "Content-Type": "application/json"
      }
    })
    const serviceResponse: IServiceResponse = await response.json();
    if (serviceResponse.success) {
      toast(serviceResponse.message)
      setUserFromObject(serviceResponse.data)
    } else {
      toast.error(serviceResponse.message)
    }
  }

  async function loginFromCookie() {
    console.log(Object.keys(cookies).includes(AuthTokenCookieName))
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

  interface IRegister {
    email: string,
    password: string,
    confirmPassword: string,
    firstName: string,
    lastName: string
  }

  async function register(values: IRegister) {
    setLoading(true);
    const response = await fetch(`${API_URL}/Auth/Register`, {
      body: JSON.stringify(values),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    })

    const serviceResponse: IServiceResponse = await response.json();
    if (isResponseSuccessful(serviceResponse)) {
      toast(serviceResponse.message)
      router.push("/Auth/Login")
    } else {
      toast.error(serviceResponse.message)
    }
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
      register,
      refetchSessionData,
      updateUser,
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

