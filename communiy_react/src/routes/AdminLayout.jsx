import { Outlet, useNavigate } from 'react-router-dom'; // ✅ Router 제거 후 Outlet 사용
import { useContext, useEffect } from 'react';
import Sidebar from '../Admin/dashboard/Sidebar';
import Navigation from '../Admin/dashboard/Navigation';
import AdminFooter from '../Admin/dashboard/AdminFooter';
import '/src/Admin/dashboard/dashboard.css';
import { AuthContext } from '../context/AuthContext';

const AdminLayout = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userData } = useContext(AuthContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      //비회원이거나 관리자가 아님
      if (isAuthenticated === false || userData?.role !== 0) {
        alert('접근 권한이 없습니다.');
        navigate('/');
      }
    }, 25); // 0.1초(100ms) 딜레이 후 실행
    return () => clearTimeout(timer);
  }, [isAuthenticated, userData, navigate]);

  return (
    <div className="app-container">
      <Sidebar />
      <div className="content-wrapper">
        <Navigation />
        <div className="main-content">
          <Outlet /> {/* ✅ 현재 선택된 관리자 페이지가 여기에서 렌더링됨 */}
        </div>
        <AdminFooter />
      </div>
    </div>
  );
};

export default AdminLayout;
