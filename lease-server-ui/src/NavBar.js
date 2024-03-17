import './NavBar.css';
import {DropdownButton, Dropdown} from "react-bootstrap";


function NavBar() {

    return (
        <>
            <div className="dropdown">
                <DropdownButton className="dropbtn" title="File" variant="primary" >
                    <div className="dropdown-content">
                        <Dropdown.Item href="/new-tenant" >New Tenant</Dropdown.Item>
                        <Dropdown.Item href="/update-tenant" >Update Tenant Info</Dropdown.Item>
                    </div>            
                </DropdownButton>
            </div>
                
            <div className="dropdown">
                <DropdownButton className="dropbtn" title="Print/View" variant="primary" >
                    <div className="dropdown-content">
                        <Dropdown.Item href="/view-dues" >Print/View Tenant Payment Dues</Dropdown.Item>
                        <Dropdown.Item href="/earnings-tenant">Rent Earnings Inquiry</Dropdown.Item> 
                        <Dropdown.Item href="/tenant-history" >Tenant Info History</Dropdown.Item>            
                    </div>
                </DropdownButton>
            </div>

            <div className="dropdown">
                <DropdownButton className="dropbtn" title="About" variant="primary">
                    <div className="dropdown-content">
                        <Dropdown.Item href="/about" >About</Dropdown.Item>  
                    </div>               
                </DropdownButton>
            </div>
            
        </>
    );
}


export default NavBar;