import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-white navbar-custom">
    <div className="container d-flex justify-content-center">
      <a className="navbar-brand navbar-logo" href="#">
        W CONCEPT
      </a>
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
            '홈',
            '정기모임',
            '동행ㆍ소모임',
            '모임후기',
            '공지사항',
            'FAQ',
          ].map((item, index) => (
            <li key={index} className="nav-item">
              <a className="nav-link" href="#">
                {item}
              </a>
            </li>
          ))}
        </ul>
        <div className="icon-links d-flex align-items-center">
          {['box-arrow-in-right', 'person', 'suit-heart', 'cart2'].map(
            (icon, index) => (
              <a key={index} href="#" className="ms-3">
                <i className={`bi bi-${icon} middle-icon`}></i>
              </a>
            )
          )}
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;
