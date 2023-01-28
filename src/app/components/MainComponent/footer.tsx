import { t } from 'i18next';
import { translations } from 'locales/translations';
import React from 'react';
import { Trans } from 'react-i18next';

export const Footer = () => {
  return (
    <>
      <footer
        className="col-md-12 d-flex justify-content-center mt-5"
        // style={{ position: 'absolute', bottom: 0 }}
      >
        <div className="col-xl-10">
          <div className="d-flex align-items-center justify-content-between flex-wrap row">
            <div className="col-lg-3 col-md-4">
              <h4 className="footer_heading">{t(translations.followUs)}</h4>
              <div>
                <div className="social_block">
                  <ul className="social_links">
                    <li>
                      <a
                        href={process.env.REACT_APP_SOCIAL_LINKS_FACEBOOK}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img src="/assets/images/fb.png" alt="" />
                      </a>
                    </li>
                    <li>
                      <a href={process.env.REACT_APP_SOCIAL_LINKS_TWITTER}>
                        <img src="/assets/images/tw.png" alt="" />
                      </a>
                    </li>
                    <li>
                      <a
                        href={process.env.REACT_APP_SOCIAL_LINKS_INSTAGRAM}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img src="/assets/images/insta.png" alt="" />
                      </a>
                    </li>
                    <li>
                      <a href={process.env.REACT_APP_SOCIAL_LINKS_LINKEDIN}>
                        <img src="/assets/images/ld.png" alt="" />
                      </a>
                    </li>
                    <li>
                      <a href={process.env.REACT_APP_SOCIAL_LINKS_YOUTUBE}>
                        <img src="/assets/images/yt.png" alt="" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div style={{ width: '50%', margin: 'auto' }}>
              <ul className="footer_links justify-content-end flex_start_xs">
                <li style={{ fontSize: '8px' }}>
                  {t(translations.copyright, {
                    year: new Date().getFullYear(),
                  })}
                </li>
                <li style={{ fontSize: '10px' }}>
                  {/* {t(translations.companyAddress)} */}
                  <Trans
                    i18nKey={'companyAddress'}
                    values={{ address: process.env.REACT_APP_COMPANY_ADDRESS }}
                    address={'asjasnas'}
                  ></Trans>
                </li>
                <li style={{ fontSize: '10px' }}>
                  {/* CIN Number : U74899DL1979PLC009431 */}
                  {t(translations.cin, {
                    cinNumber: process.env.REACT_APP_COMPANY_CIN,
                  })}
                </li>
                <li style={{ fontSize: '10px' }}>
                  {t(translations.contact, {
                    contactNumber: process.env.REACT_APP_COMPANY_CONTACT,
                  })}
                </li>
                <li style={{ fontSize: '10px' }}>
                  {t(translations.tollFree, {
                    tollFreeNumber: process.env.REACT_APP_COMPANY_TOLLFREE,
                  })}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
