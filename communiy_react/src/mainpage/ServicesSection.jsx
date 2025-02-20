import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

const ServicesSection = () => {
  const services = [
    {
      title: '채팅 서비스 제공',
      description:
        '모임 일정, 준비물 등 공지사항 공유와 서로의 관심사에 대한 일상 대화를 나눌 수 있도록 소통의 창구로써 채팅 서비스를 제공합니다.',
      image: '../images/support_img01.png',
      alt: 'Service 1',
    },
    {
      title: '통계 관리 및 홍보 지원',
      description:
        '통계 관리를 통해 일별/전체통계, 유저통계, 채널통계 등 적절한 홍보 전략을 수립하고 더 넓은 기회를 제공할 수 있도록 도움을 드립니다.',
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
