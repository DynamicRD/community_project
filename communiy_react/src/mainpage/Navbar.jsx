import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // ✅ default 대신 named import 사용
import Cookies from 'js-cookie';
import axios from 'axios';

const checkAndRefreshToken = async () => {
  try {
    //리프레시 토큰 시간 검증
    const response = await axios.get('/member/check_refresh', {
      withCredentials: true, // 쿠키 포함 요청
    });
    return true;
  } catch (error) {
    console.error('토큰 확인 중 오류 발생:', error);
    return false;
  }
};
const getData = async () => {
  try {
    const response = await axios.get(
      'http://localhost:8080/member/getdata',
      {}, // ✅ 요청 본문을 비워둠 (필요한 경우만 사용)
      {
        withCredentials: true, // ✅ 설정 객체에 추가
      }
    );

    console.log('서버 응답:', response.data);
    return response.data.member;
  } catch (error) {
    console.error('토큰 확인 중 오류 발생:', error);
    return null;
  }
};

const checkTokenExistence = async () => {
  try {
    const response = await axios.get(
      'http://localhost:8080/member/check_tokens',
      {
        withCredentials: true, // ✅ 쿠키 포함 요청
      }
    );

    return response.data; // { accessTokenExists: true, refreshTokenExists: true }
  } catch (error) {
    console.error('쿠키 확인 중 오류 발생:', error);
    return { accessTokenExists: false, refreshTokenExists: false };
  }
};

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [name, setName] = useState(null);
  const [accessToken, setAccessToken] = useState(false);
  const [refreshToken, setRefreshToken] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ checkTokenExistence() 실행 후 응답을 기다린 후 처리
        const { accessTokenExists, refreshTokenExists } =
          await checkTokenExistence();

        setAccessToken(accessTokenExists);
        setRefreshToken(refreshTokenExists);

        console.log('액세스토큰:', accessTokenExists);
        console.log('리프레시토큰:', refreshTokenExists);

        if (accessTokenExists) {
          setIsAuthenticated(true);
        } else if (refreshTokenExists) {
          await checkAndRefreshToken();
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('토큰 확인 중 오류 발생:', error);
      }
    };

    fetchData();
  }, []);

  // ✅ `isAuthenticated`가 변경될 때 getData 실행
  useEffect(() => {
    if (isAuthenticated) {
      const fetchUserData = async () => {
        const userData = await getData();

        if (userData) {
          // ✅ null 체크 추가
          setRole(userData.role);
          setName(userData.name);
        } else {
          console.warn('유저 데이터를 불러올 수 없습니다.');
        }
      };

      fetchUserData();
    }

    console.log('권한 상태:', isAuthenticated);
  }, [isAuthenticated]);

  const handleLogout = () => {
    console.log(role);
    Cookies.remove('access_Token', { path: '/' });
    Cookies.remove('refresh_Token', { path: '/' });
    alert('로그아웃 되었습니다.');
    window.location.reload();
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
                  {role === 0
                    ? '👑 관리자님 환영합니다'
                    : `😊 ${name}님 환영합니다`}
                </div>

                <Link
                  className="ms-3"
                  data-bs-toggle="tooltip"
                  title="로그아웃"
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-left fs-4"></i>
                </Link>
                {role === 0 ? (
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
