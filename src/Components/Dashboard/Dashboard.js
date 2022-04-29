import React,  { useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";
import './Dashboard.css';
import UserAuthApiService from '../../Services/UserAuthApiService';
import { useNavigate } from 'react-router-dom';
import Template from '../Template/Template';


const Dashboard = () =>{

  const [projects, setProjects]  = useState([])
  const [user, setUser]  = useState([])
  const navigate = useNavigate()
  const localToken = localStorage.getItem('token')

  const userDetails = () => {
    // UserAuthApiService.getUserDetails()
    //     .then()
    //     .then( (response) => {
    //       setUser(response.)
    //     })
  }


  useEffect(() => {
    if(localToken){
      const decodedToken = jwt_decode(localToken)
      if(decodedToken.exp * 1000 < Date.now()){ 
        localStorage.removeItem('token')
        navigate('/login')
      }
      else{
        userDetails()
      }
    } else {
      localStorage.removeItem('token')
      navigate('/login')
    }   
  },[]);

    return (
      <Template>
        {/*  */}
        <div className="card-body">
          <h4>Dashboard</h4>
          <div className='projects-display-flex'>
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
        {/*  */}
      </Template>       
    );
}

export default Dashboard;