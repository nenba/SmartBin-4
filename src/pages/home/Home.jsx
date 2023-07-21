// import React, { useState, useEffect } from "react";
// import Sidebar from "../../components/sidebar/Sidebar";
// import Navbar from "../../components/navbar/Navbar";
// import "./home.scss";
// import { Link } from "react-router-dom";
// import {db} from 'C:\\Users\\Windows 10\\Desktop\\bin_react_admin\\src\\firebase.js'; // Import Firestore
// import firebase from "firebase/app";
// import "firebase/firestore";


// const Home = () => {
//   const [binData, setBinData] = useState({
//     last_updated: "Loading...",
//     height: "Loading...",
//     weight: "Loading...",
//     volume: "Loading...",
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const binRef = db
//           .collection("database")
//           .doc("tootfyaHcMhppikJcPaC")
//           .collection("currentState")
//           .doc("running");
  
//         const binSnapshot = await binRef.get();
//         const data = binSnapshot.data();
//         setBinData({
//           last_updated: data.last_updated.toDate().toLocaleString(),
//           height: data.height,
//           weight: data.weight,
//           volume: data.volume,
//         });
//       } catch (error) {
//         console.error(error);
//       }
//     };
  
//     fetchData();
//   }, []);
  
//   return (
//     <div className="home">
//       <Sidebar />
//       <div className="homeContainer">
//         <Navbar />
//         <h1>WELCOME!</h1>
//         <Link to="/Report">
//           <div className="binOne">
//             <div className="binText">
//               <p>Bin #1</p>
//             </div>
//             <div className="binImage">
//               <img src={require("./images/bin1-1.jpg")} alt=" " style={{ width: "150px", height: "150px" }} />
//             </div>
//             <button className="binButton" onClick={() => {}}>Weekly/Monthly report</button>
//             <table style={{ width: "100%" }}>
//               <thead>
//                 <tr>
//                   <th>Current Status</th>
//                   <th>Data</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>As of</td>
//                   <td>{binData.last_updated}</td>
//                 </tr>
//                 <tr>
//                   <td>Height</td>
//                   <td>{binData.height}</td>
//                 </tr>
//                 <tr>
//                   <td>Weight</td>
//                   <td>{binData.weight}</td>
//                 </tr>
//                 <tr>
//                   <td>Volume</td>
//                   <td>{binData.volume}</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </Link>
//         <Link to="/Report">
//           <div className="binTwo">
//             <div className="binText">
//               <p>Bin #2</p>
//             </div>
//             <div className="binImage">
//               <img src={require("./images/bin1-1.jpg")} alt=" " style={{ width: "150px", height: "150px", margin: "20px 0" }} />
//             </div>
//             <button className="binButton" onClick={() => {}}>Weekly/Monthly report</button>
//             <table style={{ width: "100%" }}>
//               <thead>
//                 <tr>
//                   <th>Current Status</th>
//                   <th>Data</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>As of</td>
//                   <td>{binData.last_updated}</td>
//                 </tr>
//                 <tr>
//                   <td>Height</td>
//                   <td>{binData.height}</td>
//                 </tr>
//                 <tr>
//                   <td>Weight</td>
//                   <td>{binData.weight}</td>
//                 </tr>
//                 <tr>
//                   <td>Volume</td>
//                   <td>{binData.volume}</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </Link>
//         <Link to="/Report">
//           <div className="binThree">
//             <div className="binText">
//               <p>Bin #3</p>
//             </div>
//             <div className="binImage">
//               <img src={require("./images/bin1-1.jpg")} alt=" " style={{ width: "150px", height: "150px", margin: "20px 0" }} />
//             </div>
//             <button className="binButton" onClick={() => {}}>Weekly/Monthly report</button>
//             <table style={{ width: "100%" }}>
//               <thead>
//                 <tr>
//                   <th>Current Status</th>
//                    <th>Data</th>
//                  </tr>
//                </thead>
//                <tbody>
//                 <tr>
//                   <td>As of</td>
//                   <td>{binData.last_updated}</td>
//                 </tr>
//                 <tr>
//                   <td>Height</td>
//                   <td>{binData.height}</td>
//                 </tr>
//                 <tr>
//                   <td>Weight</td>
//                   <td>{binData.weight}</td>
//                 </tr>
//                 <tr>
//                   <td>Volume</td>
//                   <td>{binData.volume}</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Home;



import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import { Link } from "react-router-dom";
import { db} from "../../firebase.js";
import { doc, getDoc } from 'firebase/firestore';

const Home = () => {
  const [binData, setBinData] = useState({
    last_updated: "Loading...",
    height: "Loading...",
    weight: "Loading...",
    volume: "Loading...",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const binRef = doc(db, "binDatabase", "BIN1", "currentState", "running");
        const docSnap = await getDoc(binRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setBinData({
            last_updated: new Date(data.last_updated.seconds * 1000).toLocaleString("en-US", { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }),
            height: data.height,
            weight: data.weight,
            volume: data.volume,
          });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const [binData2, setBinData2] = useState({
    last_updated: "Loading...",
    height: "Loading...",
    weight: "Loading...",
    volume: "Loading...",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const binRef = doc(db, "binDatabase", "BIN2", "currentState", "running");
        const docSnap = await getDoc(binRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setBinData2({
            last_updated: new Date(data.last_updated.seconds * 1000).toLocaleString("en-US", { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }),
            height: data.height,
            weight: data.weight,
            volume: data.volume,
          });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const [binData3, setBinData3] = useState({
    last_updated: "Loading...",
    height: "Loading...",
    weight: "Loading...",
    volume: "Loading...",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const binRef = doc(db, "binDatabase", "BIN3", "currentState", "running");
        const docSnap = await getDoc(binRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setBinData3({
            last_updated: new Date(data.last_updated.seconds * 1000).toLocaleString("en-US", { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }),
            height: data.height,
            weight: data.weight,
            volume: data.volume,
          });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);



  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <h1>WELCOME!</h1>
        <div className="binOne">
          <div className="binText">
            <p>Bin #1</p>
          </div>
          <div className="binImage">
            <img src={require("./images/bin1-1.jpg")} alt=" " style={{ width: "150px", height: "150px" }} />
          </div>
          <Link to="/Report2">
            <button className="binButton">Logs of Bin#1</button>
          </Link>
          <table style={{ width: "100%", fontSize: "25px" }}>
            <thead>
              <tr>
                <th>Current Status</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>As of</td>
                <td>{binData.last_updated}</td>
              </tr>
              <tr>
                <td>Height</td>
                <td>{binData.height}</td>
              </tr>
              <tr>
                <td>Weight</td>
                <td>{binData.weight}</td>
              </tr>
              <tr>
                <td>Volume</td>
                <td>{binData.volume}</td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <div className="binTwo">
          <div className="binText">
            <p>Bin #2</p>
          </div>
          <div className="binImage">
            <img src={require("./images/bin1-1.jpg")} alt=" " style={{ width: "150px", height: "150px", margin: "20px 0" }} />
          </div>
          <Link to="/Report2">
            <button className="binButton">Logs of Bin#2</button>
          </Link>
          <table style={{ width: "100%", fontSize: "25px" }}>
            <thead>
              <tr>
                <th>Current Status</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>As of</td>
                <td>{binData2.last_updated}</td>
              </tr>
              <tr>
                <td>Height</td>
                <td>{binData2.height}</td>
              </tr>
              <tr>
                <td>Weight</td>
                <td>{binData2.weight}</td>
              </tr>
              <tr>
                <td>Volume</td>
                <td>{binData2.volume}</td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <div className="binThree">
          <div className="binText">
            <p>Bin #3</p>
          </div>
          <div className="binImage">
            <img src={require("./images/bin1-1.jpg")} alt=" " style={{ width: "150px", height: "150px", margin: "20px 0" }} />
          </div>
          <Link to="/Report2">
            <button className="binButton">Logs of Bin#3</button>
          </Link>
          <table style={{ width: "100%", fontSize: "25px" }}>
            <thead>
              <tr>
                <th>Current Status</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>As of</td>
                <td>{binData3.last_updated}</td>
              </tr>
              <tr>
                <td>Height</td>
                <td>{binData3.height}</td>
              </tr>
              <tr>
                <td>Weight</td>
                <td>{binData3.weight}</td>
              </tr>
              <tr>
                <td>Volume</td>
                <td>{binData3.volume}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  
};

export default Home;