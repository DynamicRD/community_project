import { useState } from 'react';
import '/src/Admin/dashboard/dashboard.css';
export const useAuth = () => {
  const [isAdmin, setIsAdmin] = useState(false); // 기본적으로 일반 사용자

  return { isAdmin, setIsAdmin };
};
