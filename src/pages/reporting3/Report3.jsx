// import React, { useState, useEffect } from "react";
// import Sidebar from "../../components/sidebar/Sidebar";
// import Navbar from "../../components/navbar/Navbar";
// import "./report3.scss";
// import { Link } from "react-router-dom";
// import { db } from "../../firebase.js";
// import { doc, collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
// import firebase from 'firebase/compat/app';

// const Logs = () => {
//   const [binData, setBinData] = useState([]);
//   const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
//   const [selectedWeek, setSelectedWeek] = useState(1);
// const [selectedWeekStart, setSelectedWeekStart] = useState(null);
// const [selectedWeekEnd, setSelectedWeekEnd] = useState(null);


//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const firstDayOfMonth = new Date(new Date().getFullYear(), selectedMonth - 1, 1);
//         const lastDayOfMonth = new Date(new Date().getFullYear(), selectedMonth, 0);
//         lastDayOfMonth.setHours(23, 59, 59);
    
//         const startOfWeek = new Date(firstDayOfMonth);
//         startOfWeek.setDate((selectedWeek - 1) * 7 + 1);
    
//         const endOfWeek = new Date(firstDayOfMonth);
//         endOfWeek.setDate(selectedWeek * 7);
//         endOfWeek.setHours(23, 59, 59);
    
//         setSelectedWeekStart(startOfWeek);
//         setSelectedWeekEnd(endOfWeek);
    
//         const startTimestamp = Timestamp.fromDate(startOfWeek);
//         const endTimestamp = Timestamp.fromDate(endOfWeek);
    
//         const q = query(
//           collection(db, "logs"),
//           where("bin", "==", "1"),
//           where("date_added", ">=", startTimestamp),
//           where("date_added", "<=", endTimestamp)
//         );
    
//         const querySnapshot = await getDocs(q);
    
//         if (!querySnapshot.empty) {
//           const data = querySnapshot.docs.map((doc) => {
//             const binDocData = doc.data();
//             return {
//               time: new Date(binDocData.date_added.toDate()).toLocaleString("en-US", {
//                 year: 'numeric',
//                 month: 'long',
//                 day: 'numeric',
//                 hour: 'numeric',
//                 minute: 'numeric',
//                 second: 'numeric',
//                 hour12: true
//               }),
//               weight: binDocData.weight,
//               volume: binDocData.volume,
//             };
//           });
//           setBinData(data);
//         } else {
//           console.log("No documents found!");
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };
    

//     fetchData();
//   }, [selectedMonth]);

//   const renderTableRows = () => {
//     if (Array.isArray(binData)) {
//       return binData.map((data, index) => (
//         <tr key={index}>
//           <td>{data.time}</td>
//           <td>{data.weight}</td>
//           <td>{data.volume}</td>
//         </tr>
//       ));
//     } else {
//       return null;
//     }
//   };

//   const totalPages = 44;
//   const [currentPage, setCurrentPage] = useState(1);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const renderPagination = () => {
//     const pagination = [];
//     const prevButton = (
//       <button
//         key="prev"
//         className="page"
//         onClick={() => handlePageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//       >
//         Prev
//       </button>
//     );
//     const nextButton = (
//       <button
//         key="next"
//         className="page"
//         onClick={() => handlePageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//       >
//         Next
//       </button>
//     );
  
//     pagination.push(prevButton);
  
//     if (totalPages <= 7) {
//       for (let page = 1; page <= totalPages; page++) {
//         pagination.push(
//           <button
//             key={page}
//             className={`page ${currentPage === page ? "active" : ""}`}
//             onClick={() => handlePageChange(page)}
//           >
//             {currentPage === page ? (
//               <strong className="highlighted-page">{page}</strong>
//             ) : (
//               page
//             )}
//           </button>
//         );
//       }
//     } else {
//       const maxVisiblePages = 5;
//       let startPage, endPage;
  
//       if (currentPage <= Math.floor(maxVisiblePages / 2)) {
//         startPage = 1;
//         endPage = maxVisiblePages;
//       } else if (currentPage + Math.floor(maxVisiblePages / 2) >= totalPages) {
//         startPage = totalPages - maxVisiblePages + 1;
//         endPage = totalPages;
//       } else {
//         startPage = currentPage - Math.floor(maxVisiblePages / 2);
//         endPage = currentPage + Math.floor(maxVisiblePages / 2);
//       }
  
//       if (startPage > 1) {
//         pagination.push(
//           <button
//             key={1}
//             className="page"
//             onClick={() => handlePageChange(1)}
//           >
//             1
//           </button>
//         );
//         if (startPage > 2) {
//           pagination.push(<span key="dots1">...</span>);
//         }
//       }
  
//       for (let page = startPage; page <= endPage; page++) {
//         pagination.push(
//           <button
//             key={page}
//             className={`page ${currentPage === page ? "active" : ""}`}
//             onClick={() => handlePageChange(page)}
//           >
//             {currentPage === page ? (
//               <strong className="highlighted-page">{page}</strong>
//             ) : (
//               page
//             )}
//           </button>
//         );
//       }
  
//       if (endPage < totalPages) {
//         if (endPage < totalPages - 1) {
//           pagination.push(<span key="dots2">...</span>);
//         }
//         pagination.push(
//           <button
//             key={totalPages}
//             className="page"
//             onClick={() => handlePageChange(totalPages)}
//           >
//             {totalPages}
//           </button>
//         );
//       }
//     }
  
//     pagination.push(nextButton);
  
//     return pagination;
//   };

//   const getPageData = () => {
//     if (binData !== null) {
//       const startIndex = (currentPage - 1) * 12;
//       const endIndex = startIndex + 12;
//       const rows = renderTableRows().slice(startIndex, endIndex);
//       return rows;
//     } else {
//       return [];
//     }
//   };

//   const handleMonthChange = (e) => {
//     setSelectedMonth(Number(e.target.value));
//     setSelectedWeek(1); // Reset selected week to 1
//   };

//   return (
//     <div className="home">
//       <Sidebar />
//       <div className="homeContainer">
//         <Navbar />
//         <h1>Weekly Logs - {new Date().toLocaleString("en-US", { month: 'long', year: 'numeric' })}</h1>
//         <div className="binOne">
//           <div className="binText">
//             <p>Bin #1</p>
//           </div>

//           <div>
//             <select
//               value={selectedMonth}
//               onChange={handleMonthChange}
//             >
//               <option value={1}>January</option>
//               <option value={2}>February</option>
//               <option value={3}>March</option>
//               <option value={4}>April</option>
//             <option value={5}>May</option>
//             <option value={6}>June</option>
//             <option value={7}>July</option>
//             <option value={8}>August</option>
//             <option value={9}>September</option>
//             <option value={10}>October</option>
//             <option value={11}>November</option>
//             <option value={12}>December</option>
//               {/* Add more options for the rest of the months */}
//             </select>

//             <select
//               value={selectedWeek}
//               onChange={(e) => setSelectedWeek(Number(e.target.value))}
//             >
//               <option value={1}>Week 1</option>
//               <option value={2}>Week 2</option>
//               <option value={3}>Week 3</option>
//               {/* Add more options for the rest of the weeks */}
//             </select>
//           </div>

//           <table style={{ width: "100%", fontSize: "25px" }}>
//             <thead>
//               <tr>
//                 <th>Time</th>
//                 <th>Weight</th>
//                 <th>Volume</th>
//               </tr>
//             </thead>
//             <tbody>{getPageData()}</tbody>
//           </table>

//           <div className="pagination">{renderPagination()}</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Logs;

// import React, { useState, useEffect } from "react";
// import Sidebar from "../../components/sidebar/Sidebar";
// import Navbar from "../../components/navbar/Navbar";
// import "./report3.scss";
// import { Link } from "react-router-dom";
// import { db } from "../../firebase.js";
// import { doc, collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
// import firebase from 'firebase/compat/app';

// const Logs = () => {
//   const [binData, setBinData] = useState([]);
//   const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
//   const [selectedWeek, setSelectedWeek] = useState(1);
//   const [selectedWeekStart, setSelectedWeekStart] = useState(null);
//   const [selectedWeekEnd, setSelectedWeekEnd] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const firstDayOfMonth = new Date(new Date().getFullYear(), selectedMonth - 1, 1);
//         const lastDayOfMonth = new Date(new Date().getFullYear(), selectedMonth, 0);
//         lastDayOfMonth.setHours(23, 59, 59);

//         const startOfWeek = new Date(firstDayOfMonth);
//         startOfWeek.setDate((selectedWeek - 1) * 7 + 1);

//         const endOfWeek = new Date(firstDayOfMonth);
//         endOfWeek.setDate(selectedWeek * 7);
//         endOfWeek.setHours(23, 59, 59);

//         setSelectedWeekStart(startOfWeek);
//         setSelectedWeekEnd(endOfWeek);

//         const startTimestamp = Timestamp.fromDate(startOfWeek);
//         const endTimestamp = Timestamp.fromDate(endOfWeek);

//         const q = query(
//           collection(db, "logs"),
//           where("bin", "==", "1"),
//           where("date_added", ">=", startTimestamp),
//           where("date_added", "<=", endTimestamp)
//         );

//         const querySnapshot = await getDocs(q);

//         if (!querySnapshot.empty) {
//           const data = querySnapshot.docs.map((doc) => {
//             const binDocData = doc.data();
//             return {
//               time: new Date(binDocData.date_added.toDate()).toLocaleString("en-US", {
//                 year: 'numeric',
//                 month: 'long',
//                 day: 'numeric',
//                 hour: 'numeric',
//                 minute: 'numeric',
//                 second: 'numeric',
//                 hour12: true
//               }),
//               weight: binDocData.weight,
//               volume: binDocData.volume,
//             };
//           });
//           setBinData(data);
//         } else {
//           console.log("No documents found!");
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, [selectedMonth, selectedWeek]);

//   const renderTableRows = () => {
//     if (Array.isArray(binData)) {
//       return binData.map((data, index) => (
//         <tr key={index}>
//           <td>{data.time}</td>
//           <td>{data.weight}</td>
//           <td>{data.volume}</td>
//         </tr>
//       ));
//     } else {
//       return null;
//     }
//   };

//   const totalPages = 168;
//   const [currentPage, setCurrentPage] = useState(1);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const renderPagination = () => {
//     const pagination = [];
//     const prevButton = (
//       <button
//         key="prev"
//         className="page"
//         onClick={() => handlePageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//       >
//         Prev
//       </button>
//     );
//     const nextButton = (
//       <button
//         key="next"
//         className="page"
//         onClick={() => handlePageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//       >
//         Next
//       </button>
//     );
  
//     pagination.push(prevButton);
  
//     if (totalPages <= 7) {
//       for (let page = 1; page <= totalPages; page++) {
//         pagination.push(
//           <button
//             key={page}
//             className={`page ${currentPage === page ? "active" : ""}`}
//             onClick={() => handlePageChange(page)}
//           >
//             {currentPage === page ? (
//               <strong className="highlighted-page">{page}</strong>
//             ) : (
//               page
//             )}
//           </button>
//         );
//       }
//     } else {
//       const maxVisiblePages = 5;
//       let startPage, endPage;
  
//       if (currentPage <= Math.floor(maxVisiblePages / 2)) {
//         startPage = 1;
//         endPage = maxVisiblePages;
//       } else if (currentPage + Math.floor(maxVisiblePages / 2) >= totalPages) {
//         startPage = totalPages - maxVisiblePages + 1;
//         endPage = totalPages;
//       } else {
//         startPage = currentPage - Math.floor(maxVisiblePages / 2);
//         endPage = currentPage + Math.floor(maxVisiblePages / 2);
//       }
  
//       if (startPage > 1) {
//         pagination.push(
//           <button
//             key={1}
//             className="page"
//             onClick={() => handlePageChange(1)}
//           >
//             1
//           </button>
//         );
//         if (startPage > 2) {
//           pagination.push(<span key="dots1">...</span>);
//         }
//       }
  
//       for (let page = startPage; page <= endPage; page++) {
//         pagination.push(
//           <button
//             key={page}
//             className={`page ${currentPage === page ? "active" : ""}`}
//             onClick={() => handlePageChange(page)}
//           >
//             {currentPage === page ? (
//               <strong className="highlighted-page">{page}</strong>
//             ) : (
//               page
//             )}
//           </button>
//         );
//       }
  
//       if (endPage < totalPages) {
//         if (endPage < totalPages - 1) {
//           pagination.push(<span key="dots2">...</span>);
//         }
//         pagination.push(
//           <button
//             key={totalPages}
//             className="page"
//             onClick={() => handlePageChange(totalPages)}
//           >
//             {totalPages}
//           </button>
//         );
//       }
//     }
  
//     pagination.push(nextButton);
  
//     return pagination;
//   };
//   const getPageData = () => {
//     if (binData !== null) {
//       const startIndex = (currentPage - 1) * 12;
//       const endIndex = startIndex + 12;
//       const rows = renderTableRows().slice(startIndex, endIndex);
//       return rows;
//     } else {
//       return [];
//     }
//   };

//   const handleMonthChange = (e) => {
//     setSelectedMonth(Number(e.target.value));
//     setSelectedWeek(1); // Reset selected week to 1
//   };

//   return (
//     <div className="home">
//       <Sidebar />
//       <div className="homeContainer">
//         <Navbar />
//         <h1>Weekly Logs - {new Date().toLocaleString("en-US", { month: 'long', year: 'numeric' })}</h1>
//         <div className="binOne">
//           <div className="binText">
//             <p>Bin #1</p>
//           </div>

//           <div>
//             <select
//               value={selectedMonth}
//               onChange={handleMonthChange}
//             >
//               <option value={1}>January</option>
//               <option value={2}>February</option>
//               <option value={3}>March</option>
//              <option value={4}>April</option>
//             <option value={5}>May</option>
//            <option value={6}>June</option>
//            <option value={7}>July</option>
//          <option value={8}>August</option>
//            <option value={9}>September</option>
//              <option value={10}>October</option>
//             <option value={11}>November</option>
//              <option value={12}>December</option>
//             </select>

//             <select
//               value={selectedWeek}
//               onChange={(e) => setSelectedWeek(Number(e.target.value))}
//             >
//               <option value={1}>Week 1</option>
//                <option value={2}>Week 2</option>
//                <option value={3}>Week 3</option>
//             </select>
//           </div>

//           <table style={{ width: "100%", fontSize: "25px" }}>
//             <thead>
//               <tr>
//                 <th>Time</th>
//                 <th>Weight</th>
//                 <th>Volume</th>
//               </tr>
//             </thead>
//             <tbody>{getPageData()}</tbody>
//           </table>

//           <div className="pagination">{renderPagination()}</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Logs;


import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./report3.scss";
import { Link } from "react-router-dom";
import { db } from "../../firebase.js";
import { doc, collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import firebase from 'firebase/compat/app';

const Logs = () => {
  const [bin1Data, setBin1Data] = useState([]);
  const [bin2Data, setBin2Data] = useState([]);
  const [bin3Data, setBin3Data] = useState([]);
  const [bin1SelectedMonth, setBin1SelectedMonth] = useState(new Date().getMonth() + 1);
  const [bin2SelectedMonth, setBin2SelectedMonth] = useState(new Date().getMonth() + 1);
  const [bin3SelectedMonth, setBin3SelectedMonth] = useState(new Date().getMonth() + 1);
  const [bin1SelectedWeek, setBin1SelectedWeek] = useState(1);
  const [bin2SelectedWeek, setBin2SelectedWeek] = useState(1);
  const [bin3SelectedWeek, setBin3SelectedWeek] = useState(1);
  const [bin1TotalPages, setBin1TotalPages] = useState(1);
  const [bin2TotalPages, setBin2TotalPages] = useState(1);
  const [bin3TotalPages, setBin3TotalPages] = useState(1);
  const [bin1CurrentPage, setBin1CurrentPage] = useState(1);
  const [bin2CurrentPage, setBin2CurrentPage] = useState(1);
  const [bin3CurrentPage, setBin3CurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async (bin, selectedMonth, selectedWeek, setBinData, setTotalPages) => {
      try {
        const firstDay = new Date(new Date().getFullYear(), selectedMonth - 1, (selectedWeek - 1) * 7 + 1);
        const lastDay = new Date(firstDay);
        lastDay.setDate(lastDay.getDate() + 6);
        lastDay.setHours(23, 59, 59);

        const startTimestamp = Timestamp.fromDate(firstDay);
        const endTimestamp = Timestamp.fromDate(lastDay);

        const binQuery = query(
          collection(db, "logs"),
          where("bin", "==", bin),
          where("date_added", ">=", startTimestamp),
          where("date_added", "<=", endTimestamp)
        );

        const querySnapshot = await getDocs(binQuery);

        if (!querySnapshot.empty) {
          const binData = querySnapshot.docs.map((doc) => {
            const binDocData = doc.data();
            return {
              time: new Date(binDocData.date_added.toDate()).toLocaleString("en-US", {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true
              }),
              weight: binDocData.weight,
              volume: binDocData.volume,
            };
          });
          setBinData(binData);

          const itemsPerPage = 20;
          const totalItems = binData.length;
          const totalPages = Math.ceil(totalItems / itemsPerPage);
          setTotalPages(totalPages);
        } else {
          setBinData([]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData("1", bin1SelectedMonth, bin1SelectedWeek, setBin1Data, setBin1TotalPages);
    fetchData("2", bin2SelectedMonth, bin2SelectedWeek, setBin2Data, setBin2TotalPages);
    fetchData("3", bin3SelectedMonth, bin3SelectedWeek, setBin3Data, setBin3TotalPages);
  }, [bin1SelectedMonth, bin1SelectedWeek, bin2SelectedMonth, bin2SelectedWeek, bin3SelectedMonth, bin3SelectedWeek]);

  const renderTableRows = (binData) => {
    if (Array.isArray(binData)) {
      if (binData.length === 0) {
        return (
          <tr>
            <td colSpan="3">No documents found</td>
          </tr>
        );
      } else {
        return binData.map((data, index) => (
          <tr key={index}>
            <td>{data.time}</td>
            <td>{data.weight}</td>
            <td>{data.volume}</td>
          </tr>
        ));
      }
    } else {
      return null;
    }
  };

  const handlePageChange = (bin, page) => {
    switch (bin) {
      case "bin1":
        setBin1CurrentPage(page);
        break;
      case "bin2":
        setBin2CurrentPage(page);
        break;
      case "bin3":
        setBin3CurrentPage(page);
        break;
      default:
        break;
    }
  };

  const renderPagination = (bin, totalPages, currentPage) => {
    const pagination = [];
    const prevButton = (
      <button
        key="prev"
        className="page"
        onClick={() => handlePageChange(bin, currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
    );
    const nextButton = (
      <button
        key="next"
        className="page"
        onClick={() => handlePageChange(bin, currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    );

    pagination.push(prevButton);

    if (totalPages <= 7) {
      for (let page = 1; page <= totalPages; page++) {
        pagination.push(
          <button
            key={page}
            className={`page ${currentPage === page ? "active" : ""}`}
            onClick={() => handlePageChange(bin, page)}
          >
            {currentPage === page ? (
              <strong className="highlighted-page">{page}</strong>
            ) : (
              page
            )}
          </button>
        );
      }
    } else {
      const maxVisiblePages = 5;
      let startPage, endPage;

      if (currentPage <= Math.floor(maxVisiblePages / 2)) {
        startPage = 1;
        endPage = maxVisiblePages;
      } else if (currentPage + Math.floor(maxVisiblePages / 2) >= totalPages) {
        startPage = totalPages - maxVisiblePages + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - Math.floor(maxVisiblePages / 2);
        endPage = currentPage + Math.floor(maxVisiblePages / 2);
      }

      if (startPage > 1) {
        pagination.push(
          <button
            key={1}
            className="page"
            onClick={() => handlePageChange(bin, 1)}
          >
            1
          </button>
        );
        if (startPage > 2) {
          pagination.push(<span key="dots1">...</span>);
        }
      }

      for (let page = startPage; page <= endPage; page++) {
        pagination.push(
          <button
            key={page}
            className={`page ${currentPage === page ? "active" : ""}`}
            onClick={() => handlePageChange(bin, page)}
          >
            {currentPage === page ? (
              <strong className="highlighted-page">{page}</strong>
            ) : (
              page
            )}
          </button>
        );
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pagination.push(<span key="dots2">...</span>);
        }
        pagination.push(
          <button
            key={totalPages}
            className="page"
            onClick={() => handlePageChange(bin, totalPages)}
          >
            {totalPages}
          </button>
        );
      }
    }

    pagination.push(nextButton);

    return pagination;
  };

  const getPageData = (binData, currentPage) => {
    if (Array.isArray(binData)) {
      if (binData.length === 0) {
        return (
          <tr>
            <td colSpan="3">No data available</td>
          </tr>
        );
      } else {
        const startIndex = (currentPage - 1) * 20;
        const endIndex = startIndex + 20;
        const rows = renderTableRows(binData).slice(startIndex, endIndex);
        return rows;
      }
    } else {
      return null;
    }
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <h1>Weekly Logs - {new Date().toLocaleString("en-US", { month: 'long', year: 'numeric' })}</h1>
        <div className="binOne">
          <div className="binText">
            <p>Bin #1</p>
          </div>

          <select
            value={bin1SelectedMonth}
            onChange={(e) => setBin1SelectedMonth(Number(e.target.value))}
          >
            <option value={1}>January</option>
            <option value={2}>February</option>
            <option value={3}>March</option>
            <option value={4}>April</option>
            <option value={5}>May</option>
            <option value={6}>June</option>
            <option value={7}>July</option>
            <option value={8}>August</option>
            <option value={9}>September</option>
            <option value={10}>October</option>
            <option value={11}>November</option>
            <option value={12}>December</option>
          </select>

          <select
            value={bin1SelectedWeek}
            onChange={(e) => setBin1SelectedWeek(Number(e.target.value))}
          >
            <option value={1}>Week 1</option>
            <option value={2}>Week 2</option>
            <option value={3}>Week 3</option>
          </select>

          <table style={{ width: "100%", fontSize: "25px" }}>
            <thead>
              <tr>
                <th>Time</th>
                <th>Weight</th>
                <th>Volume</th>
              </tr>
            </thead>
            <tbody>{getPageData(bin1Data, bin1CurrentPage)}</tbody>
          </table>

          <div className="pagination">{renderPagination("bin1", bin1TotalPages, bin1CurrentPage)}</div>
        </div>

        <div className="binTwo">
          <div className="binText">
            <p>Bin #2</p>
          </div>

          <select
            value={bin2SelectedMonth}
            onChange={(e) => setBin2SelectedMonth(Number(e.target.value))}
          >
            <option value={1}>January</option>
            <option value={2}>February</option>
            <option value={3}>March</option>
            <option value={4}>April</option>
            <option value={5}>May</option>
            <option value={6}>June</option>
            <option value={7}>July</option>
            <option value={8}>August</option>
            <option value={9}>September</option>
            <option value={10}>October</option>
            <option value={11}>November</option>
            <option value={12}>December</option>
          </select>

          <select
            value={bin2SelectedWeek}
            onChange={(e) => setBin2SelectedWeek(Number(e.target.value))}
          >
            <option value={1}>Week 1</option>
            <option value={2}>Week 2</option>
            <option value={3}>Week 3</option>
          </select>

          <table style={{ width: "100%", fontSize: "25px" }}>
            <thead>
              <tr>
                <th>Time</th>
                <th>Weight</th>
                <th>Volume</th>
              </tr>
            </thead>
            <tbody>{getPageData(bin2Data, bin2CurrentPage)}</tbody>
          </table>

          <div className="pagination">{renderPagination("bin2", bin2TotalPages, bin2CurrentPage)}</div>
        </div>

        <div className="binThree">
          <div className="binText">
            <p>Bin #3</p>
          </div>

          <select
            value={bin3SelectedMonth}
            onChange={(e) => setBin3SelectedMonth(Number(e.target.value))}
          >
            <option value={1}>January</option>
            <option value={2}>February</option>
            <option value={3}>March</option>
            <option value={4}>April</option>
            <option value={5}>May</option>
            <option value={6}>June</option>
            <option value={7}>July</option>
            <option value={8}>August</option>
            <option value={9}>September</option>
            <option value={10}>October</option>
            <option value={11}>November</option>
            <option value={12}>December</option>
          </select>

          <select
            value={bin3SelectedWeek}
            onChange={(e) => setBin3SelectedWeek(Number(e.target.value))}
          >
            <option value={1}>Week 1</option>
            <option value={2}>Week 2</option>
            <option value={3}>Week 3</option>
          </select>

          <table style={{ width: "100%", fontSize: "25px" }}>
            <thead>
              <tr>
                <th>Time</th>
                <th>Weight</th>
                <th>Volume</th>
              </tr>
            </thead>
            <tbody>{getPageData(bin3Data, bin3CurrentPage)}</tbody>
          </table>

          <div className="pagination">{renderPagination("bin3", bin3TotalPages, bin3CurrentPage)}</div>
        </div>
      </div>
    </div>
  );
};

export default Logs;






