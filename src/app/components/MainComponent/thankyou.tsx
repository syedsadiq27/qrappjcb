import { t } from 'i18next';
import { translations } from 'locales/translations';
import React from 'react';

export const ThankYou = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="home_banner1 w-100">
            {/* <div class="cashbackimg"><img src="assets/images/instant_cashback.png" class="img-fluid" alt=""></div> */}
            <div>
              <br />
              <br />
              <h4 className="text-uppercase banner_heading3">
                {t(translations.thankYouText)}
              </h4>
            </div>
            {/*img src="assets/images/banner.jpg" class="img-fluid m-auto" alt=""*/}
          </div>
        </div>
      </div>
    </>
  );
};
