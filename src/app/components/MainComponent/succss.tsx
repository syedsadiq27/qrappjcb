import React from 'react';
import { Carousel } from './carousel';
import { Footer } from './footer';
import { ScanQRCode } from './scan-qr-code';
import { DisplayMessage } from './dispalyMessage';

export const Success = ({ message }) => {
  return (
    <main role="main">
      <Carousel />
      {/* <ScanQRCode /> */}
      <DisplayMessage message={message} />
      <Footer />
    </main>
  );
};
