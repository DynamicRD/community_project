import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import { Carousel } from 'react-bootstrap';

const ExampleCarouselImage1 = '/images/slide01.png';
const ExampleCarouselImage2 = '/images/slide02.png';
const ExampleCarouselImage3 = '/images/slide03.png';

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

const CarouselFade = () => {
  return (
    <Carousel fade>
      <Carousel.Item>
        <img
          className="carousel-image d-block w-100"
          src={ExampleCarouselImage1}
          alt="Slide 1"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="carousel-image d-block w-100"
          src={ExampleCarouselImage2}
          alt="Slide 2"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="carousel-image d-block w-100"
          src={ExampleCarouselImage3}
          alt="Slide 3"
        />
      </Carousel.Item>
    </Carousel>
  );
};

const ThemeCategory = () => {
  const categories = [
    '전체',
    '문화/예술',
    '푸드/드링크',
    '취미',
    '여행',
    '교육',
  ];
  return (
    <section className="theme-category">
      <div>
        {categories.map((category, index) => (
          <span key={index}>{category}</span>
        ))}
      </div>
    </section>
  );
};

const ProductList = () => {
  const products = [
    { name: '상품1', price: '₩100,000', image: 'product01.png' },
    { name: '상품2', price: '₩100,000', image: 'product02.png' },
    { name: '상품3', price: '₩100,000', image: 'product03.png' },
    { name: '상품4', price: '₩100,000', image: 'product04.png' },
    { name: '상품5', price: '₩100,000', image: 'product05.png' },
    { name: '상품6', price: '₩100,000', image: 'product06.png' },
  ];
  return (
    <section className="container my-5">
      <h2 className="h4">인기순</h2>
      <div className="row">
        {products.map((product, index) => (
          <div key={index} className="col-md-4 product-card">
            <img
              src={`../images/${product.image}`}
              className="w-100"
              alt={product.name}
            />
            <h3 className="h6 mt-2">{product.name}</h3>
            <p className="text-muted">{product.price}</p>
          </div>
        ))}
        <i className="arrow1 bi bi-arrow-right-circle d-flex justify-content-lg-end"></i>
      </div>
    </section>
  );
};

const IntroductionSection = () => {
  const images = [
    '../images/card01.png',
    '../images/card02.png',
    '../images/card03.png',
  ];
  return (
    <section className="introduction-section">
      <h2 className="introduction-title">
        우리는 디자이너의 더 나은 환경을 위해 고민합니다.
      </h2>
      <p className="introduction-subtitle">
        ‘인더유닛’은 프리랜서 디자이너들이 자신의 능력을 최대한 발휘하고, 새로운
        가능성을 발견할 수 있도록 도움을 드리고자 합니다.
      </p>
      <div className="card-container d-flex justify-content-center gap-4">
        {images.map((image, index) => (
          <div key={index} className="card">
            <img src={image} alt={`Card ${index + 1}`} />
          </div>
        ))}
      </div>
      <h2 className="plus-title">PLUS+</h2>
    </section>
  );
};

const HeroSection = () => (
  <div className="hero-section">
    <div className="overlay"></div>
    <div className="hero-content">
      <h1 className="hero-title">
        업무에 필요한 건<br />잘 만들어진 환경과 집중도.
      </h1>
      <p className="hero-subtitle">Designer Agent Platform</p>
      <a href="#" className="hero-button">
        모임 참여 →
      </a>
    </div>
  </div>
);

const ServicesSection = () => {
  const services = [
    {
      title: '매니징 서비스 제공',
      description:
        '견적 협상, 업무 범위 조정, 그리고 소통의 부담 등 개인 디자이너로서 겪을 수 있던 다양한 문제들을 해결하는 데 도움을 줍니다.',
      image: '../images/support_img01.png',
      alt: 'Service 1',
    },
    {
      title: '포트폴리오 관리 및 홍보 지원',
      description:
        '프리랜서들의 포트폴리오를 관리하고 적절한 홍보 전략을 통해 더 넓은 기회를 제공합니다.',
      image: '../images/support_img02.png',
      alt: 'Service 2',
    },
  ];

  return (
    <section className="services-section">
      <div className="container">
        <h2 className="services-title">
          그 외 <span className="highlight">이런 부분들도</span> 지원받을 수
          있습니다.
        </h2>
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <div className="service-text">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
            <img
              src={service.image}
              alt={service.alt}
              className="service-image"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

const FooterLinks = () => {
  const link = [
    { text: '자주 묻는 질문', url: '#' },
    { text: '1:1 문의', url: '#' },
    { text: '이용 약관', url: '#' },
    { text: '개인정보 처리방침', url: '#' },
  ];

  return (
    <div className="container pt-5 pb-0 mt-5">
      <div className="row">
        <div className="col-md-6 text-md-end">
          <ul className="list-unstyled footer-links d-flex flex-row">
            {link.map((link, index) => (
              <li key={index}>
                <a href={link.url}>{link.text}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

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

const App = () => (
  <div className="">
    <Navbar />
    <CarouselFade />
    <ThemeCategory />
    <ProductList />
    <IntroductionSection />
    <HeroSection />
    <ServicesSection />
    <FooterLinks />
    <Footer />
  </div>
);

export default App;
