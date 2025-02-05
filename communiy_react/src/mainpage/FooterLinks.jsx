import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

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
export default FooterLinks;
