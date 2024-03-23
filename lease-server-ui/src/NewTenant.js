import React, {useState} from 'react';
import axios from 'axios';

import NavBar from "./NavBar";
import './NewTenant.css';
import './App.css';

function NewTenant() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [checkInDate, setCheckInDate] = useState(Date.now());
    const [amount, setAmount] = useState(0.00);

    const addTenant = async (e) => {
      try {
        e.preventDefault();
        if(firstName === '' || lastName === '' || checkInDate === '' || amount === 0) {
          alert('Please enter values for all fields.');
          return;
        }

        // send a post request to your backend to authenticate
        const response = await axios.post('http://localhost:3001/addTenant',  {firstName, lastName, checkInDate, amount});       
        if(JSON.stringify(response.data.message) === "true") {
            alert("Tenant has been added!");           
        } else {
            alert("Error adding Tenant.");
        }     
        setFirstName('');
        setLastName('');
        setCheckInDate(Date.now());
        setAmount(0.00);


      } catch (error) {
        if(error) {
            console.error(error);
        }
      }
    }

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
                      value={firstName}
                      onChange={(e)=> setFirstName(e.target.value) }
            /> 
          </div>

          <div>
            <label className='NewTenantLabel' htmlFor='LastName'>Last Name</label>   
            <input  type='text' 
                    id='LastName' 
                    placeholder='LastName' 
                    alt='LastName' 
                    value={lastName}
                    onChange={(e)=> setLastName(e.target.value) }
             />  
          </div>

          <div>
            <label className='NewTenantLabel' htmlFor='CheckInDate'>Check-in Date</label>   
            <input  type='date' 
                    id='CheckInDate' 
                    placeholder='CheckInDate' 
                    alt='CheckInDate' 
                    value={checkInDate}
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
                    value={amount}
                    onChange={(e)=> setAmount(e.target.value) }
            />  
          </div>

          <div>
            <button className="AddTenantBtn" type='submit'
                    onClick={addTenant}>Add Tenant</button>
          </div>
        </div>  

      </div>
    );
   
  }
  
  export default NewTenant;