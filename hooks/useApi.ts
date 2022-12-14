import { API_URL } from "../static/API"
import { useEffect, useMemo, useState } from "react"
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import useAuthentication from "../features/auth/hooks/useAuthentication";
import { HTTP } from "../static/HTTP";

interface IParameters {
  path?: string;
  requiresAuth?: boolean;
  method?: string;
}

const useApi = ({ path = "", requiresAuth = false, method = HTTP.GET }: IParameters) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const { user, jwt } = useAuthentication();

  const refetch = () => {
    fetchData();
  }

  const fetchData = () => {
    if (!requiresAuth || (requiresAuth && user !== undefined)) {
      fetch(`${API_URL}/${path}`, {
        headers: {
          "Authorization": `Bearer ${jwt}`
        },
        method
      })
        .then((res) => res.json())
        .then((data) => {
          setData(data.data)
          if (data.success === true && data.message) {
            toast(data.message);
          } else if (data.success === false) {
            toast.error(data.message === "" ? "Unkown error has occured." : data.message);
          }
        })
        .catch(error => {
          console.error(error)
          toast.error("Error while retrieving data")
        })
    } else {
      setError("Please, Log In To Access This Page.")
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchData();
  }, [path])

  return useMemo(() => {
    return { data, loading, error, setData, refetch }
  }, [path, data, loading])
}



export { useApi }