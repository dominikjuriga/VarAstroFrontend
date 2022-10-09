import React, { createContext } from "react"

interface User {
  FirstName: string
}

interface IAuthContext {
  user?: User,
  login: (email: string, password: string) => void,
  logout: () => void
}

const AuthContext = createContext<IAuthContext>(
  {} as IAuthContext
)

interface IAuthProvider {
  children: React.ReactNode
}
export function AuthProvider({ children }: IAuthProvider): JSX.Element {
  const [user, setUser] = useState<User>();
}