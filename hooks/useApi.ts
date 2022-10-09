import { API_URL } from "../static/API"
import { useEffect, useState } from "react"
import { toast } from "react-toastify";

const delay = (delayInms) => {
  return new Promise(resolve => setTimeout(resolve, delayInms));
}

const useApi = (path: string = "") => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetch(`${API_URL}/${path}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
      .catch(error => {
        setLoading(false)
        console.error(error)
        toast.error("Error while retrieving data")
      })
  }, [path])

  return { data, loading, error }
}

const useApiPost = (path: string = "", body: any) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetch(`${API_URL}/${path}`, {
      body: JSON.stringify(body)
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
      .catch(error => {
        toast.error("Error while retrieving data")
      })
  }, [path])

  return { data, loading, error }
}


export { useApi, useApiPost }