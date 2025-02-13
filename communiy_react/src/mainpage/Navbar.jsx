import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; //
import { jwtDecode } from 'jwt-decode'; // ✅ default 대신 named import 사용
import Cookies from 'js-cookie';
import axios from 'axios';

function Navbar() {
  const { isAuthenticated, userData } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/member/logout',
        {},
        { withCredentials: true }
      );

      if (response.data.success) {
        alert('로그아웃 되었습니다.');
        window.location.reload();
      }
    } catch (error) {
      console.error('로그아웃 실패:', error);
      alert('로그아웃 중 오류가 발생했습니다.');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white navbar-custom">
      <div className="container d-flex justify-content-center">
        <Link className="navbar-brand navbar-logo" to="/">
          W CONCEPT
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            {[
              { name: '홈', path: '/' },
              { name: '정기모임', path: '/group/regular_list' },
              { name: '동행ㆍ소모임', path: '/group/one_list' },
              { name: '모임후기', path: '/review' },
              { name: '공지사항', path: '/announcements' },
            ].map((item, index) => (
              <li key={index} className="nav-item">
                <Link className="nav-link" to={item.path}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="icon-links d-flex align-items-center">
            {isAuthenticated ? (
              <>
                <div>
                  {userData?.role === 0
                    ? '👑 관리자님 환영합니다'
                    : `😊 ${userData?.name}님 환영합니다`}
                </div>

                <Link
                  className="ms-3"
                  data-bs-toggle="tooltip"
                  title="로그아웃"
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-left fs-4"></i>
                </Link>
                {userData?.role === 0 ? (
                  <>
                    {' '}
                    <Link
                      to="/admin"
                      className="ms-3"
                      data-bs-toggle="tooltip"
                      title="관리자페이지"
                    >
                      <i className="bi bi-gear fs-4"></i>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to={`/mypage/${userData?.no}`} // ✅ 백틱을 사용하여 동적 값 적용
                      className="ms-3"
                      data-bs-toggle="tooltip"
                      title="마이페이지"
                    >
                      <i className="bi bi-person middle-icon"></i>
                    </Link>
                    <Link
                      to="/favorites"
                      className="ms-3"
                      data-bs-toggle="tooltip"
                      title="즐겨찾기"
                    >
                      <i className="bi bi-suit-heart middle-icon"></i>
                    </Link>
                  </>
                )}
              </>
            ) : (
              <Link
                to="/login"
                className="ms-3"
                data-bs-toggle="tooltip"
                title="로그인"
              >
                <i className="bi bi-box-arrow-in-right middle-icon"></i>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
