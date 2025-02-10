import { Outlet } from 'react-router-dom'; // ✅ Router 제거 후 Outlet 사용
import Sidebar from '../Admin/dashboard/Sidebar';
import Navigation from '../Admin/dashboard/Navigation';
import AdminFooter from '../Admin/dashboard/AdminFooter';
import '/src/Admin/dashboard/dashboard.css';
const AdminLayout = () => (
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

export default AdminLayout;
