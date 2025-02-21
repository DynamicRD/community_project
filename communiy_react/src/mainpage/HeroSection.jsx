import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import { Link } from 'react-router';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const HeroSection = () => (
  
  <div className="hero-section">
    <div className="overlay"></div>
    <div className="hero-content">
      <h1 className="hero-title">
        당신의 취미와 관심사를
        <br />
        함께 나눌 사람들을 찾아보세요!
      </h1>
      <p className="hero-subtitle">Premium Community Platform</p>
      <Link
        to={'/group/regist'}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
      <a href="" className="hero-button">
        모임 개설 하러가기 →
      </a>
      </Link>
    </div>
  </div>
);

export default HeroSection;
