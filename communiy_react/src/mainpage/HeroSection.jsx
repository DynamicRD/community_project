import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

const HeroSection = () => (
  <div className="hero-section">
    <div className="overlay"></div>
    <div className="hero-content">
      <h1 className="hero-title">
        우리는
        <br />
        다양한 사람들과의 소통을 추구합니다.
      </h1>
      <p className="hero-subtitle">Designer Agent Platform</p>
      <a href="#" className="hero-button">
        모임 참여 →
      </a>
    </div>
  </div>
);

export default HeroSection;
