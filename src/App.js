// import { useState } from "react";
// import { Routes, Route, useLocation } from "react-router-dom";
// import Topbar from "./scenes/global/Topbar";
// import Sidebar from "./scenes/global/Sidebar";
// import Dashboard from "./scenes/dashboard";
// import Team from "./scenes/tables/team";
// import Invoices from "./scenes/invoices";
// import Contacts from "./scenes/contacts";
// import BarChart from "./components/BarChart";
// import CreateUser from "./scenes/form/CreateUser";
// import CreateProject from "./scenes/form/CreateProject";
// import EmployeeInfo from "./scenes/form/EmployeeInfo";
// import SubmitTimeoff from "./scenes/form/submittimeoff";
// import CreateInvoice from "./scenes/form/CreateInvoice";
// import Feedback from "./scenes/form/AddFeedback";
// import Doc from "./scenes/form/UploadDocument";
// import Line from "./scenes/line";
// import Pie from "./scenes/pie";
// import PieChart from "./components/PieChart";
// import FAQ from "./scenes/faq";
// import Login from "./scenes/Login/login";
// import Geography from "./scenes/geography";
// import SubmitFeedbacks from "./scenes/tables/SubmitFeebacks";
// import AllDoc from "./scenes/tables/AllDocuments";
// import Salary from "./scenes/tables/EarningAndDeductions";
// import ManageException from "./scenes/tables/ManageExceptions";
// import MainComponent from "./scenes/tables/Main";
// import Clock from "./scenes/tables/Clock";
// import View from "./scenes/tables/ViewInvoice";
// import ViewOne from "./scenes/tables/viewoneinvoice";
// import { CssBaseline, ThemeProvider } from "@mui/material";
// import { ColorModeContext, useMode } from "./theme";
// import Calendar from "./scenes/calendar/calendar";
// import Account from "./scenes/contacts/account";
// import AssignTasks from "./scenes/form/AssignTasks";
// import ProjectTaskPage from "./scenes/form/ProjectTaskPage";
// import TaskStatus from "./scenes/tables/TaskStatus";
// import MyTasks from "./scenes/tables/MyTasks";
// import TimeoffApp from "./scenes/tables/TimeOffApp";
// import Test from "./components/Test";
// import LineChartParent from "./components/LineChartParent";
// import LineChart from "./components/LineChart";
// import ProtectedRoute from "./components/ProtectedRoute";
// function App() {
//   const [theme, colorMode] = useMode();
//   const [isSidebar, setIsSidebar] = useState(true);
//   const location = useLocation();

//   const isLoginPage = location.pathname === "/";

//   return (
//     <ColorModeContext.Provider value={colorMode}>
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         <div className="app">
//           {!isLoginPage && <Sidebar isSidebar={isSidebar} />}
//           <main className="content">
//             {!isLoginPage && <Topbar setIsSidebar={setIsSidebar} />}
//             <Routes>
//               <Route path="/" element={<Login />} />
//               <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />
//               <Route path="/team" element={<ProtectedRoute element={Team} />} />
//               <Route path="/contacts" element={<ProtectedRoute element={Contacts} />} />
//               <Route path="/invoices" element={<ProtectedRoute element={Invoices} />} />
//               <Route path="/createuser" element={<ProtectedRoute element={CreateUser} />} />
//               <Route path="/createproject" element={<ProtectedRoute element={CreateProject} />} />
//               <Route path="/employeeinfo" element={<ProtectedRoute element={EmployeeInfo} />} />
//               <Route path="/createinvoice" element={<ProtectedRoute element={CreateInvoice} />} />
//               <Route path="/uploaddocument" element={<ProtectedRoute element={Doc} />} />
//               <Route path="/feedback" element={<ProtectedRoute element={Feedback} />} />
//               <Route path="/timeoffreq" element={<ProtectedRoute element={SubmitTimeoff} />} />
//               <Route path="/submitfeedbacks" element={<ProtectedRoute element={SubmitFeedbacks} />} />
//               <Route path="/alldocuments" element={<ProtectedRoute element={AllDoc} />} />
//               <Route path="/earninganddeductions" element={<ProtectedRoute element={Salary} />} />
//               <Route path="/holidays" element={<ProtectedRoute element={ManageException} />} />
//               <Route path="/clock" element={<ProtectedRoute element={Clock} />} />
//               <Route path="/view" element={<ProtectedRoute element={View} />} />
//               <Route path="/viewInvoice/:id" element={<ProtectedRoute element={ViewOne} />} />
//               <Route path="/assigntasks" element={<ProtectedRoute element={AssignTasks} />} />
//               <Route path="/taskstatus" element={<ProtectedRoute element={TaskStatus} />} />
//               <Route path="/mytasks" element={<ProtectedRoute element={MyTasks} />} />
//               <Route path="project/:projectName" element={<ProtectedRoute element={ProjectTaskPage} />} />
//               <Route path="/account" element={<ProtectedRoute element={Account} />} />
//               <Route path="/main" element={<ProtectedRoute element={MainComponent} />} />
//               <Route path="/timeoffapp" element={<ProtectedRoute element={TimeoffApp} />} />
//               <Route path="/barchart" element={<ProtectedRoute element={BarChart} />} />
//               <Route path="/pie" element={<ProtectedRoute element={Pie} />} />
//               <Route path="/piechart" element={<ProtectedRoute element={PieChart} />} />
//               <Route path="/line" element={<ProtectedRoute element={Line} />} />
//               <Route path="/faq" element={<ProtectedRoute element={FAQ} />} />
//               <Route path="/calendar" element={<ProtectedRoute element={Calendar} />} />
//               <Route path="/geography" element={<ProtectedRoute element={Geography} />} />
//               <Route path="/check" element={<ProtectedRoute element={Test} />} />
//               <Route path="/line" element={<ProtectedRoute element={LineChart} />} />

//             </Routes>
//           </main>
//         </div>
//       </ThemeProvider>
//     </ColorModeContext.Provider>
//   );
// }

// export default App;
import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/tables/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import BarChart from "./components/BarChart";
import CreateUser from "./scenes/form/CreateUser";
import CreateProject from "./scenes/form/CreateProject";
import EmployeeInfo from "./scenes/form/EmployeeInfo";
import SubmitTimeoff from "./scenes/form/submittimeoff";
import CreateInvoice from "./scenes/form/CreateInvoice";
import Feedback from "./scenes/form/AddFeedback";
import Doc from "./scenes/form/UploadDocument";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import PieChart from "./components/PieChart";
import FAQ from "./scenes/faq";
import Login from "./scenes/Login/login";
import Geography from "./scenes/geography";
import SubmitFeedbacks from "./scenes/tables/SubmitFeebacks";
import AllDoc from "./scenes/tables/AllDocuments";
import Salary from "./scenes/tables/EarningAndDeductions";
import ManageException from "./scenes/tables/ManageExceptions";
import MainComponent from "./scenes/tables/Main";
import Clock from "./scenes/tables/Clock";
import View from "./scenes/tables/ViewInvoice";
import ViewOne from "./scenes/tables/viewoneinvoice";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Account from "./scenes/contacts/account";
import AssignTasks from "./scenes/form/AssignTasks";
import ProjectTaskPage from "./scenes/form/ProjectTaskPage";
import TaskStatus from "./scenes/tables/TaskStatus";
import MyTasks from "./scenes/tables/MyTasks";
import TimeoffApp from "./scenes/tables/TimeOffApp";
import Test from "./components/Test";
import LineChartParent from "./components/LineChartParent";
import LineChart from "./components/LineChart";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loginStatus = localStorage.getItem("login");
    if (loginStatus) {
      setIsLoggedIn(true);
    } else {
      navigate("/");
    }
    setLoading(false);
  }, [navigate]);

  if (loading) {
    return null; // Return nothing while loading
  }

  const isLoginPage = location.pathname === "/";

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {isLoggedIn && !isLoginPage && <Sidebar isSidebar={isSidebar} />}
          <main className="content">
            {isLoggedIn && !isLoginPage && <Topbar setIsSidebar={setIsSidebar} />}
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />
              <Route path="/team" element={<ProtectedRoute element={Team} />} />
              <Route path="/contacts" element={<ProtectedRoute element={Contacts} />} />
              <Route path="/invoices" element={<ProtectedRoute element={Invoices} />} />
              <Route path="/createuser" element={<ProtectedRoute element={CreateUser} />} />
              <Route path="/createproject" element={<ProtectedRoute element={CreateProject} />} />
              <Route path="/employeeinfo" element={<ProtectedRoute element={EmployeeInfo} />} />
              <Route path="/createinvoice" element={<ProtectedRoute element={CreateInvoice} />} />
              <Route path="/uploaddocument" element={<ProtectedRoute element={Doc} />} />
              <Route path="/feedback" element={<ProtectedRoute element={Feedback} />} />
              <Route path="/timeoffreq" element={<ProtectedRoute element={SubmitTimeoff} />} />
              <Route path="/submitfeedbacks" element={<ProtectedRoute element={SubmitFeedbacks} />} />
              <Route path="/alldocuments" element={<ProtectedRoute element={AllDoc} />} />
              <Route path="/earninganddeductions" element={<ProtectedRoute element={Salary} />} />
              <Route path="/holidays" element={<ProtectedRoute element={ManageException} />} />
              <Route path="/clock" element={<ProtectedRoute element={Clock} />} />
              <Route path="/view" element={<ProtectedRoute element={View} />} />
              <Route path="/viewInvoice/:id" element={<ProtectedRoute element={ViewOne} />} />
              <Route path="/assigntasks" element={<ProtectedRoute element={AssignTasks} />} />
              <Route path="/taskstatus" element={<ProtectedRoute element={TaskStatus} />} />
              <Route path="/mytasks" element={<ProtectedRoute element={MyTasks} />} />
              <Route path="/project/:projectName" element={<ProtectedRoute element={ProjectTaskPage} />} />
              <Route path="/account" element={<ProtectedRoute element={Account} />} />
              <Route path="/main" element={<ProtectedRoute element={MainComponent} />} />
              <Route path="/timeoffapp" element={<ProtectedRoute element={TimeoffApp} />} />
              <Route path="/barchart" element={<ProtectedRoute element={BarChart} />} />
              <Route path="/linechart" element={<ProtectedRoute element={LineChart} />} />
              <Route path="/linechartparent" element={<ProtectedRoute element={LineChartParent} />} />
              <Route path="/piechart" element={<ProtectedRoute element={PieChart} />} />
              <Route path="/faq" element={<ProtectedRoute element={FAQ} />} />
              <Route path="/geography" element={<ProtectedRoute element={Geography} />} />
              <Route path="/calendar" element={<ProtectedRoute element={Calendar} />} />
              <Route path="/test" element={<ProtectedRoute element={Test} />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;





