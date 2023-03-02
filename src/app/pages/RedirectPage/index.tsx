import React from 'react';
import { useNavigate } from 'react-router-dom';

export const RedirectPage = () => {
  let navigate = useNavigate();
  React.useEffect(() => {
    navigate('/jcb/welcome');
  }, [navigate]);
  return <></>;
};
