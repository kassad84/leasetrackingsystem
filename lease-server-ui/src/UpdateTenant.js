import {useState} from 'react';
import axios from 'axios';

import NavBar from "./NavBar";
import './App.css';
import './UpdateTenant.css';

function UpdateTenant() {
  
    const [firstOrLastName, setFirstOrLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName]  = useState('');
    const [checkInDate, setCheckInDate] = useState(Date.now());
    const [amount, setAmount] = useState(0.00);
    const [paid, setPaid] = useState(false);

    const searchTenant = async (e) => {
      try {
        e.preventDefault();
        if(firstOrLastName === '') {
          alert('Please enter a First or Last name in the search box.');
          return;
        }

        // send a post request to your backend to authenticate
        const response = await axios.post('http://localhost:3001/searchTenant',  {firstOrLastName});
        if( JSON.stringify(response.data.firstName) !== undefined &&
            JSON.stringify(response.data.lastName) !== undefined &&
            new Date(response.data.checkInDate).toISOString().substring(0, 10) !== undefined && 
            JSON.stringify(response.data.amount) !== undefined && 
            JSON.stringify(response.data.paid) !== undefined) {
              setFirstName(response.data.firstName);
              setLastName(response.data.lastName);
              setCheckInDate(new Date(response.data.checkInDate).toISOString().substring(0, 10));
              setAmount(response.data.amount); 
              if(response.data.paid === 'Y') {
                setPaid(true);  
              } else {
                setPaid(false);
              }
                    
        } else {
              alert("No records found for the given First/Last Name.");
        }     
        setFirstOrLastName('');


      } catch (error) {
        if(error) {
            console.error(error);
        }
      }
    }

    const updateTenant = async (e) => {
      try {
        e.preventDefault();

        // send a post request to your backend to authenticate
        const paidFl = (paid === true)?'Y':'N';
        const response = await axios.post('http://localhost:3001/updateTenant',  {firstName, lastName, checkInDate, amount,paidFl});  
        if(JSON.stringify(response.data.message) === "true") {
          alert("Tenant has been updated!");           
        } else {
            alert("Error updating Tenant.");
        }     
        setFirstName('');
        setLastName('');
        setCheckInDate(Date.now());
        setAmount(0.00);
        setPaid(false);


      } catch (error) {
        if(error) {
            console.error(error);
        }
      }
    }    

    return (    
      <div className="App">
        <NavBar/>
        <div className="UpdateTenant">
          <div>
            <input      type='text' 
                        id='FirstOrLastName' 
                        placeholder="Enter Tenant's First/Last Name"
                        alt='FirstOrLastName'                        
                        value={firstOrLastName}
                        onChange={(e)=> setFirstOrLastName(e.target.value) }
              /> 
              <button className="SearchName" type='submit'
                    onClick={searchTenant}>Search</button>
          </div>
          <div>            
            <label className='UpdateTenantLabel' htmlFor='FirstName'>First Name</label>                         
            <input  type='text' 
                      id='FirstName' 
                      placeholder='FirstName' 
                      alt='FirstName'         
                      readOnly={true} 
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}                               
            /> 
          </div>

          <div>
            <label className='UpdateTenantLabel' htmlFor='LastName'>Last Name</label>   
            <input  type='text' 
                    id='LastName' 
                    placeholder='LastName' 
                    alt='LastName'       
                    readOnly={true}              
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
             />  
          </div>

          <div>
            <label className='UpdateTenantLabel' htmlFor='CheckInDate'>Check-in Date</label>   
            <input  type='date' 
                    id='CheckInDate' 
                    placeholder='CheckInDate' 
                    alt='CheckInDate' 
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
            />
          </div>  

          <div>
            <label className='UpdateTenantLabel' htmlFor='Amount'>Rent Amount</label>
            <input  type='number' 
                    min='1'
                    step='any'
                    id='Amount' 
                    placeholder='Amount' 
                    alt='Amount' 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
            />  
          </div>

          <div>            
            <label className='UpdateTenantLabel' htmlFor='Paid'>Paid</label>                         
            <input  type='checkbox' 
                      id='Paid' 
                      placeholder='Paid' 
                      alt='Paid'         
                      checked={paid}
                      onChange={(e) => setPaid(e.target.checked)}                               
            /> 
          </div>

          <div>
            <button className="UpdateTenantBtn" type='submit'
                    onClick={updateTenant}>Update Tenant Info</button>
          </div>

        </div>    
      </div>
    );
   
  }
  
  export default UpdateTenant;