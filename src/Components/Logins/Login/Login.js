import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import UserAuthApiService from '../../../Services/UserAuthApiService.js';
import '../../../skydash/css/vertical-layout-light/style.css';
import '../../../skydash/vendors/css/vendor.bundle.base.css';
import '../../../skydash/vendors/feather/feather.css';
import '../../../skydash/vendors/ti-icons/css/themify-icons.css';

 
function Login({props}) {

  const [username, setUsername]  = useState('')
  const [password, setPassword]  = useState('')
  const [isExpired, setExpiry]  = useState(false)

  const navigate = useNavigate();

  const verifyToken = (token) => {
     const decodedToken = jwt_decode(token)
     if(decodedToken.exp * 1000 < Date.now()){
          setExpiry(true)
          console.log("validating token")
          console.log(isExpired)
     }

  }
  
  const login = (props) =>{
    if(password !== '' && username !== ''){
      UserAuthApiService.login({username, password})
        .then()
            .then((response) => {
              if(response.accessToken){
                const decodedToken = jwt_decode(response.accessToken)
                if(decodedToken.exp * 1000 < Date.now()){
                  localStorage.removeItem('token');
                  navigate('/login');
                }
                else{
                  localStorage.setItem('token', response.accessToken);
                  localStorage.setItem('username', response.user.username);
                  localStorage.setItem('access', response.user.authorities);
                  navigate('/dashboard');
                }
              }  
              else{
                  console.log('error')
                  reset()  
              }
          }).catch((err) => {
            console.log(err)
            if(err.response.status){
               console.log('400')
              }
            })
    }
  }

  const reset = () =>{
    setUsername('');
    setPassword('');
  }


 
  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  <img src={process.env.PUBLIC_URL + '/images/logo.svg'} alt="logo" />
                </div>
                <form className="pt-3">

                  <div className="form-group">
                    <input type="email" 
                    className="form-control form-control-lg" 
                    id="username" 
                    placeholder="Username" 
                    value={username}
                    onChange = { (e) => setUsername(e.target.value)}/>
                  </div>

                  <div className="form-group">
                    <input type="password"
                      className="form-control form-control-lg" 
                      id="password"
                      placeholder="Password"
                      value={password}
                      onChange = { (e) => setPassword(e.target.value)} 
                      />
                  </div>

                  <div className="mt-3">
                    <a className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                    onClick = {login}
                    >
                      SIGN IN</a>
                  </div>
                  <div className="my-2 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input" />
                        Keep me signed in
                      </label>
                    </div>
                    <a href="#" className="auth-link text-black">Forgot password?</a>
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                    Don't have an account? <a href="/register" className="text-primary">Create</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* content-wrapper ends  */}
      </div>
  </div>

  )
}

export default Login
