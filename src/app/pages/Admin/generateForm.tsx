import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  getDocs,
} from 'firebase/firestore';
import React from 'react';
import { useForm } from 'react-hook-form';
import { db } from 'services/firebase';
// import CsvDownloadButton from 'react-json-to-csv';
import csvDownload from 'json-to-csv-export';

interface IFormInput {
  codePrefix: string;
  cashbackAmount: number;
  numberOfCode: number;
}

const collectionRef = collection(db, 'qr_code');

export const GenerateForm = () => {
  const [exportData, setExportData] = React.useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit = e => {
    const { cashbackAmount, codePrefix, numberOfCode } = e;

    for (let i = 0; i < numberOfCode; i++) {
      addDocument({
        prefix: codePrefix.toUpperCase(),
        amount: cashbackAmount,
      });
    }
  };

  const addDocument = async ({ prefix, amount }) => {
    try {
      const Doc = {
        id: prefix,
        cashbackAmount: parseInt(amount),
        name: '',
        walletNumber: '',
        address: {
          state: '',
          city: '',
        },
        customerType: '',
        isProcessed: false,
        isActive: true,
      };
      const docRef = await addDoc(collectionRef, Doc);
      console.log('Document written with ID: ', docRef.id);
      await updateDoc(docRef, { id: `${prefix}${docRef.id}` });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const exportGenertedCodes = async e => {
    console.log('startd...');
    const array = await getAllCollections(e);

    const sortedarray = array.map(item =>
      Object.keys(item)
        .sort()
        .reduce((obj, key) => {
          obj[key] = item[key];
          return obj;
        }, {}),
    );
    console.log(sortedarray);
    setExportData(sortedarray);
  };

  const downloadJSON = () => {
    const dataToConvert = {
      data: exportData,
      filename: 'ip_addresses_report',
      delimiter: ',',
    };
    csvDownload(dataToConvert);
  };

  const getAllCollections = async e => {
    e.preventDefault();
    try {
      const docsSnap = await getDocs(collectionRef);

      const array: any = [];

      docsSnap.forEach(doc => {
        // console.log(doc.data());
        array.push(doc.data());
      });

      return array;
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-md-6 pt-2" pt-md-5>
          <form onSubmit={handleSubmit(onSubmit)}>
            <span>{/* <Trans i18nKey={'upiGuidelines'} /> */}</span>
            <div className="upi_block mb-4">
              <div className="upi_form" style={{ display: 'block' }}>
                <div className="upi_input">
                  <input
                    type="text"
                    placeholder="QR Code Prefix (JCB)"
                    className="upi_control"
                    id="walletno"
                    // placeholder={t(translations.paytmWalletLabel)!}
                    {...register('codePrefix', {
                      required: true,
                      maxLength: 3,
                      minLength: 3,
                    })}
                  />
                </div>
                {errors.codePrefix?.type === 'required' && (
                  <p role="alert">codePrefix is Required</p>
                )}
                {errors.codePrefix?.type === 'minLength' && (
                  <p role="alert">Prefix should be 3 digits long</p>
                )}
                {errors.codePrefix?.type === 'maxLength' && (
                  <p role="alert">Prefix should be 3 digits long</p>
                )}
              </div>
              <div className="upi_form" style={{ display: 'block' }}>
                <div className="upi_input">
                  <input
                    type="number"
                    placeholder="Cashback Amount in Rupees"
                    className="upi_control"
                    // placeholder={t(translations.paytmWalletLabel)!}
                    {...register('cashbackAmount', {
                      required: true,
                      min: 0,
                      max: 101,
                    })}
                  />
                  {errors.cashbackAmount?.type === 'required' && (
                    <p role="alert">Cash back amount is Required</p>
                  )}
                  {errors.cashbackAmount?.type === 'min' && (
                    <p role="alert"> Min Value should be 0</p>
                  )}
                  {errors.cashbackAmount?.type === 'max' && (
                    <p role="alert">Max amount is 100</p>
                  )}
                </div>
              </div>
              <div className="upi_form" style={{ display: 'block' }}>
                <div className="upi_input">
                  <input
                    type="number"
                    placeholder="Number of QR's to generate"
                    className="upi_control"
                    // placeholder={t(translations.paytmWalletLabel)!}
                    {...register('numberOfCode', {
                      required: true,
                      min: 0,
                      max: 101,
                    })}
                  />
                </div>
                {errors.numberOfCode?.type === 'required' && (
                  <p role="alert">Number is Required</p>
                )}
                {errors.numberOfCode?.type === 'min' && (
                  <p role="alert"> Min Value should be 0</p>
                )}
                {errors.numberOfCode?.type === 'max' && (
                  <p role="alert">Max amount is 100</p>
                )}
              </div>
              <button
                className="upi_control gen_btn w-100 py-3 mt-4"
                id="submitbtn"
                type="submit"
              >
                Generate QR Codes
              </button>

              <button
                className="upi_control gen_btn w-100 py-3 mt-4"
                id="submitbtn1"
                onClick={exportGenertedCodes}
                type="button"
              >
                Export Generated QR Codes
              </button>
              {exportData.length > 0 && (
                <button type="button" onClick={downloadJSON} />
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
