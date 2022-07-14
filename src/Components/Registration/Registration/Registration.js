import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import UserAuthApiService from '../../../Services/UserAuthApiService.js';


function Registration() {

  const location = useLocation()

  const [username, setUsername]  = useState('')
  const [password, setPassword]  = useState('')
  const [redirect, setRedirect]  = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')

  const resetAuthFields = () => {
    setUsername('')
    setPassword('')
    setConfirmPassword('')
  }

  const redirectToLogin = (response) => {
    if(confirmPassword){
      console.log()
    } 
  }

  const registerUser = () => {
    if(username !== "" && password !== "" ) {
      if(password === confirmPassword){
        UserAuthApiService.registerUser({username, password})
        .then()
            .then( response => {})
            .then(resetAuthFields())
            .then(response => redirectToLogin(response))
            .catch( error => {})
      }
    }

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
              <h4>New here?</h4>
              <form className="pt-3">

                <div className="form-group">
                  <input type="text" className="form-control form-control-lg" 
                    placeholder="Username" 
                    value={username}
                    onChange = { (e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="form-group">
                  <input type="password" className="form-control form-control-lg" 
                    placeholder="Password" 
                    value={password}
                    onChange = { (e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="form-group">
                  <input type="password" className="form-control form-control-lg" 
                    placeholder="Confirm Password" 
                    value={confirmPassword}
                    onChange = { (e) => setConfirmPassword(e.target.value)}
                    />
                </div>

          
                <div className="mt-3">
                  <a className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                      onClick = {registerUser}>
                      SIGN UP</a>
                </div>

                <div className="text-center mt-4 font-weight-light">
                  Already have an account? <a href="/login" className="text-primary">Login</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
       {/* content-wrapper ends  */}
    </div>
    {/* page-body-wrapper ends */}
  </div>
  )
}

export default Registration
