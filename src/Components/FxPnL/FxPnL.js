import React, {useState, useEffect} from 'react';
import ReportsApiService from '../../Services/ReportsService';
import Template from '../Template/Template';
import './FxPnL.css';

const FxPnL = () => {

  console.log(localStorage.getItem('token'))

  const [deals, setDeals] = useState([])

  const getFxPnL = () => {
    ReportsApiService.getFxPnL()
      .then(response => {
        console.log(response.data)
        setDeals(response.data)
        console.log(deals)
      })
      .catch(error => {
        console.log(error)
      })
  }

  
  useEffect(() => {
    getFxPnL()   
  },[]);

    return (
      <Template>
        <div className="col-lg-12 grid-margin">
        <div className="card">
              <h4 class="card-title padding-top">Forex Profit & Loss</h4>
              <div class="card-body">
                    {/* <div> */}
                      <button type="button" class="btn btn-info btn-rounded btn-fw float-right button-margin-bottom">Filter By Date</button>
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
                              <td>{deal.currency} {deal.amount}</td>
                              <td>{deal.sourceOfFunds}</td>
                              <td>{deal.sellCurrency} {deal.sellAmount}</td>
                              <td>{deal.sellSourceOfFunds}</td>
                              <td>{deal.currency} {deal.realizedProfit}</td>
                              <td></td>
                              <td></td>
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

      </Template>
    );
  }

export default FxPnL;