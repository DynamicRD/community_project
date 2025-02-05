import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

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
export default ProductList;
