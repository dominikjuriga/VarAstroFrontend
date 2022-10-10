import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context component.
export default function useAuth() {
  return useContext(AuthContext);
}