import React from 'react';
import { useNavigate } from 'react-router-dom';
import Template from '../Template/Template';

const Reports = () => {

  const navigate = useNavigate();

    return (
      <Template>
        <div className='row'>
          <div className='col-md-4'>
          <div class="card">
                <div class="card-body">
                  <p class="card-title mb-0">Reports</p>
                  <div class="table-responsive">
                    <table class="table table-borderless">
                      <thead>
                        <tr>
                        <th class="pl-0  pb-2 border-bottom"></th>
                       
                        </tr>
                      </thead>
                      <tbody>
                    
                      <div class="template-demo">
                    
                        <button type="button" class="btn btn-primary btn-md btn-block"
                        onClick={() => {navigate('/fx-pnl')}}>
                          <i class="mdi mdi-grease-pencil"> </i>                      
                           Forex Profit & Loss
                        </button>
                        <button type="button" class="btn btn-primary btn-md btn-block">
                          <i class="mdi mdi-grease-pencil"> </i>                       
                          Forex Interdesk Balance
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
    );
  }

export default Reports;