import React from 'react';
import NavBar from '../../components/NavBar';
import { Footer } from '../../components/MainComponent/footer';
import TnC from 'app/components/TnC/tnc';
// import { NotFoundComp } from './not-found';

export const TermsAndConditions = () => {
  return (
    <main role="main">
      <NavBar />
      <TnC />
      <Footer />
    </main>
  );
};
