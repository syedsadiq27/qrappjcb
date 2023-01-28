/**
 * index.tsx
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import * as React from 'react';
import ReactDOM from 'react-dom/client';
import Obfuscate from 'react-obfuscate';

// Use consistent styling
import 'sanitize.css/sanitize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './styles/style.css';

// Import root app
import { App } from 'app';

import { HelmetProvider } from 'react-helmet-async';

import reportWebVitals from 'reportWebVitals';

// Initialize languages
import './locales/i18n';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

// Disable right-click
document.addEventListener('contextmenu', e => e.preventDefault());

function ctrlShiftKey(e, keyCode) {
  return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
}

document.onkeydown = e => {
  // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
  if (
    // @ts-ignore
    e.keyCode === 123 ||
    ctrlShiftKey(e, 'I') ||
    ctrlShiftKey(e, 'J') ||
    ctrlShiftKey(e, 'C') ||
    (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))
  )
    return false;
};

root.render(
  // <Obfuscate>
  <HelmetProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </HelmetProvider>,
  // </Obfuscate>,
);

// Hot reloadable translation json files
if (module.hot) {
  module.hot.accept(['./locales/i18n'], () => {
    // No need to render the App again because i18next works with the hooks
  });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
