import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import React, { useState, useEffect } from 'react';



const PaginationTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items to display per page

  // Simulated data for demonstration
  const dummyData = [
    { date: '2023-06-26', weight: '50 kg', volume: '10 L' },
    { date: '2023-06-25', weight: '45 kg', volume: '8 L' },
    { date: '2023-06-24', weight: '55 kg', volume: '12 L' },
    { date: '2023-06-23', weight: '48 kg', volume: '9 L' },
    { date: '2023-06-22', weight: '52 kg', volume: '11 L' },
    { date: '2023-06-21', weight: '47 kg', volume: '7 L' },
    // Add more data as needed
  ];

  useEffect(() => {
    // Simulating an API call to fetch data
    // In a real scenario, you would replace this with an actual API call
    setData(dummyData);
  }, []);

  // Calculate indexes for displaying the current page's data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h1>Paginated Table</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Weight</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td>{item.weight}</td>
              <td>{item.volume}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div>
        {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map(
          (item, index) => (
            <button key={index} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default PaginationTable;
