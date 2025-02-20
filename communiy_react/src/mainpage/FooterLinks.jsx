import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

const FooterLinks = () => {
  const link = [
    { text: '자주 묻는 질문', url: '/announcements/faq' },
    { text: '모임 개설 하기', url: '/group/regist' },
    { text: '홈페이지', url: '#' },
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
