import { t } from 'i18next';
import { translations } from 'locales/translations';
import React from 'react';

const TnC = () => {
  const terms = Object.entries(translations)
    .filter(([key]) => key.includes('termsConditions'))
    .map(e => e[0]);
  return (
    <>
      <section
        className="upi_section py-3 py-md-5 px-2 px-md-4"
        id="upiSection"
        style={{ background: 'none' }}
      >
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-md-12">
              <form action="process.php" name="pspfrm" method="post">
                <h1 className="upi_heading text-center mb-4">
                  {t(translations.tncHeading)}
                </h1>
                <div className="upi_tnc">
                  <ul>
                    {terms.map(item => (
                      <li>{t(translations[item])}</li>
                    ))}
                  </ul>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TnC;
