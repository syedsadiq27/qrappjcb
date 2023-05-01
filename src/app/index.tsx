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
import { RedirectPage } from './pages/RedirectPage';
import { t } from 'i18next';
import { translations } from 'locales/translations';

// import GoogleSheetsProvider from 'react-db-google-sheets';

export function App() {
  const { i18n } = useTranslation();

  React.useEffect(() => {
    console.log('executing.....');
    const language = sessionStorage.getItem('language');
    if (!language) sessionStorage.setItem('language', 'en');
  }, []);
  return (
    // <GoogleSheetsProvider>
    <BrowserRouter>
      <Helmet
        titleTemplate={t(translations.title)!}
        defaultTitle={t(translations.title)!}
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>

      <Routes>
        <Route path="/jcb" element={<HomePage />} />
        <Route path="/jcb/welcome" element={<Welcome />} />
        <Route path="/jcb/notfound" element={<NotFoundPage />} />
        <Route path="/jcb/claimed" element={<NotFoundPage />} />
        <Route path="/jcb/tnc" element={<TermsAndConditions />} />
        <Route path="/jcb/admin/login" element={<Login />} />
        <Route path="/jcb/admin/generate" element={<Generate />} />
        <Route path="/" element={<RedirectPage />} />
      </Routes>
      <GlobalStyle />
    </BrowserRouter>
    // </GoogleSheetsProvider>
  );
}
