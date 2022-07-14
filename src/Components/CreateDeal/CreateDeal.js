import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm} from "react-hook-form";
import CurrencyInput from 'react-currency-input-field';
import Modal from 'react-modal';
import Template from '../Template/Template';
import './CreateDeal.css';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import DealApiService from '../../Services/TradeService';
import ClientApiService from '../../Services/ClientService';
import RatesApiService from '../../Services/RatesService';
import {NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

const Deal = () =>  {

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [ isDisabled, setIsDisabled ] = useState(false);
  const [rates , setRates] = useState([])
  const [sellAmount , setSellAmount] = useState(0)
  const [sellCurrency , setSellCurrency] = useState("")
  const [buyCurrency , setBuyCurrency] = useState("")
  const [transactionRate , setTransactionRate] = useState(0)
  // const [buyAmount, setBuyAmount] = useState(0)
  const [clients, setClients] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const { control, register, formState: { errors}, handleSubmit, reset} = useForm();
  const { control: control2, register : register2, formState: { errors : errors2}, handleSubmit : handleSubmit2, reset : reset2} = useForm();

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  
  const disableOption = "NO";

  const handleChange = (event) => {
    event.target.value === disableOption ? setIsDisabled(true) : setIsDisabled(false)
  }

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
      getClients()
  }, [])

  const getClients = () => {
    ClientApiService.getClients()
      .then((response) => {
        setClients(response.data)
      })
        .catch((err) => {
    })
  }


  const calculateSellAmount = (amount) => {

    console.log(amount)

    // var amount = amount;
    // amount = amount.replace(/\,/g,''); 
    // amount = parseInt(amount,10);

    const filteredRates = rates.slice(0, 4)

   var buyAmount = amount

    const sell =  filteredRates.filter(function (rate)
    {
      return rate.currency == sellCurrency
    }
    );

    const buy =  filteredRates.filter(function (rate)
    {
      return rate.currency == buyCurrency
    }
    );

    // for currencies with risk rate greater than 1

    if(buy[0].riskRate >= 1 && sell[0].riskRate >= 1){

      if(buy[0].riskRate  < sell[0].riskRate){
          setSellAmount(buyAmount * transactionRate )
      }

      if(buy[0].riskRate > sell[0].riskRate){
        setSellAmount(buyAmount / transactionRate)
      }

  }

    // for currencies with risk rate less than 1
  
    if(buy[0].riskRate < 1 || sell[0].riskRate < 1){

    if(buy[0].riskRate  > sell[0].riskRate){
      setSellAmount(buyAmount * transactionRate)
    }

    if(buy[0].riskRate < sell[0].riskRate){
    setSellAmount(buyAmount / transactionRate)
    }
  }

    return null;

  }

  const moneyFormatter = (amount) => {
    calculateSellAmount(amount)
  }
 
  const saveDeal = (data) => {

    DealApiService.addDeaL(data)
      .then( response => {
        reset()
        "00" === response.code ? NotificationManager.success(response.description, 'Success', 3000):
        NotificationManager.error(response.description, 'Success', 3000);
        navigate("/deals")
      })
      .catch(error => {
        console.log(error)
        reset()
        "00" === error.code ? NotificationManager.success(error.description, 'Success', 3000):
        NotificationManager.error(error.description, 'Error', 3000);
      })
  }

  const getRates = (date) => {
    RatesApiService.getRiskRatesbyDate(date)
        .then(response => {
          setRates(response.data)
          if(response.data.length === 0){
            NotificationManager.error('No rates found for this date', 'Error', 3000);
          }
        })
  }

  const addClient = (data) => {
      closeModal()
      ClientApiService.addClient(data)
      .then( response => {
        reset()
        getClients()
        "00" === response.code ? NotificationManager.success(response.description, 'Success', 3000):
        NotificationManager.error(response.description, 'Success', 3000);
      })
      .catch(error => {
        reset()
        "00" === error.code ? NotificationManager.success(error.description, 'Success', 3000):
        NotificationManager.error(error.description, 'Error', 3000);
      })
      reset2()
  }


    return (
      <Template>
        <form className='forms-sample row' onSubmit={handleSubmit(saveDeal)}>
            <div class="col-md-12 grid-margin stretch-card">
              <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Create Deal</h4>

                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Date</label>
                          <input type="date" 
                            class="form-control" 
                            id="dealDate" 
                            placeholder="Date" 
                            {...register("dealDate", { required: true } )}
                            onChange = { (e) => {
                             
                             getRates(e.target.value)
                            }}
                          />
                          {errors.dealDate && <span className='notification-color'>Deal Date is required</span>}
                        </div>
                      </div>

                      <div class="col-md-6">
                        <div className="form-group">
                        
                          <label>Select Memeber</label>
                          <a className='add-customer-content-float-50'  onClick={openModal}>Add Client</a>

                        <select class="form-control form-control-sm" id="exampleFormControlSelect3" {...register("client", { required: true })}>
                            <option value={1}>Select Customer</option>
                            {clients && clients.map((client) => (
                                <option key={client.id} 
                                  value={client.id}
                                >
                                {client.name}
                                </option>
                              ))}
                           
                          </select>
                            {errors.gymMember?.type === 'required' && "ID Number is required"}
                        </div>
                      </div>

                      
                    </div>

                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="exampleFormControlSelect3">SEGMENT</label>
                          <select class="form-control form-control-sm" id="exampleFormControlSelect3" {...register("segment", { required: true })}>
                            <option value={1}>CIB</option>
                            <option value={2}>Retail</option>
                            <option value={3}>Business Banking</option>
                            <option value={4}>Banking Book</option>
                          </select>
                          {errors.segment && <span className='notification-color'>Segment is required</span>}
                        </div>
                      </div>

                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="exampleFormControlSelect3">Deal Type</label>
                          <select class="form-control form-control-sm" id="exampleFormControlSelect3" {...register("dealType", { required: true })}>
                            <option value={1}>FX</option>
                            <option value={2}>INTERDESK</option>
                          </select>
                          {errors.dealType && <span className='notification-color'>Deal Type is required</span>}
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      
                        <div class="col-md-6">
                            <div class="form-group">
                              <label for="">Transaction Rate</label>
                              <input type="text" class="form-control" 
                              id="customerName" 
                              placeholder="Transaction Rate" 
                              {...register("transactionRate", { required: true })} 
                              onChange = { (e) => {setTransactionRate(e.target.value)}}/>
                              {errors.transactionRate && <span className='notification-color'>Transaction Rate is required</span>}
                            </div>
                        </div>
                      
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="">Risk Rate</label>
                            <input type="text" class="form-control" id="customerName" 
                            placeholder="Risk Rate" {...register("riskRate", { required: true })} />
                            {errors.riskRate && <span className='notification-color'>Risk Rate is required</span>}
                          </div>
                        </div>
                    </div>

                    <div class="row">
                      
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
                          {errors.interdesk && <span className='notification-color'>Interdesk is required</span>}
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
                    </div>
                    
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
                        {errors.receivingBank && <span className='notification-color'>Receiving Bank is required</span>}
                      </div>

                      <div class="form-group">
                        <label for="exampleFormControlSelect3">Source Of Funds</label>
                        <select class="form-control form-control-sm" id="exampleFormControlSelect3" 
                        {...register("sourceOfFunds", { required: true })}
                        >
                          <option value={0}>CASH</option>
                          <option value={1}>BANK</option>
                        </select>
                        {errors.sourceOfFunds && <span className='notification-color'>Source Of Funds is required</span>}
                      </div>

                      <div class="form-group">
                        <label for="exampleFormControlSelect3">Currency</label>
                        <select
                             
                            class="form-control form-control-sm" 
                            id="buyCurrency" 
                         //   value={buyCurrency}
                        {...register("currency", { required: true })}
                        onChange = { (e) => {

                          if(e.target.value  === "EUR"){
                            setOpen(true)
                          }

                          setBuyCurrency(e.target.value)
                         
                        }}
                       
                        >
                          <option>Select Buy Currency</option>
                          <option value={"USD"}>USD</option>
                          <option value={"ZWL"}>ZWL</option>
                          <option value={"ZAR"}>ZAR</option>
                          <option value={"EUR"}>EUR</option>
                        </select>
                        {errors.currency && <span className='notification-color'>Currency is required</span>}
                      </div>

                      <div class="form-group">
                        <label for="">Amounts</label>
                        <input type="number" 
                          {...register("amount", {required : true})} 
                             onChange = { (e) => {
                              calculateSellAmount(e.target.value)
                             }}
                            class="form-control" id="amount" name='amount'
                            placeholder="Amount" 
                        />
                      
                        {errors.amount && <span className='notification-color'>Amount is required</span>}
                      </div>

                      <div class="form-group">
                          <label for="exampleFormControlSelect3">Settlement Status</label>
                          <select class="form-control form-control-sm" id="exampleFormControlSelect3" {...register("settlementStatus", )}>
                            <option value={1}>SETTLED</option>
                            <option value={2}>UNSETTLED</option>
                          </select>
                          {errors.settlementStatus && <span className='notification-color'>Settlement Status is required</span>}
                      </div>

                      <div class="form-group">
                            <label for="">Settlement Date</label>
                            <input type="date" class="form-control" id="dealDate" placeholder="Date"  {...register("settlementDate", { required: true })}/>
                            {errors.settlementDate && <span className='notification-color'>Settlement Date is required</span>}
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
                          <option value={0}>BANK 1</option>
                          <option value={1}>BANK 2</option>
                        </select>
                        {errors.payingBank && <span className='notification-color'>Paying Bank is required</span>}
                      </div>

                      <div class="form-group">
                        <label for="exampleFormControlSelect3">Sell Source Of Funds</label>
                        <select class="form-control form-control-sm" id="exampleFormControlSelect3" {...register("sellSourceOfFunds")}>
                          <option value={0}>CASH</option>
                          <option value={1}>BANK</option>
                        </select>
                        {errors.sellSourceOfFunds && <span className='notification-color'>Source Of Funds is required</span>}
                      </div>

                      <div class="form-group">
                        <label for="exampleFormControlSelect3">Currency</label>
                        <select class="form-control form-control-sm" id="exampleFormControlSelect3" {...register("sellCurrency")}
                         onChange = { (e) => {

                          if(e.target.value  === "EUR"){
                            setOpen(true)
                          }

                          setSellCurrency(e.target.value)
                        }}
                        >
                          <option>Select Sell Currency</option>
                          <option value={"USD"}>USD</option>
                          <option value={"ZWL"}>ZWL</option>
                          <option value={"ZAR"}>ZAR</option>
                          <option value={"EUR"}>EUR</option>
                        </select>
                        {errors.sellCurrency && <span className='notification-color'>Currencyis required</span>}
                      </div>

                      <div class="form-group">
                        <label for="">Amount</label>
                        {/* <input type="text" class="form-control" id="clientName" placeholder="Amount"  {...register("sellAmount")}
                        value={sellAmount}
                        /> */}
                         <CurrencyInput 
                            className='form-control'
                            value={sellAmount}
                            decimalScale={2}
                         />
                        {errors.sellAmount && <span className='notification-color'>Amount is required</span>}
                      </div>

                      <div class="form-group">
                          <label for="exampleFormControlSelect3">Settlement Status</label>
                          <select class="form-control form-control-sm" id="exampleFormControlSelect3" {...register("sellSettlementStatus")}>
                            <option value={1}>SETTLED</option>
                            <option value={2}>UNSETTLED</option>
                          </select>
                          {errors.sellSettlementStatus && <span className='notification-color'>Settlement Status is required</span>}
                      </div>

                      <div class="form-group">
                            <label for="">Settlement Date</label>
                            <input type="date" class="form-control" id="dealDate" placeholder="Date"  {...register("sellSettlementDate", { required: true })}/>
                            {errors.sellSettlementDate && <span className='notification-color'>Settlement Date is required</span>}
                      </div>
                    

                      <button type="submit" class="btn btn-primary mr-2 float-right">Submit</button>

                  </div>
              </div>
            </div>
        </form>

        <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            >

              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">Add Client</h4>
                
                  <form class="forms-sample" onSubmit={handleSubmit2(addClient)}>
                    <div class="form-group">
                      <label for="exampleInputUsername1">FirstName</label>
                      <input type="text" class="form-control" id="exampleInputUsername1" placeholder="FirstName" {...register2("name", {required:true })} />
                    </div>
                    <div class="form-group">
                      <label for="exampleInputUsername1">Surname</label>
                      <input type="text" class="form-control" id="exampleInputUsername1" placeholder="Surname" {...register2("surname",  {required:true })} />
                    </div>
                
                    <div class="form-group">
                      <label for="exampleInputUsername1">National ID</label>
                      <input type="text" class="form-control" id="username" placeholder="National ID" {...register2("nationalId",  {required:true })} />
                    </div>
                    <div class="form-group">
                      <label for="exampleInputEmail1">Address</label>
                      <input type="text" class="form-control" id="exampleInputEmail1" placeholder="Address" {...register2("address",  {required:true })}/>
                    </div>
                  
                    <div class="form-group">
                      <label for="exampleInputPassword1">Mobile Number</label>
                      <input type="text" class="form-control" id="password" placeholder="Mobile Number" {...register2("mobileNumber",  {required:true })} />
                    </div>
                  
                    <button type="submit" class="btn btn-primary mr-2 float-right">Submit</button>
                    <button class="btn btn-light float-left" onClick={closeModal}>Cancel</button>
                  </form>
                </div>
              </div>
          
        </Modal>

        <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Rates Notification"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
              On capturing  a currency stronger than USD telling the dealer to capture rate as e.g EUR - 0.9764
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Done</Button>
        </DialogActions>
        </Dialog>


      </Template>
    );

}

export default Deal;