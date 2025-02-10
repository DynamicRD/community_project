import { Link } from 'react-router-dom'; // Link 컴포넌트를 가져옵니다.

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-white navbar-custom">
    <div className="container d-flex justify-content-center">
      <Link className="navbar-brand navbar-logo" to="/user">
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
            { name: '홈', path: '/user' },
            { name: '정기모임', path: '/user/group/regular_list' },
            { name: '동행ㆍ소모임', path: '/user/group/one_list' },
            { name: '모임후기', path: '/user/review' },
            { name: '공지사항', path: '/user/announcements' },
          ].map((item, index) => (
            <li key={index} className="nav-item">
              <Link className="nav-link" to={item.path}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="icon-links d-flex align-items-center">
          <Link
            to="/user/login"
            className="ms-3"
            data-bs-toggle="tooltip"
            title="로그인"
          >
            <i className="bi bi-box-arrow-in-right middle-icon"></i>
          </Link>
          <Link
            to="/user/mypage"
            className="ms-3"
            data-bs-toggle="tooltip"
            title="마이페이지"
          >
            <i className="bi bi-person middle-icon"></i>
          </Link>
          <Link
            to="/user/favorites"
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

export default Navbar;
