import React from 'react';
import CarouselFade from './CarouselFade';
import ThemeCategory from './ThemeCategory';
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
      <ThemeCategory />
      <ProductList />
      <IntroductionSection />
      <HeroSection />
      <ServicesSection />
      <FooterLinks />
    </div>
  );
}
