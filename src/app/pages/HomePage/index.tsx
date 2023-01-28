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
    const QRCode = code.substring(3);
    const docRef = doc(db, 'qr_code', QRCode);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  };

  React.useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const qcId = urlParams.get('qc');

    if (!qcId) {
      navigate('/welcome');
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
  });
  const addTodo = async e => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collectionRef, {
        id: 'JCB',
        name: '',
        walletNumber: '',
        address: {
          state: '',
          city: '',
        },
        customerType: '',
        isProcessed: false,
        isActive: true,
      });
      console.log('Document written with ID: ', docRef.id);
      await updateDoc(docRef, { id: `JCB${docRef.id}` });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const getCollections = async e => {
    e.preventDefault();
    try {
      const docsSnap = await getDocs(collectionRef);

      // console.log(docsSnap);

      docsSnap.forEach(doc => {
        console.log(doc.data());
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <>
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <NavBar />
      {res && <MainComponent res={res} />}

      {/* <button onClick={addTodo}> Click</button>
      <button onClick={getCollections}> get collections</button> */}
    </>
  );
}
