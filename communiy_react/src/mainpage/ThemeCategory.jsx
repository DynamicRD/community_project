import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

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
export default ThemeCategory;
