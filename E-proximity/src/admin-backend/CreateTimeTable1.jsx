import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Student/Sidebar';
import Header from '../Student/Header';
import Sticky from 'react-stickynode';
import './CreateTimetable.css';
const CreateTimetable = () => {
  const [timetables, setTimetables] = useState([]);
  const [newTimetable, setNewTimetable] = useState({
    entries: [],
  });

  useEffect(() => {
    // Fetch existing timetables from the backend on component mount
    axios.get('http://localhost:3000/api/timetables')
      .then(response => setTimetables(response.data))
      .catch(error => console.error('Failed to fetch timetables:', error));
  }, []);

  const handleInputChange = (index, field, value) => {
    const updatedEntries = [...newTimetable.entries];
    updatedEntries[index][field] = value;
    setNewTimetable({ entries: updatedEntries });
  };

  const handleAddEntryClick = () => {
    setNewTimetable((prevTimetable) => ({
      entries: [...prevTimetable.entries, { day: '', time: '', faculty: '', subject: '' }],
    }));
  };

  const handleAddTimetableClick = () => {
    // Add the new timetable to the backend
    axios.post('http://localhost:3000/api/timetables', newTimetable)
      .then(response => {
        console.log(response.data.message);
        // Update the local state with the new timetable
        setTimetables((prevTimetables) => [...prevTimetables, newTimetable]);
      })
      .catch(error => console.error('Failed to create timetable:', error));
  };
    //Sidebar and Header
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const OpenSidebar = () => {
  setOpenSidebarToggle(!openSidebarToggle)}
  return (
    <div className='grid-container'>
        <Header OpenSidebar={OpenSidebar}/>
        <Sticky><Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} className="scroll"/></Sticky>
        <div className='CreateTimeTableContainer'>
        <h3>Create Time-Table</h3>
        <div className='MakeChangestimetable'><p>Make Changes In Your Time-Table Here !</p></div>
        <div className='CreateTimeTableBox'>
        {newTimetable.entries.map((entry, index) => (
            <div key={index}>
            <label>
                
                <input
                placeholder='Day'
                type="text"
                value={entry.day}
                onChange={(e) => handleInputChange(index, 'day', e.target.value)}
                />
            </label>
            <label>
                
                <input
                type="text"
                placeholder='Time'
                value={entry.time}
                onChange={(e) => handleInputChange(index, 'time', e.target.value)}
                />
            </label>
            <label>
                <input
                placeholder='Faculty'
                type="text"
                value={entry.faculty}
                onChange={(e) => handleInputChange(index, 'faculty', e.target.value)}
                />
            </label>
            <label>
                <input
                type="text"
                placeholder='Subject'
                value={entry.subject}
                onChange={(e) => handleInputChange(index, 'subject', e.target.value)}
                />
            </label>
            </div>
        ))}
        </div>
        <div className='button-div'>
        <button type="button" onClick={handleAddEntryClick} className='addentrybutton'>
            Add Entry
        </button>
        <button type="button" onClick={handleAddTimetableClick} className='addentrybutton'>
            Add New Timetable
        </button>
        </div>

        {/* Display existing timetables */}
        <div className='ExistingTimeTable'>
            <div className='heading'><h6>Existing Timetables</h6></div>
            <div className='ExistingTimeTableItems'>
            <ul>
            {timetables.map((timetable, index) => (
                <li key={index}>
                {timetable.entries.map((entry, entryIndex) => (
                    <span key={entryIndex}>
                    {`${entry.day} - ${entry.time} - ${entry.faculty} - ${entry.subject}`}{' '}
                    </span>
                ))}
                </li>
            ))}
            </ul>
            </div>
        </div>
        </div>
    </div>
  );
};

export default CreateTimetable;
