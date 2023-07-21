import Navbar from "../../components/navbar/Navbar";
import React, { useState, useEffect } from 'react';
import "./report2.scss";
import { Link } from "react-router-dom";
import { db } from "../../firebase.js";
import { doc, getDoc } from 'firebase/firestore';

const Report2 = () => {
  // Add state variables for tracking the selected time period
  const [timePeriod, setTimePeriod] = useState('');

  // Function to handle button clicks
  const handleButtonClick = (period) => {
    setTimePeriod(period);
  };

  // useEffect hook to fetch data or perform other actions based on the selected time period
  useEffect(() => {
    // Perform actions based on the selected time period
    // e.g., Fetch data from the database, update UI, etc.
    if (timePeriod === 'weekly') {
      // Perform weekly actions
      window.location.href = "/Report3";
    } else if (timePeriod === 'monthly') {
      // Perform monthly actions
      window.location.href = "/logs";
    }
  }, [timePeriod]);

  return (
    <div>
      <Navbar />
      <div className="report2">
        <div className="button-container">
          <button className="button" onClick={() => handleButtonClick('weekly')}>Weekly</button>
          <button className="button" onClick={() => handleButtonClick('monthly')}>Monthly</button>
        </div>
        <Link to="/Home">Go back to home</Link>
      </div>
    </div>
  );
}

export default Report2;




