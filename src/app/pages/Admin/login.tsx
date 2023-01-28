import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Logo from '../../../assets/images/logo.png';
import JCBFASTER from '../../../assets/images/JCB-Fastrac.jpg';

export const Login = () => {
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');

  let navigate = useNavigate();
  const auth = getAuth();

  const handleLogin = e => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, userName, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        //@ts-ignore
        sessionStorage.setItem('accessToken', user?.accessToken);
        navigate('/admin/generate');
      })
      .catch(error => {
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <section className="vh-100" style={{ backgroundColor: '#fcb026' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: '1rem' }}>
              <div className="row g-0">
                <div
                  className="col-md-6 col-lg-5 d-none d-md-block"
                  style={{ margin: 'auto' }}
                >
                  <img
                    // src="/assets/images/banner3.webp"
                    // src="https://wallpaperaccess.com/full/2960961.jpg"
                    // src="https://rare-gallery.com/thumbs/877353-JCB-Fastrac-4220-Tractor-Yellow-White-background.jpg"
                    src={JCBFASTER}
                    alt="login form"
                    className="img-fluid"
                    style={{ borderRadius: '1rem 0 0 1rem' }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i
                          className="fas fa-cubes fa-2x me-3"
                          style={{ color: '#fcb026' }}
                        />
                        {/* <span className="h1 fw-bold mb-0">Logo</span> */}
                        {/* < */}
                        <a className="navbar-brand logo" href="#">
                          <img
                            src={Logo}
                            className="img-fluid"
                            alt="Godrej Logo"
                          />
                        </a>
                      </div>
                      <h5
                        className="fw-normal mb-3 pb-3"
                        style={{ letterSpacing: '1px' }}
                      >
                        Sign into your account
                      </h5>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example17">
                          Email address
                        </label>
                        <input
                          type="email"
                          id="form2Example17"
                          value={userName}
                          onChange={e => setUserName(e.target.value)}
                          className="form-control form-control-lg"
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example27">
                          Password
                        </label>
                        <input
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          type="password"
                          id="form2Example27"
                          className="form-control form-control-lg"
                        />
                      </div>
                      <div className="pt-1 mb-4">
                        <button
                          className="btn btn-dark btn-lg btn-block"
                          type="button"
                          onClick={handleLogin}
                        >
                          Login
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
