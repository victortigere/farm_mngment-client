import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import RatesApiService from '../../Services/RatesService';
import {NotificationManager} from 'react-notifications';
import Loader from "react-js-loader";
import 'react-notifications/lib/notifications.css';

import Template from '../Template/Template';

const AddRevaluationRates = () => {

  const [ isDisabled, setIsDisabled ] = useState(false);
  const [ showLoader, setShowLoader] = useState(true)
  const disableOption = "NO";

  const {register, formState: { errors} , handleSubmit, reset} = useForm();
  const navigate = useNavigate()

  const handleChange = (event) => {
    event.target.value === disableOption ? setIsDisabled(true) : setIsDisabled(false)
  }


  const saveRates = (data) => {
    RatesApiService.addRevaluationRates(data)
      .then( response => {
        reset()
        "00" === response.code ? NotificationManager.success(response.description, 'Success', 3000):
        NotificationManager.error(response.description, 'Success', 3000);
        navigate('/rates')
      })
      .catch( error => {
        reset()
        "00" === error.code ? NotificationManager.success(error.description, 'Success', 3000):
        NotificationManager.error(error.description, 'Error', 3000)
        navigate('/rates')
      })
  }



  return (
    <Template>
      {/* { showLoader == false ? 
          <div className={"item"}>
            <Loader type="bubble-scale" bgColor={"#0000FF"} title={"bubble-scale"} color={'#FFFFFF'} size={100} />
          </div> : */}

       <form className='forms-sample row' onSubmit={handleSubmit(saveRates)}>
            <div  className="col-md-12 grid-margin stretch-card">
              <div  className="card">

                  <div  className="card-body">
                    <h4  className="card-title">Add Revaluation Rates</h4>

                    <div  className="row">
                      <div  className="col-md-4">
                        <div  className="form-group">
                          <label >Date</label>
                          <input type="date"  className="form-control" id="date" placeholder="date" {...register("date", { required: true })} />
                          {errors.date && <span>Date is required</span>}
                        </div>
                      </div>
                    </div>

                    <div  className="row">
                      <div  className="col-md-4">
                        <div  className="form-group">
                          <label >Currency</label>
                          <input type="text"  className="form-control" id="usd" value="USD" {...register("usd", { required: true })}/>
                          {errors.usd && <span>Currency is required</span>}
                        </div>
                      </div>

                      <div  className="col-md-4">
                        <div  className="form-group">
                          <label >Revaluation Rate</label>
                          <input type="text"  className="form-control" id="usdriskRate" placeholder=" USD Rate" {...register("usdRevaluationRate", { required: true })} />
                          {errors.usdRiskRate && <span>USD Risk Rate Rate is required</span>}
                        </div>
                      </div>
                    </div>

                    <div  className="row">
                      <div  className="col-md-4">
                        <div  className="form-group">
                          <input type="text"  className="form-control" id="zwl" value="ZWL" {...register("zwl", { required: true })} />
                          {errors.zwl && <span>Currency is required</span>}
                        </div>
                      </div>

                      <div  className="col-md-4">
                        <div  className="form-group">
                          <input type="text"  className="form-control" id="zwlriskRate" placeholder="ZWL Rate" {...register("zwlRevaluationRate", { required: true })} />
                          {errors.zwlRiskRate && <span>ZWL Risk Rate Rate is required</span>}
                        </div>
                      </div>
                    </div>

                    <div  className="row">
                      <div  className="col-md-4">
                        <div  className="form-group">
                          <input type="text"  className="form-control" id="zar" value="ZAR" {...register("zar", { required: true })}/>
                          {errors.zar && <span>Currency is required</span>}
                        </div>
                      </div>

                      <div  className="col-md-4">
                        <div  className="form-group">
                          <input type="text"  className="form-control" id="zarrevalRate" placeholder="ZAR Rate" {...register("zarRevaluationRate", { required: true })} />
                          {errors.zarRevaluationRate && <span> ZAR Revaualation Rate is required</span>}
                        </div>
                      </div>

                    </div>

                    <div  className="row">
                      <div  className="col-md-4">
                        <div  className="form-group">
                          <input type="text"  className="form-control" id="eur" value="EUR" {...register("eur", { required: true })}/>
                          {errors.eur && <span>Currency is required</span>}
                        </div>
                      </div>

                      <div  className="col-md-4">
                        <div  className="form-group">
                          <input type="text"  className="form-control" id="eurriskRate" placeholder="EUR Rate" {...register("eurRevaluationRate", { required: true })} />
                          {errors.eurRiskRate && <span>EUR Risk Rate Rate is required</span>}
                        </div>
                      </div>

                    </div>

                    <button type="submit"  className="btn btn-primary mr-2 margin-right-submit-button">Submit</button>
                  </div>
              </div>
            </div>
        </form>
      {/* } */}
    </Template>
  )
}

export default AddRevaluationRates