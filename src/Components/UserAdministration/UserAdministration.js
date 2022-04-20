import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import { useForm } from "react-hook-form";
import './UserAdministration.css';

import {NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import Template from '../Template/Template';
import DealerApiService from '../../Services/DealerService';

const customStyles = {
  content: {
    position : 'absolute',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width : '40%',
    marginRight: '-10%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const UserAdministration = () =>  {

  const [dealers, setDealers] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const { control, register, formState: { errors}, handleSubmit, reset} = useForm();

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    getDealers()   
  },[]);

  const getDealers = () => {
    DealerApiService.getDealers()
    .then( response => setDealers(response.data))
    .catch( error => console.log(error))
  }

  const saveDealer = data => {
    closeModal()
    reset()
     DealerApiService.addDealer(data)
     .then( response => {
         reset()
        "00" === response.code ? NotificationManager.success(response.description, 'Success', 3000):
        NotificationManager.error(response.description, 'Error', 3000);
        getDealers()
     })
     .catch(error => {
        // reset()
        NotificationManager.error(error.description, 'Error', 3000);
      })
  }

  


    return (
        <Template>
          <div className="col-lg-12 grid-margin">
            <div className="card">
              <h4 class="card-title padding-top">User Management</h4>
              <div class="card-body">
                    {/* <div> */}
                      <h4 class="card-title floaot-left">Dealers</h4>
                      <button type="button" class="btn btn-info btn-rounded btn-fw float-right" onClick={openModal}>Add Dealer</button>
                    {/* </div> */}
                
                    <div class="table-responsive">
                      <table class="table table-hover">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          { dealers !== [] ? dealers.map( dealer =>  
                            <tr key = {dealer.id}>
                              <td>{dealer.id}</td>
                              <td>{dealer.firstName}</td>
                              <td>{dealer.lastName}</td>
                              <td>{dealer.email}</td>
                              <td>{dealer.active}</td>
                              <td>{dealer.email}</td>
                            </tr>
                          ) :
                          <h4>No dealers saved</h4>
                          } 
                        </tbody>
                      </table>
                    </div>
              </div>
            </div>
          </div>

          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            >

              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">Add Dealer</h4>
                
                  <form class="forms-sample" onSubmit={handleSubmit(saveDealer)}>
                    <div class="form-group">
                      <label for="exampleInputUsername1">FirstName</label>
                      <input type="text" class="form-control" id="exampleInputUsername1" placeholder="Username" {...register("firstName")} />
                    </div>
                    <div class="form-group">
                      <label for="exampleInputUsername1">Last</label>
                      <input type="text" class="form-control" id="exampleInputUsername1" placeholder="Username" {...register("lastName")} />
                    </div>
                
                    <div class="form-group">
                      <label for="exampleInputUsername1">Username</label>
                      <input type="text" class="form-control" id="username" placeholder="Username" {...register("username")} />
                    </div>
                    <div class="form-group">
                      <label for="exampleInputEmail1">Email address</label>
                      <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email" {...register("email")}/>
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword1">Password</label>
                      <input type="text" class="form-control" id="password" placeholder="Password" {...register("password")} />
                    </div>
                    <div class="form-group">
                      <label for="exampleInputConfirmPassword1">Confirm Password</label>
                      <input type="text" class="form-control" id="confirm-password" placeholder="Password" />
                    </div>
                    
                    <button type="submit" class="btn btn-primary mr-2 float-right">Submit</button>
                    <button class="btn btn-light float-left" onClick={closeModal}>Cancel</button>
                  </form>
                </div>
              </div>
          
          </Modal>
        </Template> 
    );
}

export default UserAdministration;