import { createContext, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth'; // ✅ 기존 useAuth 가져오기

// ✅ Context 생성
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { isAuthenticated: authStatus, userData: fetchedUserData } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    setIsAuthenticated(authStatus);
  }, [authStatus]);

  useEffect(() => {
    setUserData(fetchedUserData);
  }, [fetchedUserData]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, userData }}>
      {children}
    </AuthContext.Provider>
  );
};
