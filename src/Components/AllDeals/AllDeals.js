import React, {useEffect, useState} from 'react';
import './AllDeals.css';
import Template from '../Template/Template';
import { useNavigate } from 'react-router-dom';
import DealApiService from '../../Services/TradeService';


const ViewDeal = () => {

  const navigate = useNavigate();
  const [deals, setDeals] = useState([]);

  const navigateToCreateDeal = () => {
    navigate('/create/deal');
  }

  const getTrades = () => {
    DealApiService.getDealS()
      .then( response => {
        setDeals(response.data) 
      })
      .catch( error => error)
  }

  const getDealsByDate = (date) => {
    DealApiService.getDealsByDate(date)
      .then( response => {
        setDeals(response.data) 
      })
      .catch( error => error)
  }

  // useEffect(() => {
  //   getTrades()   
  // },[]);

  
  return(
    <Template>
        <div className="col-lg-12 grid-margin">
        <div className="card">
              <h4 class="card-title padding-top">My Deals</h4>
              <div class="card-body">

                    <div>
                    <input type="date" 
                            class="form-control  col-md-4 deals-content-float-50" 
                            id="dealDate" 
                            placeholder="Date"
                            onChange = { (e) => {
                              getDealsByDate(e.target.value)
                            }} 
                          />
                      <button type="button" class="btn btn-info btn-rounded btn-fw float-right deals-content-float-50 col-md-3" onClick={navigateToCreateDeal}>Create Deal</button>
                    </div>
                   
                
                    <div class="table-responsive">
                      <table class="table table-hover">
                        <thead>
                          <tr>
                            <th>Deal No</th>
                            <th>Client</th>
                            <th>Deal Date</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          { deals !== [] ? deals.map( deal =>  
                            <tr key = {deal.id}>
                              <td>{deal.dealNo}</td>
                              <td>{deal.client.name + "  " + deal.client.surname }</td>
                              <td>{deal.dealDate}</td>
                              <td>{deal.status}</td>
                              <td>
                                <button type="button" class="btn btn-info btn-sm"
                                onClick={() => navigate(`/deal/${deal.id}`)}>
                                  More Info
                                </button>
                              </td>
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

export default ViewDeal;