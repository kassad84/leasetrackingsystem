import {useState} from 'react';
import axios from 'axios';

import NavBar from "./NavBar";
import './App.css';
import './TenantEarnings.css';

function TenantEarnings() {
  
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');

    const calculateEarnings = async (e) => {
      try {
        e.preventDefault();
        if(dateFrom === '' || dateTo === '') {
          alert('Please enter valid dates in the search box.');
          return;
        }

        // send a post request to your backend to authenticate
        const response = await axios.post('http://localhost:3001/calculateEarnings',  {dateFrom, dateTo});
        if( response.data !== undefined ) {
              document.getElementById('TotalEarningsDateLabel').innerHTML = `Total Earnings from [${dateFrom}] to [${dateTo}]`;              
              document.getElementById('TotalEarningsAmountLabel').innerHTML = `Php ${JSON.stringify(response.data.totalData)}`;   
        } else {
              alert("No records found.");             
        }         
        setDateFrom('');
        setDateTo('');

      } catch (error) {
        if(error) {
            console.error(error);
        }
      }
    }

    return (    
      <div class="App">
        <NavBar/>
        <div className="TenantEarnings" >
          <div>            
              <label className='TenantEarningsLabel' htmlFor='DateFrom'>Date From</label>                         
              <input  type='date' 
                        id='DateFrom' 
                        placeholder='DateFrom' 
                        alt='DateFrom'         
                        value={dateFrom}
                        onChange={(e) => setDateFrom(e.target.value)}                               
              /> 
              <label className='TenantEarningsLabel' htmlFor='DateTo'>Date To</label>                         
              <input  type='date' 
                        id='DateTo' 
                        placeholder='DateTo' 
                        alt='DateTo'         
                        value={dateTo}
                        onChange={(e) => setDateTo(e.target.value)}                               
              /> 
              <button className="Search" type='submit'
                      onClick={calculateEarnings}>Search</button>
            </div>
            <div>
              <label className='TenantEarningsLabel' id='TotalEarningsDateLabel' >Total Earnings from [dd/mm/yyyy] to [dd/mm/yyyy]</label> 
              <label className='TenantEarningsLabel' id='TotalEarningsAmountLabel'>Php 0.00</label> 
            </div>
          </div>         
      </div>
    );
   
  }
  
  export default TenantEarnings;