import { t } from 'i18next';
import { translations } from 'locales/translations';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const DisplayMessage = ({ message }) => {
  return (
    <section className="upi_section pt-3 pt-md-5 px-2 px-md-4" id="upiSection">
      <div className="container">
        <div id="userinfo" />
        <h1 className="upi_heading text-center mb-2 mb-md-3">{message}</h1>
        <div className="row justify-content-center">
          <div className="col-md-6 pt-2" pt-md-5></div>
        </div>
      </div>
    </section>
  );
};
