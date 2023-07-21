

// import React, { useState, useEffect } from "react";
// import Sidebar from "../../components/sidebar/Sidebar";
// import Navbar from "../../components/navbar/Navbar";
// import "./logs.scss";
// import { Link } from "react-router-dom";
// import { db } from "../../firebase.js";
// import { doc, collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
// import firebase from 'firebase/compat/app';

// const Logs = () => {
//   const [binData, setBinData] = useState([]);
//   const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const firstDay = new Date(new Date().getFullYear(), selectedMonth - 1, 1);
//         const lastDay = new Date(new Date().getFullYear(), selectedMonth, 0);
//         lastDay.setHours(23, 59, 59);
    
//         const startTimestamp = Timestamp.fromDate(firstDay);
//         const endTimestamp = Timestamp.fromDate(lastDay);
    
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

//   const totalPages = 200;
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
//       const startIndex = (currentPage - 1) * 20;
//       const endIndex = startIndex + 20;
//       const rows = renderTableRows().slice(startIndex, endIndex);
//       return rows;
//     } else {
//       return [];
//     }
//   };

//   return (
//     <div className="home">
//       <Sidebar />
//       <div className="homeContainer">
//         <Navbar />
//         <h1>Monthly Logs - {new Date().toLocaleString("en-US", { month: 'long', year: 'numeric' })}</h1>
//         <div className="binOne">
//           <div className="binText">
//             <p>Bin #1</p>
//           </div>

//           <select
//             value={selectedMonth}
//             onChange={(e) => setSelectedMonth(Number(e.target.value))}
//           >
//             <option value={1}>January</option>
//             <option value={2}>February</option>
//             <option value={3}>March</option>
//             <option value={4}>April</option>
//             <option value={5}>May</option>
//             <option value={6}>June</option>
//             <option value={7}>July</option>
//             <option value={8}>August</option>
//             <option value={9}>September</option>
//             <option value={10}>October</option>
//             <option value={11}>November</option>
//             <option value={12}>December</option>
//             {/* Add more options for the rest of the months */}
//           </select>

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
// import "./logs.scss";
// import { Link } from "react-router-dom";
// import { db } from "../../firebase.js";
// import { doc, collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
// import firebase from 'firebase/compat/app';

// const Logs = () => {
//   const [binData, setBinData] = useState([]);
//   const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const firstDay = new Date(new Date().getFullYear(), selectedMonth - 1, 1);
//         const lastDay = new Date(new Date().getFullYear(), selectedMonth, 0);
//         lastDay.setHours(23, 59, 59);
    
//         const startTimestamp = Timestamp.fromDate(firstDay);
//         const endTimestamp = Timestamp.fromDate(lastDay);
    
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

//           const itemsPerPage = 20;
//           const totalItems = data.length;
//           const pages = Math.ceil(totalItems / itemsPerPage);
//           setTotalPages(pages);
//         } else {
//           console.log("No documents found!");
//           setBinData([]);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };
    
//     fetchData();
//   }, [selectedMonth]);

//   const renderTableRows = () => {
//     if (Array.isArray(binData)) {
//       if (binData.length === 0) {
//         return (
//           <tr>
//             <td colSpan="3">No documents found.</td>
//           </tr>
//         );
//       } else {
//         return binData.map((data, index) => (
//           <tr key={index}>
//             <td>{data.time}</td>
//             <td>{data.weight}</td>
//             <td>{data.volume}</td>
//           </tr>
//         ));
//       }
//     } else {
//       return null;
//     }
//   };
  

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
//     if (Array.isArray(binData)) {
//       if (binData.length === 0) {
//         return (
//           <tr>
//             <td colSpan="3">DATA NOT FOUND!</td>
//           </tr>
//         );
//       } else {
//         const startIndex = (currentPage - 1) * 20;
//         const endIndex = startIndex + 20;
//         const rows = renderTableRows().slice(startIndex, endIndex);
//         return rows;
//       }
//     } else {
//       return [];
//     }
//   };
  

//   return (
//     <div className="home">
//       <Sidebar />
//       <div className="homeContainer">
//         <Navbar />
//         <h1>Monthly Logs - {new Date().toLocaleString("en-US", { month: 'long', year: 'numeric' })}</h1>
//         <div className="binOne">
//           <div className="binText">
//             <p>Bin #1</p>
//           </div>

//           <select
//             value={selectedMonth}
//             onChange={(e) => setSelectedMonth(Number(e.target.value))}
//           >
//             <option value={1}>January</option>
//             <option value={2}>February</option>
//             <option value={3}>March</option>
//             <option value={4}>April</option>
//             <option value={5}>May</option>
//             <option value={6}>June</option>
//             <option value={7}>July</option>
//             <option value={8}>August</option>
//             <option value={9}>September</option>
//             <option value={10}>October</option>
//             <option value={11}>November</option>
//             <option value={12}>December</option>
//             {/* Add more options for the rest of the months */}
//           </select>

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
import "./logs.scss";
import { Link } from "react-router-dom";
import { db } from "../../firebase.js";
import { doc, collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import firebase from 'firebase/compat/app';

const Logs = () => {
  const [bin1Data, setBin1Data] = useState([]);
  const [bin2Data, setBin2Data] = useState([]);
  const [bin3Data, setBin3Data] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedMonthBin2, setSelectedMonthBin2] = useState(new Date().getMonth() + 1);
  const [selectedMonthBin3, setSelectedMonthBin3] = useState(new Date().getMonth() + 1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPagesBin2, setTotalPagesBin2] = useState(1);
  const [totalPagesBin3, setTotalPagesBin3] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageBin2, setCurrentPageBin2] = useState(1);
  const [currentPageBin3, setCurrentPageBin3] = useState(1);

  useEffect(() => {
    const fetchData = async (bin, month, setBinData, setTotalPages) => {
      try {
        const firstDay = new Date(new Date().getFullYear(), month - 1, 1);
        const lastDay = new Date(new Date().getFullYear(), month, 0);
        lastDay.setHours(23, 59, 59);
    
        const startTimestamp = Timestamp.fromDate(firstDay);
        const endTimestamp = Timestamp.fromDate(lastDay);
    
        const q = query(
          collection(db, "logs"),
          where("bin", "==", bin),
          where("date_added", ">=", startTimestamp),
          where("date_added", "<=", endTimestamp)
        );
    
        const querySnapshot = await getDocs(q);
    
        if (!querySnapshot.empty) {
          const data = querySnapshot.docs.map((doc) => {
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
          setBinData(data);

          const itemsPerPage = 20;
          const totalItems = data.length;
          const pages = Math.ceil(totalItems / itemsPerPage);
          setTotalPages(pages);
        } else {
          console.log(`No documents found for Bin #${bin}!`);
          setBinData([]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchData("1", selectedMonth, setBin1Data, setTotalPages);
    fetchData("2", selectedMonthBin2, setBin2Data, setTotalPagesBin2);
    fetchData("3", selectedMonthBin3, setBin3Data, setTotalPagesBin3);
  }, [selectedMonth, selectedMonthBin2, selectedMonthBin3]);

  const renderTableRows = (binData) => {
    if (Array.isArray(binData)) {
      if (binData.length === 0) {
        return (
          <tr>
            <td colSpan="3">No documents found.</td>
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
    if (bin === "1") {
      setCurrentPage(page);
    } else if (bin === "2") {
      setCurrentPageBin2(page);
    } else if (bin === "3") {
      setCurrentPageBin3(page);
    }
  };

  const renderPagination = (bin) => {
    const pagination = [];
    const prevButton = (
      <button
        key="prev"
        className="page"
        onClick={() => handlePageChange(bin, currentPage - 1)}
        disabled={currentPage === 1 && bin === "1"}
      >
        Prev
      </button>
    );
    const nextButton = (
      <button
        key="next"
        className="page"
        onClick={() => handlePageChange(bin, currentPage + 1)}
        disabled={
          (bin === "1" && currentPage === totalPages) ||
          (bin === "2" && currentPageBin2 === totalPagesBin2) ||
          (bin === "3" && currentPageBin3 === totalPagesBin3)
        }
      >
        Next
      </button>
    );
  
    pagination.push(prevButton);
  
    if (bin === "1") {
      const totalPagesToShow = totalPages <= 7 ? totalPages : 7;
      const currentPageToShow = currentPage > totalPagesToShow ? totalPagesToShow : currentPage;
  
      for (let page = 1; page <= totalPagesToShow; page++) {
        pagination.push(
          <button
            key={page}
            className={`page ${currentPageToShow === page ? "active" : ""}`}
            onClick={() => handlePageChange(bin, page)}
          >
            {currentPageToShow === page ? (
              <strong className="highlighted-page">{page}</strong>
            ) : (
              page
            )}
          </button>
        );
      }
    } else if (bin === "2") {
      const totalPagesToShow = totalPagesBin2 <= 7 ? totalPagesBin2 : 7;
      const currentPageToShow = currentPageBin2 > totalPagesToShow ? totalPagesToShow : currentPageBin2;
  
      for (let page = 1; page <= totalPagesToShow; page++) {
        pagination.push(
          <button
            key={page}
            className={`page ${currentPageToShow === page ? "active" : ""}`}
            onClick={() => handlePageChange(bin, page)}
          >
            {currentPageToShow === page ? (
              <strong className="highlighted-page">{page}</strong>
            ) : (
              page
            )}
          </button>
        );
      }
    } else if (bin === "3") {
      const totalPagesToShow = totalPagesBin3 <= 7 ? totalPagesBin3 : 7;
      const currentPageToShow = currentPageBin3 > totalPagesToShow ? totalPagesToShow : currentPageBin3;
  
      for (let page = 1; page <= totalPagesToShow; page++) {
        pagination.push(
          <button
            key={page}
            className={`page ${currentPageToShow === page ? "active" : ""}`}
            onClick={() => handlePageChange(bin, page)}
          >
            {currentPageToShow === page ? (
              <strong className="highlighted-page">{page}</strong>
            ) : (
              page
            )}
          </button>
        );
      }
    }
  
    pagination.push(nextButton);
  
    return pagination;
  };

  const getPageData = (binData, bin) => {
    if (Array.isArray(binData)) {
      if (binData.length === 0) {
        return (
          <tr>
            <td colSpan="3">DATA NOT FOUND!</td>
          </tr>
        );
      } else {
        let startIndex;
        let endIndex;
  
        if (bin === "1") {
          startIndex = (currentPage - 1) * 20;
          endIndex = startIndex + 20;
        } else if (bin === "2") {
          startIndex = (currentPageBin2 - 1) * 20;
          endIndex = startIndex + 20;
        } else if (bin === "3") {
          startIndex = (currentPageBin3 - 1) * 20;
          endIndex = startIndex + 20;
        }
  
        const rows = renderTableRows(binData).slice(startIndex, endIndex);
        return rows;
      }
    } else {
      return [];
    }
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <h1>Monthly Logs - {new Date().toLocaleString("en-US", { month: 'long', year: 'numeric' })}</h1>
        <div className="binOne">
          <div className="binText">
            <p>Bin #1</p>
          </div>

          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
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

          <table style={{ width: "100%", fontSize: "25px" }}>
            <thead>
              <tr>
                <th>Time</th>
                <th>Weight</th>
                <th>Volume</th>
              </tr>
            </thead>
            <tbody>{getPageData(bin1Data, "1")}</tbody>
          </table>

          <div className="pagination">{renderPagination("1")}</div>
        </div>

        <div className="binTwo">
          <div className="binText">
            <p>Bin #2</p>
          </div>

          <select
            value={selectedMonthBin2}
            onChange={(e) => setSelectedMonthBin2(Number(e.target.value))}
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

          <table style={{ width: "100%", fontSize: "25px" }}>
            <thead>
              <tr>
                <th>Time</th>
                <th>Weight</th>
                <th>Volume</th>
              </tr>
            </thead>
            <tbody>{getPageData(bin2Data, "2")}</tbody>
          </table>

          <div className="pagination">{renderPagination("2")}</div>
        </div>

        <div className="binThree">
          <div className="binText">
            <p>Bin #3</p>
          </div>

          <select
            value={selectedMonthBin3}
            onChange={(e) => setSelectedMonthBin3(Number(e.target.value))}
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

          <table style={{ width: "100%", fontSize: "25px" }}>
            <thead>
              <tr>
                <th>Time</th>
                <th>Weight</th>
                <th>Volume</th>
              </tr>
            </thead>
            <tbody>{getPageData(bin3Data, "3")}</tbody>
          </table>

          <div className="pagination">{renderPagination("3")}</div>
        </div>
      </div>
    </div>
  );
};

export default Logs;

// import React, { useState, useEffect } from "react";
// import Sidebar from "../../components/sidebar/Sidebar";
// import Navbar from "../../components/navbar/Navbar";
// import "./logs.scss";
// import { db } from "../../firebase.js";
// import { doc, collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
// import firebase from 'firebase/compat/app';

// const Logs = () => {
//   const [bin1Data, setBin1Data] = useState([]);
//   const [bin2Data, setBin2Data] = useState([]);
//   const [bin3Data, setBin3Data] = useState([]);
//   const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
//   const [selectedMonthBin2, setSelectedMonthBin2] = useState(new Date().getMonth() + 1);
//   const [selectedMonthBin3, setSelectedMonthBin3] = useState(new Date().getMonth() + 1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalPagesBin2, setTotalPagesBin2] = useState(1);
//   const [totalPagesBin3, setTotalPagesBin3] = useState(1);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [currentPageBin2, setCurrentPageBin2] = useState(1);
//   const [currentPageBin3, setCurrentPageBin3] = useState(1);

//   useEffect(() => {
//     const fetchData = async (bin, month, setBinData, setTotalPages) => {
//       try {
//         const firstDay = new Date(new Date().getFullYear(), month - 1, 1);
//         const lastDay = new Date(new Date().getFullYear(), month, 0);
//         lastDay.setHours(23, 59, 59);

//         const startTimestamp = Timestamp.fromDate(firstDay);
//         const endTimestamp = Timestamp.fromDate(lastDay);

//         const q = query(
//           collection(db, "logs"),
//           where("bin", "==", bin),
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

//           const itemsPerPage = 20;
//           const totalItems = data.length;
//           const pages = Math.ceil(totalItems / itemsPerPage);
//           setTotalPages(pages);
//         } else {
//           console.log(`No documents found for Bin #${bin}!`);
//           setBinData([]);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData("1", selectedMonth, setBin1Data, setTotalPages);
//     fetchData("2", selectedMonthBin2, setBin2Data, setTotalPagesBin2);
//     fetchData("3", selectedMonthBin3, setBin3Data, setTotalPagesBin3);
//   }, [selectedMonth, selectedMonthBin2, selectedMonthBin3]);

//   const renderTableRows = (binData) => {
//     if (Array.isArray(binData)) {
//       if (binData.length === 0) {
//         return (
//           <tr>
//             <td colSpan="3">No documents found.</td>
//           </tr>
//         );
//       } else {
//         return binData.map((data, index) => (
//           <tr key={index}>
//             <td>{data.time}</td>
//             <td>{data.weight}</td>
//             <td>{data.volume}</td>
//           </tr>
//         ));
//       }
//     } else {
//       return null;
//     }
//   };

//   const handlePageChange = (bin, page) => {
//     if (bin === "1") {
//       setCurrentPage(page);
//     } else if (bin === "2") {
//       setCurrentPageBin2(page);
//     } else if (bin === "3") {
//       setCurrentPageBin3(page);
//     }
//   };

//   const renderPagination = (bin) => {
//     const pagination = [];
//     const prevButton = (
//       <button
//         key="prev"
//         className="page"
//         onClick={() => handlePageChange(bin, currentPage - 1)}
//         disabled={currentPage === 1 && bin === "1"}
//       >
//         Prev
//       </button>
//     );
//     const nextButton = (
//       <button
//         key="next"
//         className="page"
//         onClick={() => handlePageChange(bin, currentPage + 1)}
//         disabled={
//           (bin === "1" && currentPage === totalPages) ||
//           (bin === "2" && currentPageBin2 === totalPagesBin2) ||
//           (bin === "3" && currentPageBin3 === totalPagesBin3)
//         }
//       >
//         Next
//       </button>
//     );

//     pagination.push(prevButton);

//     let totalPagesToShow;
//     let currentPageToShow;

//     if (bin === "1") {
//       totalPagesToShow = totalPages <= 7 ? totalPages : 7;
//       currentPageToShow = currentPage > totalPagesToShow ? totalPagesToShow : currentPage;
//     } else if (bin === "2") {
//       totalPagesToShow = totalPagesBin2 <= 7 ? totalPagesBin2 : 7;
//       currentPageToShow = currentPageBin2 > totalPagesToShow ? totalPagesToShow : currentPageBin2;
//     } else if (bin === "3") {
//       totalPagesToShow = totalPagesBin3 <= 7 ? totalPagesBin3 : 7;
//       currentPageToShow = currentPageBin3 > totalPagesToShow ? totalPagesToShow : currentPageBin3;
//     }

//     for (let page = 1; page <= totalPagesToShow; page++) {
//       pagination.push(
//         <button
//           key={page}
//           className={`page ${currentPageToShow === page ? "active" : ""}`}
//           onClick={() => handlePageChange(bin, page)}
//         >
//           {currentPageToShow === page ? (
//             <strong className="highlighted-page">{page}</strong>
//           ) : (
//             page
//           )}
//         </button>
//       );
//     }

//     pagination.push(nextButton);

//     return pagination;
//   };

//   const getPageData = (binData, bin) => {
//     if (Array.isArray(binData)) {
//       if (binData.length === 0) {
//         return (
//           <tr>
//             <td colSpan="3">DATA NOT FOUND!</td>
//           </tr>
//         );
//       } else {
//         let startIndex;
//         let endIndex;

//         if (bin === "1") {
//           startIndex = (currentPage - 1) * 20;
//           endIndex = startIndex + 20;
//         } else if (bin === "2") {
//           startIndex = (currentPageBin2 - 1) * 20;
//           endIndex = startIndex + 20;
//         } else if (bin === "3") {
//           startIndex = (currentPageBin3 - 1) * 20;
//           endIndex = startIndex + 20;
//         }

//         const rows = renderTableRows(binData).slice(startIndex, endIndex);
//         return rows;
//       }
//     } else {
//       return [];
//     }
//   };

//   return (
//     <div className="home">
//       <Sidebar />
//       <div className="homeContainer">
//         <Navbar />
//         <h1>Monthly Logs - {new Date().toLocaleString("en-US", { month: 'long', year: 'numeric' })}</h1>
//         <div className="binOne">
//           <div className="binText">
//             <p>Bin #1</p>
//           </div>

//           <select
//             value={selectedMonth}
//             onChange={(e) => setSelectedMonth(Number(e.target.value))}
//           >
//             <option value={1}>January</option>
//             <option value={2}>February</option>
//             <option value={3}>March</option>
//             <option value={4}>April</option>
//             <option value={5}>May</option>
//             <option value={6}>June</option>
//             <option value={7}>July</option>
//             <option value={8}>August</option>
//             <option value={9}>September</option>
//             <option value={10}>October</option>
//             <option value={11}>November</option>
//             <option value={12}>December</option>
//           </select>

//           <table style={{ width: "100%", fontSize: "25px" }}>
//             <thead>
//               <tr>
//                 <th>Time</th>
//                 <th>Weight</th>
//                 <th>Volume</th>
//               </tr>
//             </thead>
//             <tbody>{getPageData(bin1Data, "1")}</tbody>
//           </table>

//           <div className="pagination">{renderPagination("1")}</div>
//         </div>

//         <div className="binTwo">
//           <div className="binText">
//             <p>Bin #2</p>
//           </div>

//           <select
//             value={selectedMonthBin2}
//             onChange={(e) => setSelectedMonthBin2(Number(e.target.value))}
//           >
//             <option value={1}>January</option>
//             <option value={2}>February</option>
//             <option value={3}>March</option>
//             <option value={4}>April</option>
//             <option value={5}>May</option>
//             <option value={6}>June</option>
//             <option value={7}>July</option>
//             <option value={8}>August</option>
//             <option value={9}>September</option>
//             <option value={10}>October</option>
//             <option value={11}>November</option>
//             <option value={12}>December</option>
//           </select>

//           <table style={{ width: "100%", fontSize: "25px" }}>
//             <thead>
//               <tr>
//                 <th>Time</th>
//                 <th>Weight</th>
//                 <th>Volume</th>
//               </tr>
//             </thead>
//             <tbody>{getPageData(bin2Data, "2")}</tbody>
//           </table>

//           <div className="pagination">{renderPagination("2")}</div>
//         </div>

//         <div className="binThree">
//           <div className="binText">
//             <p>Bin #3</p>
//           </div>

//           <select
//             value={selectedMonthBin3}
//             onChange={(e) => setSelectedMonthBin3(Number(e.target.value))}
//           >
//             <option value={1}>January</option>
//             <option value={2}>February</option>
//             <option value={3}>March</option>
//             <option value={4}>April</option>
//             <option value={5}>May</option>
//             <option value={6}>June</option>
//             <option value={7}>July</option>
//             <option value={8}>August</option>
//             <option value={9}>September</option>
//             <option value={10}>October</option>
//             <option value={11}>November</option>
//             <option value={12}>December</option>
//           </select>

//           <table style={{ width: "100%", fontSize: "25px" }}>
//             <thead>
//               <tr>
//                 <th>Time</th>
//                 <th>Weight</th>
//                 <th>Volume</th>
//               </tr>
//             </thead>
//             <tbody>{getPageData(bin3Data, "3")}</tbody>
//           </table>

//           <div className="pagination">{renderPagination("3")}</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Logs;



