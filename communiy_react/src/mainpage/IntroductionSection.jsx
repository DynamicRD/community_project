import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

const IntroductionSection = () => {
  const images = [
    '../images/card01.png',
    '../images/card02.png',
    '../images/card03.png',
  ];
  return (
    <section className="introduction-section">
      <h2 className="introduction-title">
        모임을 통해 새로운 도전과 기회를 만나보세요!
      </h2>
      <p className="introduction-subtitle">
        ‘모락모락’은 사용자들이 자신의 능력을 최대한 발휘하고, 새로운 가능성을
        발견할 수 있도록 도움을 드리고자 합니다.
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
export default IntroductionSection;
