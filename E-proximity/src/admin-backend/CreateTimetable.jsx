import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

  return (
    <div>
      <h2>Create Timetable</h2>
      {newTimetable.entries.map((entry, index) => (
        <div key={index}>
          <label>
            Day:
            <input
              type="text"
              value={entry.day}
              onChange={(e) => handleInputChange(index, 'day', e.target.value)}
            />
          </label>
          <label>
            Time:
            <input
              type="text"
              value={entry.time}
              onChange={(e) => handleInputChange(index, 'time', e.target.value)}
            />
          </label>
          <label>
            Faculty:
            <input
              type="text"
              value={entry.faculty}
              onChange={(e) => handleInputChange(index, 'faculty', e.target.value)}
            />
          </label>
          <label>
            Subject:
            <input
              type="text"
              value={entry.subject}
              onChange={(e) => handleInputChange(index, 'subject', e.target.value)}
            />
          </label>
        </div>
      ))}
      <button type="button" onClick={handleAddEntryClick}>
        Add Entry
      </button>
      <button type="button" onClick={handleAddTimetableClick}>
        Add New Timetable
      </button>

      {/* Display existing timetables */}
      <div>
        <h3>Existing Timetables</h3>
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
  );
};

export default CreateTimetable;
