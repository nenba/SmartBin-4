// import React, { useState, useEffect } from "react";
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import moment from 'moment';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import './history.scss';
// import Navbar from "../../components/navbar/Navbar";
// import { Link } from "react-router-dom";
// import { db } from "../../firebase.js";
// import { doc, getDoc } from 'firebase/firestore';

// const events = [
//   {
//     id: 1,
//     title: 'Event 1',
//     start: new Date(2023, 1, 20),
//     end: new Date(2023, 1, 22),
//   },
//   {
//     id: 2,
//     title: 'Event 2',
//     start: new Date(2023, 1, 23),
//     end: new Date(2023, 1, 25),
//   },
// ];

// const localizer = momentLocalizer(moment);

// const MyCalendar = () => {
//   const timeslots = 2.5; // 12 slots for every hour, or 5 min intervals
//   const minTime = new Date();
//   minTime.setHours(0, 0, 0, 0);
//   const maxTime = new Date();
//   maxTime.setHours(23, 59, 0, 0); // set end time to 23:55
//   const [selectedDateData, setSelectedDateData] = useState(null); // state to hold data for selected date
  
//   // function to handle selection of a date in the calendar
//   const handleSelect = async (event) => {
//     const date = event.start; // get selected date
//     const formattedDate = moment(date).format("YYYY-MM-DD"); // format date in the desired format
//     const docRef = doc(db, "database", "tootfyaHcMhppikJcPaC", "dailyLogs", formattedDate); // get reference to the document in Firestore
//     const docSnap = await getDoc(docRef); // get the document snapshot
//     if (docSnap.exists()) {
//       const data = docSnap.data(); // get the data from the document
//       setSelectedDateData(data); // set the state with the data for selected date
//     } else {
//       setSelectedDateData(null); // if document doesn't exist, set the state to null
//     }
//   }

//   return (
//     <div>
//       <Navbar />
//       <div className="calendar-container">
//         <Calendar
//           localizer={localizer}
//           events={events}
//           startAccessor="start"
//           endAccessor="end"
//           style={{ height: '70vh' }}
//           min={minTime}
//           max={maxTime}
//           step={timeslots} // display time in 5 min intervals
//           selectable={true} // make the calendar dates selectable
//           onSelectEvent={handleSelect} // set the event handler for date selection
//         />
//         {selectedDateData && (
//           <div className="selected-date-data">
//             <h2>Data for {selectedDateData.date}</h2>
//             <p>{selectedDateData.description}</p>
//             <Link to={`/event/${selectedDateData.id}`}>View details</Link>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyCalendar;

// import React, { useState, useEffect } from "react";
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import moment from 'moment';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import './history.scss';
// import Navbar from "../../components/navbar/Navbar";
// import { Link } from "react-router-dom";
// import { db} from "../../firebase.js";
// import { doc, getDoc } from 'firebase/firestore';

// const events = [
//   {
//     id: 1,
//     title: 'Event 1',
//     start: new Date(2023, 1, 20),
//     end: new Date(2023, 1, 22),
//   },
//   {
//     id: 2,
//     title: 'Event 2',
//     start: new Date(2023, 1, 23),
//     end: new Date(2023, 1, 25),
//   },
// ];

// const localizer = momentLocalizer(moment);

// const MyCalendar = () => {
//   const timeslots = 2.5; // 12 slots for every hour, or 5 min intervals
//   const minTime = new Date();
//   minTime.setHours(0, 0, 0, 0);
//   const maxTime = new Date();
//   maxTime.setHours(23, 59, 0, 0); // set end time to 23:55


  
//   return (
//     <div>
//       <Navbar />
//       <div className="calendar-container">
//         <Calendar
//           localizer={localizer}
//           events={events}
//           startAccessor="start"
//           endAccessor="end"
//           style={{ height: '70vh' }}
//           min={minTime}
//           max={maxTime}
//           step={timeslots} // display time in 5 min intervals
//         />
//       </div>
//     </div>
//   );
// };

//export default MyCalendar;

// import React, { useState, useEffect } from "react";
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import moment from 'moment';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import './history.scss';
// import Navbar from "../../components/navbar/Navbar";
// import { Link } from "react-router-dom";
// import { db} from "../../firebase.js";
// import { doc, getDoc } from 'firebase/firestore';
// import Logs from "../../pages/Logss/Logs";

// const events = [
//   {
//     id: 1,
//     title: 'Event 1',
//     start: new Date(2023, 1, 20),
//     end: new Date(2023, 1, 22),
//   },
//   {
//     id: 2,
//     title: 'Event 2',
//     start: new Date(2023, 1, 23),
//     end: new Date(2023, 1, 25),
//   },
// ];

// const localizer = momentLocalizer(moment);

// const MyCalendar = () => {
//   const timeslots = 2.5;
//   const minTime = new Date();
//   minTime.setHours(0, 0, 0, 0);
//   const maxTime = new Date();
//   maxTime.setHours(23, 59, 0, 0);
//   const [selectedDate, setSelectedDate] = useState(null); // Track the selected date

//   const handleSelectEvent = (event) => {
//     setSelectedDate(event.start); // Update the selected date when an event is clicked
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="calendar-container">
//         <Calendar
//           localizer={localizer}
//           events={events}
//           startAccessor="start"
//           endAccessor="end"
//           style={{ height: '100vh' }}
//           min={minTime}
//           max={maxTime}
//           step={timeslots}
//           onSelectEvent={handleSelectEvent} // Add the onSelectEvent prop
//         />
//       </div>
//       {selectedDate && <Logs selectedDate={selectedDate} />} {/* Render the PaginationTable component when a date is selected */}
//     </div>
//   );
// };

// export default MyCalendar;

// import React, { useState } from 'react';
// import { Calendar } from 'antd';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../../components/navbar/Navbar';
// import './history.scss';

// const MyCalendar = () => {
//   const navigate = useNavigate();
//   const [selectedDate, setSelectedDate] = useState(null);

//   const handleSelect = (date) => {
//     setSelectedDate(date);
//   };

//   const handleDateCellRender = (value) => {
//     const isCellSelected = selectedDate && value.isSame(selectedDate, 'day');
//     return (
//       <div
//         className={isCellSelected ? 'selected-cell' : ''}
//         onClick={() => handleSelect(value)}
//       >
//         <div className="date-number">{value.date()}</div>
//       </div>
//     );
//   };

//   const handlePanelChange = () => {
//     setSelectedDate(null);
//   };

//   const handleNavigateToLogs = () => {
//     if (selectedDate) {
//       navigate('/Logs');
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <Calendar
//         onSelect={handleNavigateToLogs}
//         onPanelChange={handlePanelChange}
//         dateCellRender={handleDateCellRender}
//       />
//     </div>
//   );
// };

// export default MyCalendar;


// import React, { useState } from 'react';
// import { Calendar } from 'antd';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../../components/navbar/Navbar';
// import './history.scss';

// const MyCalendar = () => {
//   const navigate = useNavigate();
//   const [selectedDate, setSelectedDate] = useState(null);

//   const handleSelect = (date) => {
//     setSelectedDate(date);
//   };

//   const handleDateCellRender = (value) => {
//     const isCellSelected = selectedDate && value.isSame(selectedDate, 'day');
//     return (
//       <div
//         className={isCellSelected ? 'selected-cell' : ''}
//         onClick={() => handleSelect(value)}
//       >
//         {/* <div className="date-number">{value.date()}</div> */}
//         <div className="date-number">&nbsp;</div> {/* Render an empty string */}
//       </div>
//     );
//   };

//   const handlePanelChange = () => {
//     setSelectedDate(null);
//   };

//   const handleNavigateToLogs = () => {
//     if (selectedDate) {
//       const formattedDate = selectedDate.format('YYYY-MM-DD');
//       navigate.push(`/Report/${formattedDate}`);
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <Calendar
//         onSelect={handleNavigateToLogs}
//         onPanelChange={handlePanelChange}
//         dateCellRender={handleDateCellRender}
//       />
//     </div>
//   );
// };

// export default MyCalendar;

import React, { useState } from 'react';
import { Calendar } from 'antd';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import './history.scss';

const MyCalendar = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSelect = (date) => {
    setSelectedDate(date);
  };

  const handleDateCellRender = (value) => {
    const isCellSelected = selectedDate && value.isSame(selectedDate, 'day');
    return (
      <div
        className={isCellSelected ? 'selected-cell' : ''}
        onClick={() => handleSelect(value)}
      >
        {/* <div className="date-number">{value.date()}</div> */}
        <div className="date-number">&nbsp;</div> {/* Render an empty string */}
      </div>
    );
  };

  const handlePanelChange = () => {
    setSelectedDate(null);
  };

  const handleNavigateToLogs = () => {
    if (selectedDate) {
      const formattedDate = selectedDate.format('YYYY-MM-DD');
      navigate(`/Report/${formattedDate}`);
    }
  };

  return (
    <div>
      <Navbar />
      <Calendar
        onSelect={handleNavigateToLogs}
        onPanelChange={handlePanelChange}
        dateCellRender={handleDateCellRender}
      />
    </div>
  );
};

export default MyCalendar;

// import React, { useState } from 'react';
// import { Calendar } from 'antd';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../../components/navbar/Navbar';
// import './history.scss';

// const MyCalendar = () => {
//   const navigate = useNavigate();
//   const [selectedDate, setSelectedDate] = useState(null);

//   const handleSelect = (date) => {
//     setSelectedDate(date);
//   };

//   const handleDateCellRender = (value) => {
//     const isCellSelected = selectedDate && value.isSame(selectedDate, 'day');
//     return (
//       <div
//         className={isCellSelected ? 'selected-cell' : ''}
//         onClick={() => handleSelect(value)}
//       >
//         <div className="date-number">&nbsp;</div>
        
//       </div>
//     );
//   };

//   const handlePanelChange = (date, mode) => {
//     if (mode === 'month') {
//       navigate(`/report2/${date.format('YYYY-MM')}`);
//     } else {
//       setSelectedDate(null);
//     }
//   };

//   const handleNavigateToLogs = () => {
//     if (selectedDate) {
//       const formattedDate = selectedDate.format('YYYY-MM-DD');
//       navigate(`/Report/${formattedDate}`);
//     }
//   };

//   const handleNavigateToMonthView = (date) => {
//     navigate(`/Report2/${date.format('YYYY-MM')}`);
//   };

//   return (
//     <div>
//       <Navbar />
//       <Calendar
//         onSelect={handleNavigateToLogs}
//         onPanelChange={handlePanelChange}
//         dateCellRender={handleDateCellRender}
//         monthCellRender={(value) => (
//           <div
//             className="month-cell"
//             onClick={() => handleNavigateToMonthView(value)}
//           >
//             {value.format('MMM')}
//           </div>
//         )}
//       />
//     </div>
//   );
// };

// export default MyCalendar;

// import React, { useState } from 'react';
// import { Calendar } from 'antd';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../../components/navbar/Navbar';
// import './history.scss';

// const MyCalendar = () => {
//   const navigate = useNavigate();
//   const [selectedDate, setSelectedDate] = useState(null);

//   const handleSelect = (date) => {
//     setSelectedDate(date);
//   };

//   const handleDateCellRender = (value) => {
//     const isCellSelected = selectedDate && value.isSame(selectedDate, 'day');
//     return (
//       <div
//         className={isCellSelected ? 'selected-cell' : ''}
//         onClick={() => handleSelect(value)}
//       >
//         <div className="date-number">&nbsp;</div>
        
//       </div>
//     );
//   };

//   const handlePanelChange = (date, mode) => {
//     if (mode === 'month') {
//       navigate(`/report2/${date.format('YYYY-MM')}`);
//     } else {
//       setSelectedDate(null);
//     }
//   };

//   const handleNavigateToLogs = () => {
//     if (selectedDate) {
//       const formattedDate = selectedDate.format('YYYY-MM-DD');
//       navigate(`/Report/${formattedDate}`);
//     }
//   };

//   const handleNavigateToMonthView = (date) => {
//     navigate(`/Report2`);
//   };

//   return (
//     <div>
//       <Navbar />
//       <Calendar
//         onSelect={handleNavigateToLogs}
//         onPanelChange={handlePanelChange}
//         dateCellRender={handleDateCellRender}
//         monthCellRender={(value) => (
//           <div
//             className="month-cell"
//             onClick={() => handleNavigateToMonthView(value)}
//           >
//             {value.format('MMM')}
//           </div>
//         )}
//       />
//     </div>
//   );
// };

// export default MyCalendar;









