import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Template from '../Template/Template';
import './Rates.css';
import RatesApiService from '../../Services/RatesService';
import Loader from "react-js-loader";

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
  const [riskRates, setRates] = useState([])
  const [revaluationRates, setRevalutionRates] = useState([])
  const [ showLoader, setShowLoader] = useState(false)
  const navigate = useNavigate()

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
        // getRates()
      })
      .catch( error => {
        "00" === error.code ? NotificationManager.success(error.description, 'Success', 3000):
        NotificationManager.error(error.description, 'Error', 3000)
      })
  }

  // const getRates = () => {
  //   RatesApiService.getRates()
  //   .then( response => {
  //     setShowLoader(false)
  //     setRates(response.data)
  //   })
  //   .catch(error => {})
  // }

  // const getRevaluationRates = () => {
  //   RatesApiService.getRates()
  //   .then( response => {
  //     setShowLoader(false)
  //     setRevalutionRates(response.data)
  //   })
  //   .catch(error => {})
  // }

  const getRiskRatesByDate = (date) => {
    RatesApiService.getRiskRatesbyDate(date)
    .then( response => {
      setShowLoader(false)
      setRates(response.data)
      console.log(response.data)
    })
    .catch(error => {})
  }

  
  const getRevaluationRatesByDate = (date) => {
    RatesApiService.getRevaluationRatesbyDate(date)
    .then( response => {
      setShowLoader(false)
      setRevalutionRates(response.data)
    })
    .catch(error => {})
  }

  // useEffect(() => {
  //     getRates()
  //     getRevaluationRates()
  // }, [])

  return (
      <Template>

        {  showLoader ?
          <div className={"itemn loader-centered-position"}>
          <Loader type="bubble-scale" bgColor={"#0000FF"} title={"bubble-scale"} color={'#FFFFFF'} size={100} />
          </div> :
        
        <div className='row'>

        
          <div className="col-lg-6 grid-margin">
            <div className="card">
              <h4 class="card-title padding-top">Risk Rates</h4>
              <div class="card-body">
                    {/* <div> */}
                      <h4 class="card-title floaot-left">Rates</h4>
                      <input type="date" 
                            class="form-control  col-md-4 rates-content-float-50" 
                            id="dealDate" 
                            placeholder="Date"
                            onChange = { (e) => {
                              getRiskRatesByDate(e.target.value)
                            }} 
                          />
                      <button type="button" 
                          className="btn btn-info btn-rounded btn-fw float-right col-md-3 rates-content-float-50" 
                          onClick={() => {navigate('/addrates')}}>
                          Add Risk Rates
                      </button>
                    {/* </div> */}
                
                    <div class="table-responsive">
                      <table class="table table-hover">
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Currency</th>
                            <th>Risk Rate</th>
                          </tr>
                        </thead>
                        <tbody>
                        {
                            riskRates.map(rate => 
                              <tr key={rate.id}>
                              <td>{rate.date}</td>
                              <td>{rate.creationDate.slice(11,-13)}</td>
                              <td>{rate.currency}</td>
                              <td>{rate.riskRate}</td>
                              <td></td>
                            </tr>
                          )} 
                        </tbody>
                      </table> 
                    </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 grid-margin">
          <div className="card">
            <h4 class="card-title padding-top">Revaluation Rates</h4>
            <div class="card-body">
                  {/* <div> */}
                    <h4 class="card-title floaot-left">Rates</h4>

                    <div className='rates-header'>

                    <input type="date" 
                            class="form-control  col-md-4 rates-content-float-50" 
                            id="dealDate" 
                            placeholder="Date" 
                            onChange = { (e) => {
                              getRevaluationRatesByDate(e.target.value)
                            }}
                          />

                        <button type="button" 
                            className='btn btn-info btn-rounded btn-fw float-right col-md-4  rates-content-float-50' 
                            onClick={() => {navigate('/addrevalrates')}}>
                              Add Revaluation Rates
                        </button>
                    </div>
                    
                   
                  {/* </div> */}
              
                  <div class="table-responsive">
                    { 
                      revaluationRates !== [] ? 
                        <table class="table table-hover">
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>Currency</th>
                              <th>Revaluation Rate</th>
                            </tr>
                          </thead>
                          <tbody>
                          {
                            revaluationRates.map(rate => 
                              <tr key={rate.id}>
                              <td>{rate.date}</td>
                              <td>{rate.currency}</td>
                              <td>{rate.revaluationRate}</td>
                              <td></td>
                            </tr>
                          )}
                          </tbody>
                        </table> 
                            : 
                        <h4></h4>
                    }
                  </div>
            </div>
          </div>
          </div>

          </div>
        }

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