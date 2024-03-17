import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './Login';
import App from './App';
import NewTenant from './NewTenant';
import UpdateTenant from './UpdateTenant';
import ViewDues from './ViewDues';
import TenantEarnings from './TenantEarnings';
import TenantHistory from './TenantHistory';
import About from './About';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>  
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<App />} />
        <Route path="/new-tenant" element={ <NewTenant />} />
        <Route path="/update-tenant" element={ <UpdateTenant/>} />
        <Route path="/view-dues" element={<ViewDues />} />
        <Route path="/earnings-tenant" element={<TenantEarnings/>} />
        <Route path="/tenant-history" element={<TenantHistory/>} />
        <Route path="/about" element={<About/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
