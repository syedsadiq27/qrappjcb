import React, { useEffect, useState } from 'react';
import Select, { SingleValue } from 'react-select';
import { State, City } from 'country-state-city';
import { Trans } from 'react-i18next';
import { t } from 'i18next';
import { translations } from 'locales/translations';
// const translate = require('@iamtraction/google-translate');
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

type OptionType = {
  value: string;
  label: string;
};

const merchantType = [
  { label: 'Customer', value: 'customer' },
  { label: 'Mechanic', value: 'mechanic' },
  { label: 'Induvidual Workshop', value: 'workshop' },
];

const state: OptionType[] = State.getStatesOfCountry('IN').map(e => ({
  label: e.name,
  value: e.isoCode,
}));

interface IFormInput {
  paytmWallet: number;
  state: String;
  city: String;
  customerType: String;
}

export const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm<IFormInput>();

  const watchFields = watch(['state']);
  const onSubmit: SubmitHandler<IFormInput> = data => {
    console.log(data);
    handleSubmitButton();
  };

  const [walletNumber, setWalletNumber] = useState('');
  const [selectedOption, setSelectedOption] =
    useState<SingleValue<OptionType>>();
  const [selectedMerchantType, setSelectedMerchantType] =
    useState<SingleValue<OptionType>>();
  const [city, setCity] = useState(
    City.getCitiesOfState('IN', selectedOption?.value!).map(e => ({
      label: e.name,
      value: e.name,
    })),
  );
  const [acceptTerms, setAcceptTerms] = React.useState(false);
  const [selectedCity, setSelectedCity] = useState<SingleValue<OptionType>>(
    city[0],
  );

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name == 'state') {
        // @ts-ignore
        const state = value.state.value;
        const city = City.getCitiesOfState('IN', state).map(e => ({
          label: e.name,
          value: e.name,
        }));
        setCity(city);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const city = City.getCitiesOfState('IN', selectedOption?.value!).map(e => ({
      label: e.name,
      value: e.name,
    }));
    setCity(city);
    if (selectedCity) setSelectedCity(city[0]);
  }, [selectedOption]);

  const handleSubmitButton = () => {
    const create_UUID = () => {
      var dt = new Date().getTime();
      var uuid = `ORDERID_xxxxxyxxxyxx`.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
      });
      return uuid.toUpperCase();
    };

    const orderId = create_UUID();
    // e.preventDefault();

    const finalData = {
      walletNumber,
      address: {
        city: selectedCity?.label,
        state: selectedOption?.label,
      },
      customerType: selectedMerchantType?.value,
    };

    console.log(finalData);

    fetch(
      'https://staging-dashboard.paytm.com/bpay/api/v1/disburse/order/wallet/gratification',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-mid': '{mid}',
          'x-checksum': '{checksum}',
        },
        body: JSON.stringify({
          subwalletGuid: '28054249-XXXX-XXXX-af8f-fa163e429e83',
          orderId: orderId,
          beneficiaryPhoneNo: walletNumber,
          amount: '1.00',
        }),
      },
    );

    // const cfSdk = require('cashfree-sdk');

    // //access the PayoutsSdk from CashfreeSDK
    // const { Payouts } = cfSdk;

    // // Instantiate Cashfree Payouts
    // const payoutsInstance = new Payouts({
    //   env: 'TEST',
    //   clientId: 'CF295059CF724H5ROKEU1D902S5G ',
    //   clientSecret: 'a061409e11a08146e16527c1080d4c84cb2c951e',
    // });

    // fetch('http://payout-gamma.cashfree.com/payout/v1/authorize', {
    //   method: 'POST',
    //   headers: {
    //     'X-Client-Id': 'CF295059CF724H5ROKEU1D902S5G',
    //     'X-Client-Secret': 'a061409e11a08146e16527c1080d4c84cb2c951e',
    //     // 'cache-control': 'no-cache',
    //   },
    // });

    // fetch('https://sandbox.cashfree.com/pg/orders', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'x-api-version': '2022-09-01',
    //     'x-client-id': '<App ID>',
    //     'x-client-secret': '<Secret Key>',
    //   },
    //   body: '{\n  "order_id": "order_1626945143520",\n  "order_amount": 10.12,\n  "order_currency": "INR",\n  "order_note": "Additional order info"\n  "customer_details": {\n   "customer_id": "12345",\n    "customer_name": "name",\n    "customer_email": "care@cashfree.com",\n    "customer_phone": "9816512345"\n  }\n}',
    // });

    // fetch('http://{{Host%20Url}}/payout/v1.2/directTransfer', {
    //   method: 'POST',
    //   headers: {
    //     Authorization: 'Bearer {{Token}}',
    //     'Content-Type': 'application/json',
    //   },
    //   // body: '{\n "amount": "20.00",\n "transferId": "JUNOB201814n009",\n "transferMode": "neft",\n "remarks": "test",\n "beneDetails" : {\n     "bankAccount": "026291800001191",\n     "ifsc": "YESB0000262",\n     "name": "Ranjiths",\n     "email": "ranjiths@cashfree.com",\n     "phone": "9999999999",\n     "address1": "any_dummy_value"\n },\n "paymentInstrumentId": "YESB_CONNECTED"\n }',
    //   body: JSON.stringify({
    //     amount: '20.00',
    //     transferId: 'JUNOB201814n009',
    //     transferMode: 'neft',
    //     remarks: 'test',
    //     beneDetails: {
    //       bankAccount: '026291800001191',
    //       ifsc: 'YESB0000262',
    //       name: 'Ranjiths',
    //       email: 'ranjiths@cashfree.com',
    //       phone: '9999999999',
    //       address1: 'any_dummy_value',
    //     },
    //     paymentInstrumentId: 'YESB_CONNECTED',
    //   }),
    // });
  };

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-md-6 pt-2" pt-md-5>
          <form onSubmit={handleSubmit(onSubmit)}>
            <span>
              <Trans i18nKey={'upiGuidelines'} />
            </span>
            <div className="d-flex align-items-center justify-content-start mt-3">
              <label className="d-flex align-items-center justify-content-start mr-3">
                <input
                  type="radio"
                  name="pay_method"
                  defaultValue="wallet"
                  defaultChecked
                />
                <span className="ml-2">Paytm Wallet</span>
              </label>
            </div>
            <div className="upi_block mb-4">
              <div id="upi_block" className="upi_form">
                <div className="upi_input">
                  <input
                    type="text"
                    className="upi_control"
                    id="upiid"
                    name="upiid"
                    placeholder="Enter Your UPI Id"
                  />
                </div>
                <div className="upiphinput" />
              </div>
              <div
                id="wallet_block"
                className="upi_form"
                style={{ display: 'block' }}
              >
                <div className="upi_input">
                  <input
                    type="tel"
                    className="upi_control"
                    id="walletno"
                    placeholder={t(translations.paytmWalletLabel)!}
                    {...register('paytmWallet', {
                      required: true,
                      maxLength: 10,
                      minLength: 10,
                    })}
                  />
                  {errors.paytmWallet?.type === 'required' && (
                    <p role="alert">Phone number is required</p>
                  )}
                  {errors.paytmWallet?.type === 'minLength' && (
                    <p role="alert">Phone number should be 10 Digits</p>
                  )}
                  {errors.paytmWallet?.type === 'maxLength' && (
                    <p role="alert">
                      Phone number cannot be more than 10 Digits
                    </p>
                  )}
                </div>
              </div>
              <div id="online_block" className="upi_form">
                <p className="font-weight-bold">Please Fill Below Fileds</p>
                <div className="upi_input">
                  <input
                    type="text"
                    className="upi_control"
                    name="name"
                    id="name"
                    placeholder={t(translations.nameLabel)!}
                  />
                </div>
                <div className="acphinput" />
                <div className="upi_input">
                  <input
                    type="number"
                    className="upi_control"
                    name="ac_number"
                    id="ac_number"
                    placeholder={t(translations.accountNumberLabel)!}
                  />
                </div>
                <div className="upi_input">
                  <input
                    type="password"
                    className="upi_control"
                    name="re_ac_number"
                    id="re_ac_number"
                    placeholder={t(translations.retypeAccountNumberLabel)!}
                  />
                </div>
                <div className="upi_input">
                  <input
                    type="text"
                    className="upi_control"
                    name="ifsc"
                    id="ifsc"
                    placeholder={t(translations.ifscCodeLabel)!}
                  />
                </div>
              </div>
              <div id="editbtn" />
              <div id="locelm">
                <div className="upi_input">
                  <Controller
                    name="state"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value, ref } }) => (
                      <Select
                        ref={ref}
                        options={state}
                        isSearchable
                        onChange={val => {
                          onChange(val);
                        }}
                        placeholder={t(translations.selectStateLabel)!}
                        classNames={{
                          menuList: () => 'upi-control',
                          control: () => 'upi-control',
                        }}
                      />
                    )}
                  />
                  {errors.state?.type === 'required' && (
                    <p role="alert">State name is required</p>
                  )}
                </div>
                <div className="upi_input">
                  <Controller
                    name="city"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value, ref } }) => (
                      <Select
                        ref={ref}
                        options={city}
                        isSearchable
                        onChange={val => onChange(val)}
                        placeholder={t(translations.selectCityLabel)!}
                        classNames={{
                          menuList: () => 'upi-control',
                          control: () => 'upi-control',
                        }}
                      />
                    )}
                  />
                  {errors.city?.type === 'required' && (
                    <p role="alert">City name is required</p>
                  )}
                </div>
                <div className="upi_input">
                  <Controller
                    name="customerType"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value, ref } }) => (
                      <Select
                        ref={ref}
                        options={merchantType}
                        isSearchable
                        onChange={val => onChange(val)}
                        placeholder={t(translations.selectCustomerTypeLabel)!}
                        classNames={{
                          menuList: () => 'upi-control',
                          control: () => 'upi-control',
                        }}
                      />
                    )}
                  />
                  {errors.customerType?.type === 'required' && (
                    <p role="alert">Customer Type is required</p>
                  )}
                </div>
              </div>
              <div id="loading" />
              <input
                type="hidden"
                id="g-recaptcha-response"
                name="g-recaptcha-response"
                defaultValue="03AD1IbLC89Hfh_Uc3Sm10iSZ3Z9n4LsDqC09tfUfQwXJ9ZgdGAFzrbzMBc-LIANsgHtr8lf9RHpwxHip411GOT4MVHkPWuRUM_ARg2YqDBoPZpvg2V-rLjcxg6dD4u6K6j6pSZP_WtEeMpLgE107d4csvCNzwlGzzy0nPvkSJLqQS3X-j4EqqNRnlY50CjenLS1WOgGeLibuMEl6Be5eg9aGp0zv1-LK3RRfBXW_EG727IjZpXNbNFK72Dx2lF3EC81L067oma6Z0Q7rBi-iAhNgl3ErynohiFbmD62OqBQsHHNuwtX5nM6zQ27zfDpzDXfeZSHvARdD5TrYs24Gfkw1ii19Zabsz5mTFHtaShOuyBMcCmndqizNjMReLhHyjoSwd1nr2myRdY88UuGlXME22BchoDhrqhjMbthp6TS3400kO5veBB1VDzlBMFEz3xNQXKBDapovFnqrDxJTCO2QEoUX0Kgid2T24xg7mFCLAN1ERkyP1VQCDiGBpT5HASYlS_lAuK1w9PrOCVJbeuqJoCm-SVkXsLA"
              />
              <input type="hidden" name="qcn" defaultValue="JCBAC811FB4E62" />
              <input
                type="hidden"
                name="action"
                defaultValue="validate_captcha"
              />
              <input type="hidden" id="latlng" name="latlng" />
              <input type="hidden" id="mode" name="mode" />
              <input
                type="hidden"
                id="uposerror"
                name="uposerror"
                defaultValue="User denied the request for Geolocation."
              />
              <div
                className="d-flex align-items-center justify-content-start mb-0 py-3"
                id="tcbox"
                style={{ gap: '5px' }}
              >
                <input
                  type="checkbox"
                  id="tcread"
                  name="tcread"
                  defaultValue="tcread"
                  checked={acceptTerms}
                  onClick={e => setAcceptTerms(e => !e)}
                />
                <div className="d-flex align-items-center term_text">
                  <span className="font-weight-bold ml-2">I accept the</span>
                  <a href="/tnc" className="m-0 ml-1 terms_link">
                    Terms and Conditions
                  </a>
                </div>
              </div>
              <button
                className="upi_control gen_btn w-100 py-3 mt-4"
                id="submitbtn"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
