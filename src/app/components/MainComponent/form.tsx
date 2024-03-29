import React, { useEffect, useState } from 'react';
import Select, { SingleValue } from 'react-select';
import { State, City } from 'country-state-city';
import { Trans } from 'react-i18next';
import { t } from 'i18next';
import { translations } from 'locales/translations';
// const translate = require('@iamtraction/google-translate');
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import axios from 'axios';
import { updateDocument } from 'app/pages/Admin/generateForm';

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
  paytmWallet?: number;
  upiId?: any;
  phoneNumber?: number;
  state: String;
  city: String;
  customerType: String;
  name: String;
  email: String;
  address: String;
}

type PayMethods = 'paytm' | 'upi';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const qcId = urlParams.get('qc');

export const Form = ({ res }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm<IFormInput>();
  const watchFields = watch(['state']);
  const onSubmit: SubmitHandler<IFormInput> = data => {
    setDisableSubmit(true);
    handleSubmitButton(data);
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

  const [disableSubmit, setDisableSubmit] = useState<boolean>(false);
  const [payMethod, setPayMethod] = useState<PayMethods>('paytm');

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

  console.log(errors);

  useEffect(() => {
    const city = City.getCitiesOfState('IN', selectedOption?.value!).map(e => ({
      label: e.name,
      value: e.name,
    }));
    setCity(city);
    if (selectedCity) setSelectedCity(city[0]);
  }, [selectedOption]);

  const handleSubmitButton = data => {
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

    function getFormattedDate() {
      var date = new Date();

      var month: any = date.getMonth() + 1;
      var day: any = date.getDate();
      var hour: any = date.getHours();
      var min: any = date.getMinutes();
      var sec: any = date.getSeconds();

      month = (month < 10 ? '0' : '') + month;
      day = (day < 10 ? '0' : '') + day;
      hour = (hour < 10 ? '0' : '') + hour;
      min = (min < 10 ? '0' : '') + min;
      sec = (sec < 10 ? '0' : '') + sec;

      var str =
        date.getFullYear() +
        '-' +
        month +
        '-' +
        day +
        '_' +
        hour +
        ':' +
        min +
        ':' +
        sec;

      /*alert(str);*/

      return str;
    }

    const finalData = {
      walletNumber: data.paytmWallet,
      city: data.city.label,
      state: data.state.label,
      customerType: data.customerType.label,
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      upiId: data.upiId,
    };

    const gooleSheetsData = {
      Wallet: data.paytmWallet,
      UPI: data.upiId,
      PhoneNumber: data.phoneNumber,
      QRCode: qcId,
      Amount: res.cashbackAmount,
      Time: getFormattedDate(),
      Status: 'Submitted',
    };

    axios
      .post(
        'https://sheet.best/api/sheets/b058722e-cf4c-46d4-a9a4-99953ead6334',
        gooleSheetsData,
      )
      .then(response => {
        updateDocument({ documentId: qcId, values: finalData });
      });
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
              <label
                className="d-flex align-items-center justify-content-start mr-3"
                style={{ fontFamily: 'Futura Md BT' }}
              >
                <input
                  type="radio"
                  name="pay_method"
                  value={'upi'}
                  onClick={() => setPayMethod('upi')}
                />
                <span className="ml-2">UPI ID</span>
              </label>
              <label
                className="d-flex align-items-center justify-content-start mr-3"
                style={{ fontFamily: 'Futura Md BT' }}
              >
                <input
                  type="radio"
                  name="pay_method"
                  defaultValue="wallet"
                  defaultChecked
                  onClick={() => setPayMethod('paytm')}
                />
                <span className="ml-2">Paytm Wallet</span>
              </label>
            </div>
            <div className="upi_block mb-4">
              <div
                id="upi_block"
                className="upi_form"
                style={payMethod === 'upi' ? { display: 'block' } : {}}
              >
                <div className="upi_input">
                  <input
                    type="text"
                    className="upi_control"
                    id="upiId"
                    placeholder="Enter Your UPI Id"
                    {...register('upiId', {
                      required: payMethod === 'upi',
                    })}
                  />
                </div>
                <div className="upi_input">
                  <input
                    type="text"
                    className="upi_control"
                    id="phoneNumber"
                    placeholder="Phone Number"
                    {...register('phoneNumber', {
                      required: payMethod === 'upi',
                    })}
                  />
                </div>
              </div>
              <div
                id="wallet_block"
                className="upi_form"
                style={payMethod === 'paytm' ? { display: 'block' } : {}}
              >
                <div className="upi_input">
                  <input
                    type="tel"
                    className="upi_control"
                    id="walletno"
                    placeholder={t(translations.paytmWalletLabel)!}
                    {...register('paytmWallet', {
                      required: payMethod === 'paytm',
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

              {/* Other */}

              <div
                id="other_block"
                className="upi_form"
                style={{ display: 'block' }}
              >
                <div className="upi_input">
                  <input
                    className="upi_control"
                    id="name"
                    placeholder={t(translations.nameLabel)!}
                    {...register('name', {
                      required: true,
                    })}
                  />
                  {errors.name?.type === 'required' && (
                    <p role="alert">Name is required</p>
                  )}
                </div>
                <div className="upi_input">
                  <input
                    type="email"
                    className="upi_control"
                    id="email"
                    placeholder={t(translations.emailLabel)!}
                    {...register('email', {
                      required: true,
                    })}
                  />
                  {errors.name?.type === 'required' && (
                    <p role="alert">Email is required</p>
                  )}
                </div>
                <div className="upi_input">
                  <input
                    type="text"
                    className="upi_control"
                    id="address"
                    placeholder={t(translations.addressLabel)!}
                    {...register('address', {
                      required: true,
                    })}
                  />
                  {errors.name?.type === 'required' && (
                    <p role="alert">Address is required</p>
                  )}
                </div>
              </div>

              {/* End other */}
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
                disabled={disableSubmit}
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
