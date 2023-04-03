import React from 'react';
import { Trans } from 'react-i18next';
import { Carousel } from './carousel';
import { CashBack } from './cash-back';
import { Footer } from './footer';
import { Form } from './form';
import { ThankYou } from './thankyou';

const MainComponent = props => {
  return (
    <main role="main">
      <Carousel />
      <ThankYou />
      <section
        className="upi_section pt-3 pt-md-5 px-2 px-md-4"
        id="upiSection"
      >
        <div className="container">
          <CashBack amount={props.res.cashbackAmount} />
          {/*<button class="upi_control gen_btn" onClick="gotoUpi()">Redeem</button>*/}
          <h1 className="upi_heading text-center mb-2 mb-md-5">
            <Trans i18nKey={'enterDetails'} />
          </h1>
          <Form res={props.res} />
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default MainComponent;
