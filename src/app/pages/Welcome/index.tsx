import MainComponent from 'app/components/MainComponent';
import NavBar from 'app/components/NavBar';
import React from 'react';
import { Welcome as WelcomeImpl } from 'app/components/MainComponent/welcome';

export const Welcome = () => {
  return (
    <>
      <NavBar />
      <WelcomeImpl />
    </>
  );
};
