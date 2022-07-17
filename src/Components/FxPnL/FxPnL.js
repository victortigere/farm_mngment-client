import React, {useState, useEffect} from 'react';
import ReportsApiService from '../../Services/ReportsService';
import Template from '../Template/Template';
import CurrencyFormat from 'react-currency-format';
import './FxPnL.css';

const FxPnL = () => {

  const [deals, setDeals] = useState([])

  const getFxPnL = () => {

    ReportsApiService.getFxPnL()
      .then(response => {
        setDeals(response.data)
      })
      .catch(error => {
      })
  }

  const getFxPnLByDate= (date) => {
      console.log()
      ReportsApiService.getFxPnLByDate(date)
      .then(response => {
        setDeals(response.data)
        console.log(response)
      })
      .catch(error => {
      })
  }

  
  // useEffect(() => {
  //   getFxPnL()   
  // },[]);

    return (
      <Template>
        <div className="col-lg-12 grid-margin">
          <div className="card">
                <h4 class="card-title padding-top">Forex Profit & Loss</h4>
                <div class="card-body">
                      {/* <div> */}
                      <div className='row filter-by-div-margin-bottom'>

                    
                        <div className='col-md-6'>
                        </div>
                        <div className='col-md-6'>
                        <input type="date" 
                              class="form-control" 
                              id="dealDate" 
                              placeholder="Date" 
                              // {...register("dealDate", { required: true } )}
                              onChange = { (e) => {
                                getFxPnLByDate(e.target.value)
                              }}
                            />
                        </div>

                      </div>
                        
                      {/* </div> */}
                  
                      <div class="table-responsive">
                        <table class="table table-hover table-bordered">
                          <thead>
                            <tr>
                              <th>Deal No</th>
                              <th>Deal Date</th>
                              <th>Client</th>
                              <th>Dealer</th>
                              <th>Buy</th>
                              <th>Buy Source</th>
                              <th>Sell</th>
                              <th>Sell Source</th>
                              <th>Realised PnL Ccy</th>
                              <th>Realized Profit</th>
                              <th>Unrealized Profit</th>
                              <th>Total Profit</th>
                            </tr>
                          </thead>
                           <tbody>
                            { deals !== [] ? deals.map( deal =>
                              <tr>
                                <td>{deal.dealNumber}</td>
                                <td>{deal.dealDate}</td>
                                <td>{deal.client.name} {deal.client.surname} </td>
                                <td>{deal.createdBy}</td>
                                <td>
                                <CurrencyFormat value={deal.amount} 
                                    decimalScale={2} 
                                    displayType={'text'} 
                                    fixedDecimalScale={true}
                                    thousandSeparator={true} 
                                    prefix={deal.currency}
                                    renderText={value => 
                                    <div>{value}</div>} 
                                />
                                </td>
                                <td>{deal.sourceOfFunds}</td>
                                <td> 
                                    <CurrencyFormat value={deal.sellAmount} 
                                        decimalScale={2} 
                                        displayType={'text'} 
                                        fixedDecimalScale={true}
                                        thousandSeparator={true} 
                                        prefix={deal.sellCurrency}
                                        renderText={value => 
                                        <div>{value}</div>} 
                                    />
                                </td>
                                <td>{deal.sellSourceOfFunds}</td>
                                <td>
                                    <CurrencyFormat value={deal.realizedPnL} 
                                        decimalScale={2} 
                                        displayType={'text'} 
                                        fixedDecimalScale={true}
                                        thousandSeparator={true} 
                                        prefix={deal.sellCurrency}
                                        renderText={value => 
                                        <div>{value}</div>} 
                                    />
                                </td>
                                <td>
                                {deal.realizedPnlBaseCurrency !== null ? 
                                <CurrencyFormat value={deal.realizedPnlBaseCurrency} 
                                        decimalScale={2} 
                                        displayType={'text'} 
                                        fixedDecimalScale={true}
                                        thousandSeparator={true} 
                                        prefix={'USD'}
                                        renderText={value => 
                                        <div>{value}</div>} 
                                    /> : 
                                    "Not yet calculated"
                                        }
                                </td>
                                 
                                <td>
                                  {
                                 deal.unRealizedProfit !== null ?   
                                 <CurrencyFormat value={deal.unRealizedProfit} 
                                 decimalScale={2} 
                                 displayType={'text'} 
                                 fixedDecimalScale={true}
                                 thousandSeparator={true} 
                                 prefix={'USD'}
                                 renderText={value => 
                                 <div>{value}</div>} 
                             /> : "Not yet calculated" }
                                 </td> 
                               <td>
                                { deal.totalProfitAndLoss !==  null ?  
                                  <CurrencyFormat value={deal.totalProfitAndLoss}
                                            decimalScale={2} 
                                            displayType={'text'} 
                                            fixedDecimalScale={true}
                                            thousandSeparator={true} 
                                            prefix={'USD'}
                                            renderText={value => 
                                            <div>{value}</div>} 
                                        /> : "Not yet calculated" }
                               </td>   
                             </tr> 
                              ) :
                              <h4>No deals present</h4>
                            }
                          </tbody> 
                        </table> 
                      </div>
                </div>
          </div>
        </div>

      </Template>
    );
  }

export default FxPnL;