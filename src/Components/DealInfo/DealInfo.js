import React, {useEffect, useState } from 'react';
import {useParams, useNavigate} from 'react-router-dom'
import DealApiService from '../../Services/TradeService';
import Template from '../Template/Template';
import './DealInfo.css';

const DealInfo = () =>  {
  const navigate = useNavigate();
  const dealNo = useParams();
  const [deal, setDeal] = useState([]);

  const getTrade = (id) => {
    DealApiService.getDeal(id)
      .then( response => {
        setDeal(response.data) 
      })
      .catch( error => error)
  }

  useEffect(() => {
    getTrade(dealNo.id)   
  },[]);

    return (
      <div>
         <Template>
         <div class="row">
            <div class="col-md-3 stretch-card grid-margin">
              <div class="card">
                <div class="card-body">
                  <p class="card-title mb-0">Trade Info</p>
                  <div class="table-responsive">
                    <table class="table table-borderless">
                      <thead>
                        <tr>
                          <th class="pl-0  pb-2 border-bottom">Attribute</th>
                          <th class="border-bottom pb-2">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td class="pl-0">Deal No</td>
                          <td><p class="mb-0">{deal.dealNumber}</p></td>
                        </tr>
                        <tr>
                          <td class="pl-0">Deal Date</td>
                          <td><p class="mb-0">{deal.dealDate}</p></td>
                        </tr>
                        <tr>
                          <td class="pl-0">Deal Type</td>
                          <td><p class="mb-0">{deal.dealType}</p></td>
                        </tr>
                        <tr>
                          <td class="pl-0">Risk Rate</td>
                          <td><p class="mb-0">{deal.riskRate}</p></td>
                        </tr>
                        <tr>
                          <td class="pl-0">Transaction Rate</td>
                          <td><p class="mb-0">{deal.transactionRate}</p></td>
                        </tr>
                        <tr>
                          <td class="pl-0">Segment</td>
                          <td><p class="mb-0">{deal.segment}</p></td>
                        </tr>
                        <tr>
                          <td class="pl-0">Inter Desk</td>
                          <td><p class="mb-0">{deal.interDesk}</p></td>
                        </tr>
                        <tr>
                          <td class="pl-0">Created By</td>
                          <td><p class="mb-0">{deal.createdBy}</p></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-3 stretch-card grid-margin">
              <div class="card">
                <div class="card-body">
                  <p class="card-title mb-0">Buy</p>
                  <div class="table-responsive">
                    <table class="table table-borderless">
                      <thead>
                        <tr>
                        <th class="pl-0  pb-2 border-bottom">Attribute</th>
                          <th class="border-bottom pb-2">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* <tr>
                          <td class="pl-0">Recieving Bank</td>
                          <td><p class="mb-0">{deal.receivingBank}</p></td>
                        </tr> */}
                        <tr>
                          <td class="pl-0">Source Of Funds</td>
                          <td><p class="mb-0">{deal.sourceOfFunds}</p></td>
                        </tr>
                        <tr>
                          <td class="pl-0">Currency</td>
                          <td><p class="mb-0">{deal.currency}</p></td>
                        </tr>
                        <tr>
                          <td class="pl-0">Amount</td>
                          <td><p class="mb-0">{deal.amount}</p></td>
                        </tr>
                        <tr>
                          <td class="pl-0">Settlement Status</td>
                          <td><p class="mb-0">{deal.settlementStatus}</p></td>
                        </tr>
                        <tr>
                          <td class="pl-0">Settlement Date</td>
                          <td><p class="mb-0">{deal.settlementDate}</p></td>  
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-3 stretch-card grid-margin">
              <div class="card">
                <div class="card-body">
                  <p class="card-title mb-0">Sell</p>
                  <div class="table-responsive">
                    <table class="table table-borderless">
                      <thead>
                        <tr>
                        <th class="pl-0  pb-2 border-bottom">Attribute</th>
                          <th class="border-bottom pb-2">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* <tr>
                          <td class="pl-0">Recieving Bank</td>
                          <td><p class="mb-0">{deal.receivingBank}</p></td>
                        </tr> */}
                        <tr>
                          <td class="pl-0">Source Of Funds</td>
                          <td><p class="mb-0">{deal.sellSourceOfFunds}</p></td>
                        </tr>
                        <tr>
                          <td class="pl-0">Currency</td>
                          <td><p class="mb-0">{deal.sellCurrency}</p></td>
                        </tr>
                        <tr>
                          <td class="pl-0">Amount</td>
                          <td><p class="mb-0">{deal.sellAmount}</p></td>
                        </tr>
                        <tr>
                          <td class="pl-0">Settlement Status</td>
                          <td><p class="mb-0">{deal.sellSettlementStatus}</p></td>
                        </tr>
                        <tr>
                          <td class="pl-0">Settlement Date</td>
                          <td><p class="mb-0">{deal.sellSettlementDate}</p></td>  
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-3 stretch-card grid-margin">
              <div class="card">
                <div class="card-body">
                  <p class="card-title mb-0">Actions</p>
                  <div class="table-responsive">
                    <table class="table table-borderless">
                      <thead>
                        <tr>
                        <th class="pl-0  pb-2 border-bottom"></th>
                       
                        </tr>
                      </thead>
                      <tbody>
                    
                      <div class="template-demo">
                    
                        <button type="button" class="btn btn-primary btn-lg btn-block"
                        onClick={() => navigate(`/edit/${dealNo.id}`)}
                        >
                          <i class="mdi mdi-grease-pencil"> </i>                      
                           Edit Trade
                        </button>
                        <button type="button" class="btn btn-primary btn-lg btn-block">
                          <i class="mdi mdi-grease-pencil"> </i>                       
                          View All Trades
                        </button>
                       
                      </div>
              
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

         </Template>
      </div>
    );
}

export default DealInfo;