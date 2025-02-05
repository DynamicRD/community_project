import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <h5>고객 센터</h5>
          </div>
          <div className="col-md-2">
            <h5>소셜 미디어</h5>
            <div className="social-icons">
              <a href="#">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#">
                <i className="bi bi-youtube"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="text-center mt-3">
          <small>&copy; 2025 W Concept. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
