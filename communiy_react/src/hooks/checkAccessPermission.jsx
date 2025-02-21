import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckAccessPermission = (isAuthenticated, userData, navigate) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      // 비회원이거나 관리자가 아님
      if (isAuthenticated === false) {
        alert('접근 권한이 없습니다.');
        navigate('/');
      } else {
        const pathSegments = window.location.pathname.split('/');
        const pageId = pathSegments[pathSegments.length - 1];
        if (userData?.no.toString() !== pageId) {
          alert('접근 권한이 없습니다.');
          navigate('/');
        }
      }
    }, 100); // 0.1초(100ms) 딜레이 후 실행

    return () => clearTimeout(timer);
  }, [isAuthenticated, userData, navigate]);
};

export default CheckAccessPermission;
