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

const collectionRef = collection(db, 'qr_code');

export function HomePage() {
  let navigate = useNavigate();
  const [res, setRes] = React.useState<any>();

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
      {res && <MainComponent res={res} />}
    </>
  );
}
