import React, {useState} from 'react';

import NavBar from "./NavBar";
import './NewTenant.css';
import './App.css';

function NewTenant() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [checkInDate, setCheckInDate] = useState(Date.now());
    const [amount, setAmount] = useState(0.00);

    return (    
      <div className="App">
        <NavBar/>
        <div className="NewTenant">
          <div>            
            <label className='NewTenantLabel' htmlFor='FirstName'>First Name</label>                         
            <input  type='text' 
                      id='FirstName' 
                      placeholder='FirstName' 
                      alt='FirstName' 
                      onChange={(e)=> setFirstName(e.target.value) }
            /> 
          </div>

          <div>
            <label className='NewTenantLabel' htmlFor='LastName'>Last Name</label>   
            <input  type='text' 
                    id='LastName' 
                    placeholder='LastName' 
                    alt='LastName' 
                    onChange={(e)=> setLastName(e.target.value) }
             />  
          </div>

          <div>
            <label className='NewTenantLabel' htmlFor='CheckInDate'>Check-in Date</label>   
            <input  type='date' 
                    id='CheckInDate' 
                    placeholder='CheckInDate' 
                    alt='CheckInDate' 
                    onChange={(e)=> setCheckInDate(e.target.value) }
            />
          </div>  

          <div>
            <label className='NewTenantLabel' htmlFor='Amount'>Rent Amount</label>
            <input  type='number' 
                    min='1'
                    step='any'
                    id='Amount' 
                    placeholder='Amount' 
                    alt='Amount' 
                    onChange={(e)=> setAmount(e.target.value) }
            />  
          </div>

          <div>
            <button className="AddTenantBtn" type='submit'
                    onClick="">Add Tenant</button>
          </div>
        </div>  

      </div>
    );
   
  }
  
  export default NewTenant;