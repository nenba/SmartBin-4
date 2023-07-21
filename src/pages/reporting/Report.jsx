

// import React, { useState, useEffect } from "react";
// import Sidebar from "../../components/sidebar/Sidebar";
// import Navbar from "../../components/navbar/Navbar";
// import "./report.scss";
// import { useParams } from "react-router-dom";
// import { db } from "../../firebase.js";
// import { doc, collection, query, where, getDocs } from 'firebase/firestore';
// import moment from 'moment';

// const Report = () => {
//   const { date } = useParams();
//   const selectedDate = moment(date);
//   const startDate = selectedDate.startOf('day').toDate();
//   const endDate = selectedDate.endOf('day').toDate();
//   const [binData, setBinData] = useState([]);

  




//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const q = query(
//           collection(db, "logs"),
//           where("bin", "==", "1"),
//           where("date_added", ">=", startDate),
//           where("date_added", "<", endDate)
//         );
//         const querySnapshot = await getDocs(q);
//         if (!querySnapshot.empty) {
//           const data = querySnapshot.docs.map((doc) => {
//             const binDocData = doc.data();
//             return {
//               time: new Date(binDocData.date_added.seconds * 1000).toLocaleString("en-US", {
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
//   }, []);

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
//       return null; // or you can return a loading indicator or placeholder
//     }
//   };
  

//   const totalPages = 24;
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
//       return []; // or you can return a loading indicator or placeholder
//     }
//   };
  

//   return (
//     <div className="home">
//       <Sidebar />
//       <div className="homeContainer">
//         <Navbar />
//         <h1>Daily Logs</h1>

//         <div className="binOne">
//           <div className="binText">
//             <p>Bin #1</p>
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

// export default Report;



import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./report.scss";
import { useParams } from "react-router-dom";
import { db } from "../../firebase.js";
import { doc, collection, query, where, getDocs } from 'firebase/firestore';
import moment from 'moment';

const Report = () => {
  const { date } = useParams();
  const selectedDate = moment(date);
  const startDate = selectedDate.startOf('day').toDate();
  const endDate = selectedDate.endOf('day').toDate();
  const [bin1Data, setBin1Data] = useState([]);
  const [bin2Data, setBin2Data] = useState([]);
  const [bin3Data, setBin3Data] = useState([]);
  const [bin1CurrentPage, setBin1CurrentPage] = useState(1);
  const [bin2CurrentPage, setBin2CurrentPage] = useState(1);
  const [bin3CurrentPage, setBin3CurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async (bin) => {
      try {
        const q = query(
          collection(db, "logs"),
          where("bin", "==", bin),
          where("date_added", ">=", startDate),
          where("date_added", "<", endDate)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const data = querySnapshot.docs.map((doc) => {
            const binDocData = doc.data();
            return {
              time: new Date(binDocData.date_added.seconds * 1000).toLocaleString("en-US", {
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
          if (bin === "1") {
            setBin1Data(data);
          } else if (bin === "2") {
            setBin2Data(data);
          } else if (bin === "3") {
            setBin3Data(data);
          }
        } else {
          console.log(`No documents found for Bin #${bin}!`);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData("1");
    fetchData("2");
    fetchData("3");
  }, [startDate, endDate]);

  const renderTableRows = (binData) => {
    if (Array.isArray(binData)) {
      return binData.map((data, index) => (
        <tr key={index}>
          <td>{data.time}</td>
          <td>{data.weight}</td>
          <td>{data.volume}</td>
        </tr>
      ));
    } else {
      return null; // or you can return a loading indicator or placeholder
    }
  };

  const totalPages = 24;

  const handlePageChange = (bin, page) => {
    if (bin === "1") {
      setBin1CurrentPage(page);
    } else if (bin === "2") {
      setBin2CurrentPage(page);
    } else if (bin === "3") {
      setBin3CurrentPage(page);
    }
  };

  const renderPagination = (bin, currentPage) => {
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
    if (binData !== null) {
      const startIndex = (currentPage - 1) * 12;
      const endIndex = startIndex + 12;
      const rows = renderTableRows(binData).slice(startIndex, endIndex);
      return rows;
    } else {
      return []; // or you can return a loading indicator or placeholder
    }
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <h1>Daily Logs</h1>

        <div className="binOne">
          <div className="binText">
            <p>Bin #1</p>
          </div>

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

          <div className="pagination">{renderPagination("1", bin1CurrentPage)}</div>
        </div>

        <div className="binTwo">
          <div className="binText">
            <p>Bin #2</p>
          </div>

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

          <div className="pagination">{renderPagination("2", bin2CurrentPage)}</div>
        </div>

        <div className="binThree">
          <div className="binText">
            <p>Bin #3</p>
          </div>

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

          <div className="pagination">{renderPagination("3", bin3CurrentPage)}</div>
        </div>
      </div>
    </div>
  );
};

export default Report;



