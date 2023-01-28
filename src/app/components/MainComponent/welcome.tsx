import React from 'react';
import { Carousel } from './carousel';
import { Footer } from './footer';
import { ScanQRCode } from './scan-qr-code';

export const Welcome = () => {
  return (
    <main role="main">
      <Carousel />
      <ScanQRCode />
      <Footer />
    </main>
  );
};
