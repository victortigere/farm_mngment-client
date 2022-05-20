import React, {useState, useEffect} from 'react';
import {useParams, useNavigate } from 'react-router-dom'
import Template from '../Template/Template';
import { useForm } from "react-hook-form";
import DealApiService from '../../Services/TradeService';
import './EditDeal.css';

const EditDeal = () =>  {
  const dealNo = useParams();
  const [deal, setDeal] = useState([]);

  const navigate = useNavigate();
  const [ isDisabled, setIsDisabled ] = useState(false);
  const disableOption = "NO";

  const handleChange = (event) => {
    event.target.value === disableOption ? setIsDisabled(true) : setIsDisabled(false)
  }

  const {register, formState: { errors} , handleSubmit, reset} = useForm();

  const getTrade = (id) => {
    console.log(id)
    DealApiService.getDeal(id)
      .then( response => {
        setDeal(response.data) 
        console.log(response.data) 
        console.log(deal) 
      })
      .catch( error => error)
  }

  useEffect(() => {
    getTrade(dealNo.id)   
  },[]);

    return (
      <Template>
        <form className='forms-sample row'>
            <div class="col-md-12 grid-margin stretch-card">
              <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Update Deal</h4>

                    {/* <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="">Date</label>
                          <input type="date" class="form-control" id="dealDate" placeholder="Date" {...register("dealDate", { required: true } )}/>
                          {errors.dealDate && <span>Deal Date is required</span>}
                        </div>
                      </div>

                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="exampleFormControlSelect3">Customer Name</label>
                          <select class="form-control form-control-sm" id="exampleFormControlSelect3" {...register("client",{ required: true })}>
                            <option value={1}>Victor Tigere</option>
                            <option value={2}>Tinashe Nyamangara</option>
                          </select>
                          {errors.client && <span>Client is required</span>}
                        </div>
                      </div>
                    </div> */}

                    {/* <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="exampleFormControlSelect3">SEGMENT</label>
                          <select class="form-control form-control-sm" id="exampleFormControlSelect3" {...register("segment", { required: true })}>
                            <option value={1}>CIB</option>
                            <option value={2}>Retail</option>
                            <option value={3}>Business Banking</option>
                            <option value={4}>Banking Book</option>
                          </select>
                          {errors.segment && <span>Segment is required</span>}
                        </div>
                      </div>

                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="exampleFormControlSelect3">Deal Type</label>
                          <select class="form-control form-control-sm" id="exampleFormControlSelect3" {...register("dealType", { required: true })}>
                            <option value={1}>FX</option>
                            <option value={2}>INTERDESK</option>
                          </select>
                          {errors.dealType && <span>Deal Type is required</span>}
                        </div>
                      </div>
                    </div> */}

                    {/* <div class="row">
                      
                        <div class="col-md-6">
                            <div class="form-group">
                              <label for="">Transaction Rate</label>
                              <input type="text" class="form-control" 
                              id="customerName" 
                              placeholder="Transaction Rate" 
                              {...register("transactionRate", { required: true })} />
                              {errors.transactionRate && <span>Transaction Rate is required</span>}
                            </div>
                        </div>
                      
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="">Risk Rate</label>
                            <input type="text" class="form-control" id="customerName" 
                            placeholder="Risk Rate" {...register("riskRate", { required: true })} />
                            {errors.customerName && <span>Customer Name is required</span>}
                          </div>
                        </div>
                    </div> */}

                    {/* <div class="row">
                      
                      <div class="col-md-6">
                          <div class="form-group">
                            <label for="">Interdesk</label>
                            <select 
                                class="form-control form-control-sm" 
                                id="exampleFormControlSelect3" 
                                {...register("interDesk", { required: true })}
                                onChange={handleChange}
                            >
                            <option value={"YES"}>YES</option>
                            <option value={"NO"}>NO</option>
                          </select>
                          {errors.interdesk && <span>Interdesk is required</span>}
                          </div>
                      </div>
                    
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="">Desk No</label>
                          <input type="text" class="form-control" id="deskNo"
                           disabled={isDisabled} placeholder="Desk No" 
                          />
            
                        </div>
                      </div>
                    </div> */}
                    
                  </div>
              </div>
            </div>

            <div class="col-md-6 grid-margin stretch-card">
              <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">BUY</h4>

                      <div class="form-group">
                        <label for="exampleFormControlSelect3">Receiving Bank</label>
                        <select class="form-control form-control-sm" id="exampleFormControlSelect3" {...register("receivingBank", { required: true })} >
                          <option value={1}>BANK 1</option>
                          <option value={2}>BANK 2</option>
                        </select>
                        {errors.receivingBank && <span>Receiving Bank is required</span>}
                      </div>

                      <div class="form-group">
                        <label for="exampleFormControlSelect3">Source Of Funds</label>
                        <select class="form-control form-control-sm" id="exampleFormControlSelect3" {...register("sourceOfFunds", { required: true })}>
                          <option value={1}>CASH</option>
                          <option value={2}>BANK</option>
                        </select>
                        {errors.sourceOfFunds && <span>Source Of Funds is required</span>}
                      </div>

                      <div class="form-group">
                        <label for="exampleFormControlSelect3">Currency</label>
                        <select class="form-control form-control-sm" id="exampleFormControlSelect3" {...register("currency", { required: true })}>
                          <option value={1}>USD</option>
                          <option value={2}>ZWL</option>
                        </select>
                        {errors.currency && <span>Currency is required</span>}
                      </div>

                      <div class="form-group">
                        <label for="">Amount</label>
                        <input type="text" class="form-control" id="clientName" placeholder="Amount" {...register("amount", { required: true })} />
                        {errors.amount && <span>Amount is required</span>}
                      </div>

                      <div class="form-group">
                          <label for="exampleFormControlSelect3">Settlement Status</label>
                          <select class="form-control form-control-sm" id="exampleFormControlSelect3" {...register("settlementStatus", { required: true })}>
                            <option value={1}>SETTLED</option>
                            <option value={2}>UNSETTLED</option>
                          </select>
                          {errors.settlementStatus && <span>Settlement Status is required</span>}
                      </div>

                      <div class="form-group">
                            <label for="">Settlement DATE</label>
                            <input type="date" class="form-control" id="dealDate" placeholder="Date"  {...register("settlementDate", { required: true })}/>
                            {errors.dealDate && <span>Settlement Date is required</span>}
                      </div>
                  </div>
              </div>
            </div>

            <div class="col-md-6 grid-margin stretch-card">
              <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">SELL</h4>
                  
                      <div class="form-group">
                        <label for="exampleFormControlSelect3">Paying Bank</label>
                        <select class="form-control form-control-sm" id="exampleFormControlSelect3" {...register("payingBank")}>
                          <option value={1}>BANK 1</option>
                          <option value={2}>BANK 2</option>
                        </select>
                        {errors.payingBank && <span>Paying Bank is required</span>}
                      </div>

                      <div class="form-group">
                        <label for="exampleFormControlSelect3">Sell Source Of Funds</label>
                        <select class="form-control form-control-sm" id="exampleFormControlSelect3" {...register("sellSourceOfFunds")}>
                          <option value={1}>CASH</option>
                          <option value={2}>BANK</option>
                        </select>
                        {errors.sellSourceOfFunds && <span>Source Of Funds is required</span>}
                      </div>

                      <div class="form-group">
                        <label for="exampleFormControlSelect3">Currency</label>
                        <select class="form-control form-control-sm" id="exampleFormControlSelect3" {...register("sellCurrency")}>
                          <option value={1}>USD</option>
                          <option value={2}>ZWL</option>
                        </select>
                        {errors.sellCurrency && <span>Currencyis required</span>}
                      </div>

                      <div class="form-group">
                        <label for="">Amount</label>
                        <input type="text" class="form-control" id="clientName" placeholder="Amount"  {...register("sellAmount")}/>
                        {errors.sellAmount && <span>Amount is required</span>}
                      </div>

                      <div class="form-group">
                          <label for="exampleFormControlSelect3">Settlement Status</label>
                          <select class="form-control form-control-sm" id="exampleFormControlSelect3" {...register("sellSettlementStatus")}>
                            <option value={1}>SETTLED</option>
                            <option value={2}>UNSETTLED</option>
                          </select>
                          {errors.sellSettlementStatus && <span>Settlement Status is required</span>}
                      </div>

                      <div class="form-group">
                            <label for="">Settlement DATE</label>
                            <input type="date" class="form-control" id="dealDate" placeholder="Date"  {...register("sellSettlementDate")}/>
                            {errors.sellSettlementDate && <span>Settlement Date is required</span>}
                      </div>
                    

                      <button type="submit" class="btn btn-primary mr-2 float-right">Submit</button>

                  </div>
              </div>
            </div>
        </form>

      </Template>
    );
}

export default EditDeal;