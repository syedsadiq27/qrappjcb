import React from 'react';

export const NotFoundComp = () => {
  return (
    <section className="upi_section pt-3 pt-md-5 px-2 px-md-4" id="upiSection">
      <div className="container">
        <div className="banner_inner mb-3 mb-md-5">
          <div className="px-3 px-md-5">
            <h4 className="text-uppercase banner_heading3">
              Coupon code is not valid
            </h4>
            <a href="/welcome" className="btn_primary btn px-3 py-2 m-auto">
              Go back to scan coupon
            </a>
          </div>
          <div></div>
        </div>
        <div id="geopermmsg" />
        <div className="row justify-content-center">
          <div className="col-md-6 pt-2" pt-md-5>
            <form action="process1.php" name="pspfrm" method="post"></form>
          </div>
        </div>
      </div>
    </section>
  );
};
