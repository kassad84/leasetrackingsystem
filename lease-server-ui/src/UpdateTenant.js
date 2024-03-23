import {useState} from 'react';

import NavBar from "./NavBar";
import './App.css';
import './UpdateTenant.css';

function UpdateTenant() {
  
    const [firstOrLastName, setFirstOrLastName] = useState('');

    return (    
      <div class="App">
        <NavBar/>
        <div className="UpdateTenant">
          <div>
            <input      type='text' 
                        id='FirstOrLastName' 
                        placeholder="Enter Tenant's First Name or Last Name"
                        alt='FirstOrLastName'                        
                        value={firstOrLastName}
                        onChange={(e)=> setFirstOrLastName(e.target.value) }
              /> 
              <button className="SearchName" type='submit'
                    onClick=''>Search</button>
          </div>
          <div>            
            <label className='UpdateTenantLabel' htmlFor='FirstName'>First Name</label>                         
            <input  type='text' 
                      id='FirstName' 
                      placeholder='FirstName' 
                      alt='FirstName'         
                      readOnly='true'            
                      /**onChange=''**/
            /> 
          </div>

          <div>
            <label className='UpdateTenantLabel' htmlFor='LastName'>Last Name</label>   
            <input  type='text' 
                    id='LastName' 
                    placeholder='LastName' 
                    alt='LastName'       
                    readOnly='true'              
                    /**onChange=''**/
             />  
          </div>

          <div>
            <label className='UpdateTenantLabel' htmlFor='CheckInDate'>Check-in Date</label>   
            <input  type='date' 
                    id='CheckInDate' 
                    placeholder='CheckInDate' 
                    alt='CheckInDate' 
                    /**onChange=''**/
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
                    /**onChange=''**/
            />  
          </div>

        </div>    
      </div>
    );
   
  }
  
  export default UpdateTenant;