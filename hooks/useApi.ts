import { API_URL } from "../static/API"
import { useEffect, useState } from "react"

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
  }, [path])

  return { data, loading, error }
}


export { useApi, useApiPost }