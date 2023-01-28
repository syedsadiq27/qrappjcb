import { t } from 'i18next';
import { translations } from 'locales/translations';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const ScanQRCode = () => {
  const [coupunCode, setCoupunCode] = React.useState('');
  let navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    if (coupunCode == '') return;
    navigate(`/?qc=${coupunCode}`);
  };
  return (
    <section className="upi_section pt-3 pt-md-5 px-2 px-md-4" id="upiSection">
      <div className="container">
        <div id="userinfo" />
        <h1 className="upi_heading text-center mb-2 mb-md-3">
          {t(translations.welcome)}
        </h1>
        <div className="row justify-content-center">
          <div className="col-md-6 pt-2" pt-md-5>
            <form onSubmit={handleSubmit} name="pspfrm" method="post">
              <div className="upi_block mb-4 d-block">
                <div className="upi_input">
                  <input
                    type="text"
                    className="upi_control"
                    placeholder="Enter Coupun Code"
                    value={coupunCode}
                    onChange={e => setCoupunCode(e.target.value)}
                  />

                  {/*  <a id="redeemhis" href="https://taghash.co/jcb/assets/hppaywinlist-8to14july.pdf" download class="gen_btn w-100 py-3 mt-4">Winner list of Scan 8th July to 14th July 2022</a> */}
                </div>
                <div className="upi_input">
                  <button
                    className="upi_control gen_btn w-100 py-3 mt-4"
                    id="scanqr"
                    type="submit"

                    // onclick="javascript:scanqrcode()"
                  >
                    Submit
                  </button>
                </div>

                {/*a class="upi_control gen_btn w-100 py-3 mt-4" href="index.php?qc=12345&amc=1" >Submit</a*/}
              </div>
            </form>
          </div>
          {/*<div class="col-md-3">
        <img src="assets/images/ayushmaan.png" class="img-fluid" alt="">
      </div>*/}
        </div>
      </div>
    </section>
  );
};
