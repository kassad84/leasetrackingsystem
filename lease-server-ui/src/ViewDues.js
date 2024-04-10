import {useState} from 'react';
import axios from 'axios';

import NavBar from "./NavBar";
import './App.css';
import './ViewDues.css';

function ViewDues() {
  
    const [dueDate, setDueDate] = useState('');
    const [data, setData] = useState([]);

    const search = async (e) => {
      try {
        e.preventDefault();
        if(dueDate === '') {
          alert('Please enter a valid due date in the search box.');
          return;
        }

        // send a post request to your backend to authenticate
        const response = await axios.post('http://localhost:3001/viewDues',  {dueDate});
        if( response.data.length !== 0 ) {
              setData(response.data);                    
        } else {
              alert("No records found.");
              setData([]); 
        }         
        setDueDate('');

      } catch (error) {
        if(error) {
            console.error(error);
        }
      }
    }

    return (    
      <div class="App">
        <NavBar/>
        <div>            
            <label className='ViewDuesLabel' htmlFor='DueDate'>Specify Due Date</label>                         
            <input  type='date' 
                      id='DueDate' 
                      placeholder='DueDate' 
                      alt='DueDate'         
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}                               
            /> 
            <button className="Search" type='submit'
                    onClick={search}>Search</button>
          </div>   
          <div>
            <table>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Due Date</th>
                <th>Amount</th>
                <th>Paid (Yes/No)</th>
              </tr>
              {data.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val.firstName}</td>
                            <td>{val.lastName}</td>
                            <td>{val.checkInDate}</td>
                            <td>{val.amount}</td>
                            <td>{val.paid}</td>
                        </tr>
                    )
                })}
            </table>
          </div>  
      </div>
    );
   
  }
  
  export default ViewDues;