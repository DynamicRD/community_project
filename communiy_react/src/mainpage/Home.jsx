import React from 'react';
import CarouselFade from './CarouselFade';
import ProductList from './ProductList';
import IntroductionSection from './IntroductionSection';
import HeroSection from './HeroSection';
import ServicesSection from './ServicesSection';
import FooterLinks from './FooterLinks';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <CarouselFade />
      <ProductList />
      <IntroductionSection />
      <HeroSection />
      <ServicesSection />
      <FooterLinks />
    </div>
  );
}
