import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewTimetables = () => {
  const [timetables, setTimetables] = useState([]);

  useEffect(() => {
    // Fetch existing timetables from the backend on component mount
    axios.get('http://localhost:3000/api/timetables')
      .then(response => setTimetables(response.data))
      .catch(error => console.error('Failed to fetch timetables:', error));
  }, []);

  const getAllDays = () => {
    // Extract all unique days from all timetables
    const allDays = [];
    timetables.forEach(timetable => {
      timetable.entries.forEach(entry => {
        if (!allDays.includes(entry.day)) {
          allDays.push(entry.day);
        }
      });
    });
    return allDays;
  };

  const getAllTimings = () => {
    // Extract all unique timings from all timetables
    const allTimings = [];
    timetables.forEach(timetable => {
      timetable.entries.forEach(entry => {
        if (!allTimings.includes(entry.time)) {
          allTimings.push(entry.time);
        }
      });
    });
    return allTimings;
  };

  return (
    <div>
      <h2>View Timetables</h2>
      <div>
        <h3>Timetable</h3>
        <table border="1">
          <thead>
            <tr>
              <th>Time</th>
              {getAllDays().map((day, index) => (
                <th key={index}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {getAllTimings().map((time, timeIndex) => (
              <tr key={timeIndex}>
                <td>{time}</td>
                {getAllDays().map((day, dayIndex) => {
                  const entry = timetables
                    .map(timetable => timetable.entries.find(e => e.day === day && e.time === time))
                    .find(Boolean);

                  return (
                    <td key={dayIndex}>
                      {entry ? entry.subject : '-'}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewTimetables;
