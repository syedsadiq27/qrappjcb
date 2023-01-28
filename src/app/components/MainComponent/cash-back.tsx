import { t } from 'i18next';
import { translations } from 'locales/translations';
import React from 'react';

export const CashBack = props => {
  return (
    <>
      <div className="banner_inner mb-3 mb-md-5">
        <div className="px-3 px-md-5">
          <h4 className="text-uppercase banner_heading3">
            {t(translations.congratsText)}
          </h4>
          <h3 className="banner_heading2 text-uppercase">
            {t(translations.cashbackAmout, { amount: props.amount })}
          </h3>
        </div>
      </div>
    </>
  );
};
