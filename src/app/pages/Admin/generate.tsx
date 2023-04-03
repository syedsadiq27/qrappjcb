import { Footer } from 'app/components/MainComponent/footer';
import NavBar from 'app/components/NavBar';
import React from 'react';
import { GenerateForm } from './generateForm';
import { useNavigate } from 'react-router-dom';

export const Generate = () => {
  const accessToken = sessionStorage.getItem('accessToken');
  let navigate = useNavigate();

  if (!accessToken) navigate('/jcb/admin/login');
  return (
    <>
      <NavBar isTranslateRequired={false} />
      <GenerateForm />
      <Footer />
    </>
  );
};
