import './FeeDetails.css';
import React from 'react';
import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Sticky from 'react-stickynode';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Dropdown } from 'primereact/dropdown';
function FeeDetails(){
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
    const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)}
    const [selectedFee, setSelectedFee] = useState(null);
    const Fee = [
        { name: 'Registration', code: 'RS' },
        { name: 'Academic', code: 'AC' },
        { name: 'Examination', code: 'EX' }
    ];
    return(
        <div className='grid-container'>
            <Header OpenSidebar={OpenSidebar}/>
            <Sticky><Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} className="scroll"/></Sticky>
            <div className='feild-wrapper'>
                <h3>Fee Details</h3>
                <div className='Fee-Selection'>
                    <h6>Fee Type</h6>
                    <div className="DropDown">
                    <Dropdown  className="w-full md:w-14rem" value={selectedFee} onChange={(e) => setSelectedFee(e.value)} options={Fee} optionLabel="name" 
                    placeholder="Select Fee Type" />
                </div>
                </div>
                <div className='Invoice'>
                    <div className='Due'>
                        <h6>Student-Dues</h6>
                    </div>
                    <div className='Invoice-Table'>
                        <Table responsive="lg">
                            <thead>
                                <tr>
                                <th>Invoice No</th>
                                <th>Due Date</th>
                                <th>Balance Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>#1237</td>
                                <td>12-12-2023</td>
                                <td>70500/-</td>
                                </tr>
                            </tbody>
                        </Table>
                        <div className='submit' >
                            <Button href='#' variant="secondary" size="sm" className='Submit-btn'>
                                Submit Fee
                            </Button>{' '}
                        </div>
                    </div>
                </div>
                <div className='Invoice'>
                    <div className='Due'>
                        <h6>Fee Reciept</h6>
                    </div>
                    <div className='Invoice-Table'>
                        <Table responsive="lg">
                            <thead>
                                <tr>
                                <th>Fee Receipt No.</th>
                                <th>Receipt Date</th>
                                <th>Received Amount</th>
                                <th>Mode of Payment</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>#1237</td>
                                <td>12-12-2023</td>
                                <td>70500/-</td>
                                <td>Online</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default FeeDetails;
