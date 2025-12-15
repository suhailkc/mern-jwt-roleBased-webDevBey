import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import api from "../config/axios";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [auth, setAuth] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get('/auth/refresh');
        setAuth({ 
          accessToken: res.data.accessToken, 
          role: res.data.user.role,
          email: res.data.user.email,
        });
      } catch (error) {
        setAuth(null);
        console.log(error);
      } finally {
        setLoading(false)
      }
    }
    checkAuth();
  }, [])

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);