import { Outlet } from 'react-router-dom'; // ✅ Router 제거 후 Outlet 사용
import Navbar from '../mainpage/Navbar';
import Footer from '../mainpage/Footer';
import '/src/Admin/dashboard/dashboard.css';
const UserLayout = () => {
  return (
    <div>
      <Navbar /> {/* ✅ 네비게이션 바 추가 */}
      <main>
        <Outlet /> {/* ✅ 현재 선택된 유저 페이지가 여기에 렌더링됨 */}
      </main>
      <Footer /> {/* ✅ 푸터 추가 */}
    </div>
  );
};

export default UserLayout;
