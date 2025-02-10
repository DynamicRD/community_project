import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

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
export default ServicesSection;
