import React, {useState, useEffect} from 'react';
import Template from '../Template/Template';
import './Rates.css';
import RatesApiService from '../../Services/RatesService';

import Modal from 'react-modal';
import { useForm } from "react-hook-form";

import {NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

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

const Rates = () => {

  const [modalIsOpen, setIsOpen] = useState(false);
  const { control, register, formState: { errors}, handleSubmit, reset} = useForm();
  const [rates, setRates] = useState([])

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
  }

  function closeModal() {
    setIsOpen(false);
  }

  const saveRate = (data) => {
    closeModal()
    RatesApiService.addRates(data)
      .then( response => {
        reset()
        "00" === response.code ? NotificationManager.success(response.description, 'Success', 3000):
        NotificationManager.error(response.description, 'Success', 3000);
        getRates()
      })
      .catch( error => {
        console.log(error)
        "00" === error.code ? NotificationManager.success(error.description, 'Success', 3000):
        NotificationManager.error(error.description, 'Error', 3000)
      })
  }

  const getRates = () => {
    RatesApiService.getRates()
    .then( response => {
      setRates(response.data)
    })
    .catch(error => {})
  }

  useEffect(() => {
      getRates()
  }, [])

  return (
      <Template>
    <div className="col-lg-12 grid-margin">
      <div className="card">
        <h4 class="card-title padding-top">Trading Rates</h4>
        <div class="card-body">
              {/* <div> */}
                <h4 class="card-title floaot-left">Rates</h4>
                <button type="button" class="btn btn-info btn-rounded btn-fw float-right" onClick={openModal}>Add Rates</button>
              {/* </div> */}
          
              <div class="table-responsive">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Date</th>
                      <th>Risk Rate</th>
                      <th>Revaluation Rate</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      rates.map(rate => 
                        <tr key={rate.id}>
                        <td>{rate.id}</td>
                        <td>{rate.date}</td>
                        <td>{rate.riskRate}</td>
                        <td>{rate.revalRate}</td>
                        <td></td>
                      </tr>
                    )}
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
            <h4 class="card-title">Add Rates</h4>
          
            <form class="forms-sample" onSubmit={handleSubmit(saveRate)}>
                <div class="form-group">
                  <label for="exampleInputUsername1">Date</label>
                  <input type="date" class="form-control" id="username" placeholder="Date" {...register("date")} />
                </div>
                <div class="form-group">
                  <label for="exampleInputUsername1">Risk Rate</label>
                  <input type="text" class="form-control" id="exampleInputUsername1" placeholder="Risk Rate" {...register("riskRate")} />
                </div>
                <div class="form-group">
                  <label for="exampleInputUsername1">Revaluation Rate</label>
                  <input type="text" class="form-control" id="exampleInputUsername1" placeholder="Revaluation Rate" {...register("revalRate")} />
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

export default Rates;