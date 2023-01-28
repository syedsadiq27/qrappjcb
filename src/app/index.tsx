/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { HomePage } from './pages/HomePage/Loadable';
import { useTranslation } from 'react-i18next';
import { Welcome } from './pages/Welcome';
import { NotFoundPage } from './pages/NotFoundPage/Loadable';
import { TermsAndConditions } from './pages/TNC';
import { Login } from './pages/Admin/login';
import { Generate } from './pages/Admin/generate';

export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="JCB Cashback"
        defaultTitle="JCB Cashback"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="welcome" element={<Welcome />} />
        <Route path="notfound" element={<NotFoundPage />} />
        <Route path="claimed" element={<NotFoundPage />} />
        <Route path="tnc" element={<TermsAndConditions />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/generate" element={<Generate />} />
      </Routes>
      <GlobalStyle />
    </BrowserRouter>
  );
}
