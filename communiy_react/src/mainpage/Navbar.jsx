import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Link 컴포넌트를 가져옵니다.

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    // 로컬 스토리지에서 JWT 토큰 확인
    const token = localStorage.getItem('jwtToken');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);
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
            {isAuthenticated && <div>철수님 환영합니다</div>}
            {isAuthenticated ? (
              <Link
                to="/login"
                className="ms-3"
                data-bs-toggle="tooltip"
                title="로그아웃"
                onClick={() => {
                  localStorage.removeItem('jwtToken'); // 토큰 삭제
                  alert('로그아웃 됐습니다.');
                  window.location.reload(); // 페이지 새로고침
                }}
              >
                <i className="bi bi-box-arrow-left fs-4"></i>
              </Link>
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

            <Link
              to="/mypage"
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
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
