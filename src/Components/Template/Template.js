import React from 'react';
import './Template.css';

import { useNavigate } from 'react-router-dom';

const Template = (props) => {

  const navigate = useNavigate()

  const logOut = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const renderNavLinks = () => {
    if(localStorage.getItem("access") === "ADMIN") {
      return <ul className="nav">
      <li className="nav-item">
        <a className="nav-link" href="/dashboard">
          <i className="icon-grid menu-icon"></i>
          <span className="menu-title">Dashboard</span>
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" data-toggle="collapse" href="/users" aria-expanded="false" aria-controls="ui-basic">
          <i className="icon-layout menu-icon"></i>
          <span className="menu-title">Users</span>
          <i className="menu-arrow"></i>
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" data-toggle="collapse" href="/deals" aria-expanded="false" aria-controls="form-elements">
          <i className="icon-columns menu-icon"></i>
          <span className="menu-title">Deals</span>
          <i className="menu-arrow"></i>
        </a>
        <div className="collapse" id="form-elements">
          <ul className="nav flex-column sub-menu">
            <li className="nav-item"><a className="nav-link" href="../../pages/forms/basic_elements.html">Basic Elements</a></li>
          </ul>
        </div>
      </li>
      <li className="nav-item">
        <a className="nav-link" data-toggle="collapse" href="/rates" aria-expanded="false" aria-controls="tables">
          <i className="icon-grid-2 menu-icon"></i>
          <span className="menu-title">Rates</span>
          <i className="menu-arrow"></i>
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" data-toggle="collapse" href="/reports" aria-expanded="false" aria-controls="tables">
          <i className="icon-grid-2 menu-icon"></i>
          <span className="menu-title">Reports</span>
          <i className="menu-arrow"></i>
        </a>
        <div className="collapse" id="tables">
          <ul className="nav flex-column sub-menu">
            <li className="nav-item"> <a className="nav-link" href="../../pages/tables/basic-table.html">Basic table</a></li>
          </ul>
        </div>
      </li>   
    </ul>
    }

    if(localStorage.getItem("access") === "DEALER") {
      return <ul className="nav">
      <li className="nav-item">
        <a className="nav-link" href="/dashboard">
          <i className="icon-grid menu-icon"></i>
          <span className="menu-title">Dashboard</span>
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" data-toggle="collapse" href="/deals" aria-expanded="false" aria-controls="form-elements">
          <i className="icon-columns menu-icon"></i>
          <span className="menu-title">Deals</span>
          <i className="menu-arrow"></i>
        </a>
        <div className="collapse" id="form-elements">
          <ul className="nav flex-column sub-menu">
            <li className="nav-item"><a className="nav-link" href="../../pages/forms/basic_elements.html">Basic Elements</a></li>
          </ul>
        </div>
      </li>   
    </ul>
    }

    if(localStorage.getItem("access") === "ASSESSOR") {
      return <ul className="nav">
      <li className="nav-item">
        <a className="nav-link" href="/dashboard">
          <i className="icon-grid menu-icon"></i>
          <span className="menu-title">Dashboard</span>
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" data-toggle="collapse" href="/deals" aria-expanded="false" aria-controls="form-elements">
          <i className="icon-columns menu-icon"></i>
          <span className="menu-title">Deals</span>
          <i className="menu-arrow"></i>
        </a>
        <div className="collapse" id="form-elements">
          <ul className="nav flex-column sub-menu">
            <li className="nav-item"><a className="nav-link" href="../../pages/forms/basic_elements.html">Basic Elements</a></li>
          </ul>
        </div>
      </li>   
    </ul>
    }



  }

  return(
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
                {localStorage.getItem("username")}
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
        {/* <div id="settings-trigger"><i className="ti-settings"></i></div> */}
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
       {renderNavLinks()}
      </nav>
      {/* <!-- partial --> */}
      <div className="main-panel">        
        <div className="content-wrapper">
        
            {props.children}
       
        </div>
      </div>
    </div>
  </div>

  );
}
 

export default Template;