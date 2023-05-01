import NavBar from 'app/components/NavBar';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  getDocs,
} from 'firebase/firestore';
import { db } from 'services/firebase';
import MainComponent from 'app/components/MainComponent';
import { useNavigate } from 'react-router-dom';
import { Success } from 'app/components/MainComponent/succss';
import { useStore } from '../../../zustandS';
import { shallow } from 'zustand/shallow';
const collectionRef = collection(db, 'qr_code');

export function HomePage() {
  let navigate = useNavigate();
  const [res, setRes] = React.useState<any>();

  const [isProcessed] = useStore(state => [state.isProcessed], shallow);

  const validateQRCode = async code => {
    const QRCode = code;
    const docRef = doc(db, 'qr_code', QRCode);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  };

  React.useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const qcId = urlParams.get('qc');

    if (!qcId) {
      navigate('/jcb/welcome');
      return;
    }
    const docSnap = validateQRCode(qcId);

    docSnap.then(res => {
      if (res?.cashbackAmount) {
        setRes(res);
      } else {
        navigate('/notfound');
      }
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <NavBar />

      {res && (
        <>
          {res?.isActive && !(isProcessed || res?.isProcessed) ? (
            <MainComponent res={res} />
          ) : isProcessed ? (
            <Success message="Thank You for scanning the QR code. Your cashback will be processed shortly." />
          ) : (
            <Success message="This QR code is already scanned, Your cashback will be processed shortly. please contact us if you not recieved the cashback" />
          )}
        </>
      )}
    </>
  );
}
