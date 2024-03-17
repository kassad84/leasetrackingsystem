import './Login.css';
import Header from './Header';
import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Login() {
    let navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {

            if(username === '' || password === '') {
                alert('Invalid Username or password!');
                return;
            }

            // send a post request to your backend to authenticate
            const response = await axios.post('http://localhost:3001/login',  {username, password});
            if(JSON.stringify(response.data.message) === "true") {
                return navigate("/main");
            } else {
                alert("Invalid Login.  Please enter correct username/password.");
            }            

            //check out how to use localStorage
            //check reactjs exercise 07_04

        } catch (error) {
            if(error) {
                console.error(error);
            }
        }
    }

    return ( 
        <div>
            <Header/>
            <div className='Login-Container' >
                <div className='Login'>
                    <div className='un'>
                        <div className='left'>
                            <label htmlFor='Username'>Username</label>
                        </div>
                        <div className='right'>
                            <input  type='text' 
                                    id='Username' 
                                    placeholder='Username' 
                                    alt='Username' 
                                    onChange={(e)=> setUsername(e.target.value) }
                                    autoComplete='username'/>
                        </div>
                    </div>
                    <div className='pw'>
                        <div className='left' >
                            <label htmlFor='Password'>Password</label>
                        </div>
                        <div className='right'>
                            <input  type='password' 
                                    id='Password' 
                                    placeholder='Password' 
                                    alt='Password'
                                    onChange={(e)=> setPassword(e.target.value)}
                                    onKeyDown={(e) => { 
                                                    if(e.key === 'Enter') {
                                                        handleLogin();
                                                    }
                                                }}/>
                        </div>
                    </div>
                    <div className='btn'>
                        <button type='submit'
                                onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
