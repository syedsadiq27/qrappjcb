import { translations } from 'locales/translations';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Logo from '../../../assets/images/logo.png';

const NavBar = ({ isTranslateRequired = true }) => {
  const { t, i18n } = useTranslation();
  const handleLanguageChange = event => {
    const language = event.target.value;
    sessionStorage.setItem('language', language);
    i18n.changeLanguage(language);
  };

  const languages = [
    { code: 'en', label: t(translations.english) },
    { code: 'bn', label: t(translations.bengali) },
    { code: 'gu', label: t(translations.gujarati) },
    { code: 'hi', label: t(translations.hindi) },
    { code: 'kn', label: t(translations.kannada) },
    { code: 'ml', label: t(translations.malayalam) },
    { code: 'mr', label: t(translations.marathi) },
    { code: 'or', label: t(translations.odia) },
    { code: 'pa', label: t(translations.punjabi) },
    { code: 'ta', label: t(translations.tamil) },
    { code: 'te', label: t(translations.telugu) },
    { code: 'ur', label: t(translations.urdu) },
  ];

  return (
    <nav className="navbar main_nav navbar-expand-lg navbar-dark">
      <div className="d-flex justify-content-between align-items-center flex-wrap w-100">
        <div className="navbar_brand">
          <a className="navbar-brand logo" href="#">
            <img src={Logo} className="img-fluid" alt="Godrej Logo" />
          </a>
        </div>
        <div
          id="google_translate_element"
          style={!isTranslateRequired ? { display: 'none' } : {}}
        >
          <div className="skiptranslate goog-te-gadget" dir="ltr">
            <div id=":0.targetLanguage">
              <select
                className="goog-te-combo"
                aria-label="Language Translate Widget"
                onChange={handleLanguageChange}
              >
                <option value="">Select Language</option>
                {languages.map(item => (
                  <option
                    value={item.code}
                    selected={
                      item.code === (sessionStorage.getItem('language') || 'en')
                    }
                  >
                    {item.label}
                  </option>
                ))}
                {/* <option value="en">{t(translations.english)}</option>
                <option value="bn">{t(translations.bengali)}</option>
                <option value="gu">{t(translations.gujarati)}</option>
                <option value="hi">{t(translations.hindi)}</option>
                <option value="kn">{t(translations.kannada)}</option>
                <option value="ml">{t(translations.malayalam)}</option>
                <option value="mr">{t(translations.marathi)}</option>
                <option value="or">{t(translations.odia)}</option>
                <option value="pa">{t(translations.punjabi)}</option>
                <option value="ta">{t(translations.tamil)}</option>
                <option value="te">{t(translations.telugu)}</option>
                <option value="ur">{t(translations.urdu)}</option> */}
              </select>
            </div>
            Powered by &nbsp;
            <span style={{ whiteSpace: 'nowrap' }}>
              <a
                className="VIpgJd-ZVi9od-l4eHX-hSRGPd"
                href="https://translate.google.com"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="https://www.gstatic.com/images/branding/googlelogo/1x/googlelogo_color_42x16dp.png"
                  width="37px"
                  height="14px"
                  style={{ paddingRight: '3px' }}
                  alt="Google Translate"
                />
                Translate
              </a>
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
