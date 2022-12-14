import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function useAuthentication() {
  return useContext(AuthContext);
}