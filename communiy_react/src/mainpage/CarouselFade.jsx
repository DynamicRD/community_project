import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import { Carousel } from 'react-bootstrap';

const ExampleCarouselImage1 = '/images/slide01.png';
const ExampleCarouselImage2 = '/images/slide02.png';
const ExampleCarouselImage3 = '/images/slide03.png';

const CarouselFade = () => {
  return (
    <Carousel fade interval={3000}>
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
export default CarouselFade;
