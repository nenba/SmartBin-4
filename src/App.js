import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import Logs from "./pages/Logss/Logs";
import Report from "./pages/reporting/Report";
import Report2 from "./pages/reporting2/Report2";
import Report3 from "./pages/reporting3/Report3";
import History from "./pages/history/History";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
            <Route path="home" element={<Home />} />
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              {/* <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              /> */}
            </Route>
            {/* <Route path="products">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route> */}
            <Route path="Logs" element={<Logs />} />
            <Route path="report" element={<Report />} />
            <Route path="report2" element={<Report2 />} />
            <Route path="report3" element={<Report3 />} />
            <Route path="history" element={<History />} />
            <Route path="Report/:date" element={<Report />} /> {/* Add this route */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

