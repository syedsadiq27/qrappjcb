import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore';
import React from 'react';
import { useForm } from 'react-hook-form';
import { db } from 'services/firebase';
// import CsvDownloadButton from 'react-json-to-csv';
import csvDownload from 'json-to-csv-export';
import './overlay.css';
import { useStore } from 'zustandS';

interface IFormInput {
  codePrefix: string;
  cashbackAmount: number;
  numberOfCode: number;
}

const collectionRef = collection(db, 'qr_code');

const addDocument = async ({ prefix, amount }) => {
  try {
    const create_UUID = () => {
      var dt = new Date().getTime();
      var uuid = `${prefix}xyxyxyxyxy`.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
      });
      return uuid.toUpperCase();
    };

    const documentId = create_UUID();
    const data = await findDocument({ documentId });

    if (data) return false;

    const Doc = {
      id: documentId,
      cashbackAmount: parseInt(amount),
      name: '',
      walletNumber: '',
      state: '',
      city: '',
      customerType: '',
      isProcessed: false,
      isActive: true,
      // created: Timestamp,
    };

    await setDoc(doc(db, 'qr_code', documentId), Doc);

    return documentId;
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

const findDocument = async ({ documentId }) => {
  const docRef = doc(db, 'qr_code', documentId);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

const exportGenertedCodes = async e => {
  console.log('startd...');
  const array = await getAllCollections(e);

  // const sortedarray = array.map(item =>
  //   Object.keys(item)
  //     .sort()
  //     .reduce((obj, key) => {
  //       obj[key] = item[key];
  //       return obj;
  //     }, {}),
  // );
  // console.log(sortedarray);
  // setExportData(sortedarray);

  downloadJSON(array);
};

const downloadJSON = exportData => {
  const dataToConvert = {
    data: exportData,
    filename: 'csv_export',
    delimiter: ',',
    // headers: ['id', 'cashbackAmount', 'isActive'],
  };
  csvDownload(dataToConvert);
};

const getAllCollections = async e => {
  e.preventDefault();
  try {
    const docsSnap = await getDocs(collectionRef);

    const array: any = [];

    docsSnap.forEach((doc: any) => {
      // console.log(doc.data());
      const data = doc.data();
      // const created = doc._

      data.createdDate = new Date(
        doc._document.createTime.timestamp.seconds * 1000,
      ).toLocaleDateString();

      data.createdTime = new Date(
        doc._document.createTime.timestamp.seconds * 1000,
      ).toLocaleTimeString();

      // console.log(data);
      array.push(data);
    });

    return array;
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const updateDocument = async ({ documentId, values }) => {
  try {
    const data = await findDocument({ documentId });
    const Doc = {
      ...data,
      ...values,
      isProcessed: true,
    };
    await setDoc(doc(db, 'qr_code', documentId), Doc);
    useStore.setState({ isProcessed: true });
  } catch (e) {
    console.error('Error updating document: ', e);
  }
};

export const GenerateForm = () => {
  const [loading, setLoading] = React.useState(false);
  const [generated, setGenerated] = React.useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit = async e => {
    const { cashbackAmount, codePrefix, numberOfCode } = e;
    const completedArray: any = [];
    setLoading(true);

    while (completedArray.length < numberOfCode) {
      const docId = await addDocument({
        prefix: codePrefix.toUpperCase(),
        amount: cashbackAmount,
      });
      if (docId) {
        completedArray.push(docId);
      }
      setGenerated(p => p + 1);
    }
    setGenerated(0);
    setLoading(false);

    alert('completed');
  };

  return (
    <>
      <div style={!loading ? { display: 'none' } : {}} className=" row overlay">
        <div className="overlay__inner">
          <div className="overlay__content">
            <span className="spinner"></span>
            <span style={{ background: '#222', opacity: 1 }}> Creating...</span>
          </div>
        </div>
      </div>
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
                      max: 10001,
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
              {/* {exportData.length > 0 && (
                <button ref={exportButton} type="button" onClick={downloadJSON} />
              )} */}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
