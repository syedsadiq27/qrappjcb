import React from 'react';
import { Carousel } from '../../components/MainComponent/carousel';
import { Footer } from '../../components/MainComponent/footer';
import { NotFoundComp } from './not-found';

export const NotFoundPage = () => {
  return (
    <main role="main">
      <Carousel />
      <NotFoundComp />
      <Footer />
    </main>
  );
};
