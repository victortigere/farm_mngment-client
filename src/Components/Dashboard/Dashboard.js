import React,  { useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";
import './Dashboard.css';
import ProjectApiService from '../../Services/ProjectsAPIService';
import UserAuthApiService from '../../Services/UserAuthApiService';
import { useNavigate } from 'react-router-dom';


const Dashboard = () =>{

  const [projects, setProjects]  = useState([])
  const [user, setUser]  = useState([])
  const navigate = useNavigate()
  const localToken = localStorage.getItem('token')

  const testToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2aWN0b3IiLCJleHAiOjE2NDM0MzIwNDUsImlhdCI6MTY0MzQzMTk4NX0.hR90e0Wr_Bo2OMefT_28VRlvbcNVlVhW-NzQECXUF4akJmdYVoNCfUeZ9TUr1_zjcvBSmtpEz-sANRWIIxwm'

  const getProjects = () => {
    ProjectApiService.getProjects()
        .then()
        .then( (response) => {
          setProjects(response)
        })
  }

  const userDetails = () => {
    UserAuthApiService.getUserDetails()
        .then()
        .then( (response) => {
          setUser(response)
        })
  }


  useEffect(() => {
    if(localToken){
      const decodedToken = jwt_decode(localToken)
      if(decodedToken.exp * 1000 < Date.now()){ 
        localStorage.removeItem('token')
        navigate('/login')
      }
      else{
        getProjects()
        userDetails()
      }
    } else {
      localStorage.removeItem('token')
      navigate('/login')
    }   
  },[]);

  const logOut = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

    return (
      <div className=" container-scroller">
          <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
            <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
              <a className="navbar-brand brand-logo mr-5" href="../../index.html"><img src="../../images/logo.svg" className="mr-2" alt="logo"/></a>
              <a className="navbar-brand brand-logo-mini" href="../../index.html"><img src="../../images/logo-mini.svg" alt="logo"/></a>
            </div>
            <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
              <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
                <span className="icon-menu"></span>
              </button>
              <ul className="navbar-nav mr-lg-2">
                <li className="nav-item nav-search d-none d-lg-block">
                  <div className="input-group">
                    <div className="input-group-prepend hover-cursor" id="navbar-search-icon">
                      <span className="input-group-text" id="search">
                        <i className="icon-search"></i>
                      </span>
                    </div>
                    {/* <input type="text" className="form-control" id="navbar-search-input" placeholder="Search now" aria-label="search" aria-describedby="search" /> */}
                  </div>
                </li>
              </ul>
              <ul className="navbar-nav navbar-nav-right">
              <li className="nav-item nav-profile dropdown">
                    <a className="links-no-decoration">
                      {user.username}
                    </a>
                </li>
                <li className="nav-item nav-profile dropdown">
                    <a className="links-no-decoration"
                    onClick = {logOut}>
                      <i className="ti-power-off text-primary"></i>
                      Logout
                    </a>
                </li>
              </ul>
              <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
                <span className="icon-menu"></span>
              </button>
            </div>
          </nav>
          {/* partia */}
          <div className="container-fluid page-body-wrapper">
            {/* partial:../../partials/_settings-panel.html  */}
            <div className="theme-setting-wrapper">
              <div id="settings-trigger"><i className="ti-settings"></i></div>
              <div id="theme-settings" className="settings-panel">
                <i className="settings-close ti-close"></i>
                <p className="settings-heading">SIDEBAR SKINS</p>
                <div className="sidebar-bg-options selected" id="sidebar-light-theme"><div className="img-ss rounded-circle bg-light border mr-3"></div>Light</div>
                <div className="sidebar-bg-options" id="sidebar-dark-theme"><div className="img-ss rounded-circle bg-dark border mr-3"></div>Dark</div>
                <p className="settings-heading mt-2">HEADER SKINS</p>
              </div>
            </div>
        
            {/* <!-- partial -->
            <!-- partial:../../partials/_sidebar.html --> */}
            <nav className="sidebar sidebar-offcanvas" id="sidebar">
              <ul className="nav">
                <li className="nav-item">
                  <a className="nav-link" href="../../index.html">
                    <i className="icon-grid menu-icon"></i>
                    <span className="menu-title">Dashboard</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                    <i className="icon-layout menu-icon"></i>
                    <span className="menu-title">UI Elements</span>
                    <i className="menu-arrow"></i>
                  </a>
                  <div className="collapse" id="ui-basic">
                    <ul className="nav flex-column sub-menu">
                      <li className="nav-item"> <a className="nav-link" href="../../pages/ui-features/buttons.html">Buttons</a></li>
                      <li className="nav-item"> <a className="nav-link" href="../../pages/ui-features/dropdowns.html">Dropdowns</a></li>
                      <li className="nav-item"> <a className="nav-link" href="../../pages/ui-features/typography.html">Typography</a></li>
                    </ul>
                  </div>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="collapse" href="#form-elements" aria-expanded="false" aria-controls="form-elements">
                    <i className="icon-columns menu-icon"></i>
                    <span className="menu-title">Form elements</span>
                    <i className="menu-arrow"></i>
                  </a>
                  <div className="collapse" id="form-elements">
                    <ul className="nav flex-column sub-menu">
                      <li className="nav-item"><a className="nav-link" href="../../pages/forms/basic_elements.html">Basic Elements</a></li>
                    </ul>
                  </div>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="collapse" href="#charts" aria-expanded="false" aria-controls="charts">
                    <i className="icon-bar-graph menu-icon"></i>
                    <span className="menu-title">Charts</span>
                    <i className="menu-arrow"></i>
                  </a>
                  <div className="collapse" id="charts">
                    <ul className="nav flex-column sub-menu">
                      <li className="nav-item"> <a className="nav-link" href="../../pages/charts/chartjs.html">ChartJs</a></li>
                    </ul>
                  </div>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="collapse" href="#tables" aria-expanded="false" aria-controls="tables">
                    <i className="icon-grid-2 menu-icon"></i>
                    <span className="menu-title">Tables</span>
                    <i className="menu-arrow"></i>
                  </a>
                  <div className="collapse" id="tables">
                    <ul className="nav flex-column sub-menu">
                      <li className="nav-item"> <a className="nav-link" href="../../pages/tables/basic-table.html">Basic table</a></li>
                    </ul>
                  </div>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="collapse" href="#icons" aria-expanded="false" aria-controls="icons">
                    <i className="icon-contract menu-icon"></i>
                    <span className="menu-title">Icons</span>
                    <i className="menu-arrow"></i>
                  </a>
                  <div className="collapse" id="icons">
                    <ul className="nav flex-column sub-menu">
                      <li className="nav-item"> <a className="nav-link" href="../../pages/icons/mdi.html">Mdi icons</a></li>
                    </ul>
                  </div>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="collapse" href="#auth" aria-expanded="false" aria-controls="auth">
                    <i className="icon-head menu-icon"></i>
                    <span className="menu-title">User Pages</span>
                    <i className="menu-arrow"></i>
                  </a>
                  <div className="collapse" id="auth">
                    <ul className="nav flex-column sub-menu">
                      <li className="nav-item"> <a className="nav-link" href="../../pages/samples/login.html"> Login </a></li>
                      <li className="nav-item"> <a className="nav-link" href="../../pages/samples/register.html"> Register </a></li>
                    </ul>
                  </div>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="collapse" href="#error" aria-expanded="false" aria-controls="error">
                    <i className="icon-ban menu-icon"></i>
                    <span className="menu-title">Error pages</span>
                    <i className="menu-arrow"></i>
                  </a>
                  <div className="collapse" id="error">
                    <ul className="nav flex-column sub-menu">
                      <li className="nav-item"> <a className="nav-link" href="../../pages/samples/error-404.html"> 404 </a></li>
                      <li className="nav-item"> <a className="nav-link" href="../../pages/samples/error-500.html"> 500 </a></li>
                    </ul>
                  </div>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="../../pages/documentation/documentation.html">
                    <i className="icon-paper menu-icon"></i>
                    <span className="menu-title">Documentation</span>
                  </a>
                </li>
              </ul>
            </nav>
            {/* <!-- partial --> */}
            <div className="main-panel">        
              <div className="content-wrapper">
                <div className="row">
                  <div className="col-lg-12 grid-margin">
                    <div className="card">
                      <div className="card-body">
                        <h4>Dashboard</h4>
                        <div>
                          {
                           projects?projects.map(
                              (project) => {
                                return (
                                    <div className="col-md-4 mb-4 stretch-card transparent" key={project.id}>
                                      <div className="card card-tale">
                                        <div className="card-body">
                                          <p className="mb-4">{project.projectName}</p>
                                          <p className="fs-30 mb-2">4006</p>
                                          <p>10.00% (30 days)</p>
                                        </div>
                                      </div>
                                    </div>
                                )
                              }
                            ):
                            <h4>Empty</h4>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  
}

export default Dashboard;