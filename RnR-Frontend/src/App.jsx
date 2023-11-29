import React from "react";
import "./styles/landing.css";
import Landing from "./components/landing";
import {Routes,Route} from "react-router-dom";
import LoginPage from "./components/login";
import SignUp from "./components/signup";
import UnderConstruction from "./components/construction";
import SignUpDriver from "./components/signup_driver";
import SignUpPassenger from "./components/signup_passenger";
import Profile from "./components/profile";
import LogoutButton from "./components/logoutButton";
import FindRide from "./components/FindRide";
import LoginDriver from "./components/login_driver";
import LoginPassenger from "./components/login_passenger";
import Profile_Driver from "./components/profile_driver";
import Profile_Passenger from "./components/profile_passenger";
import Dash_Driver from "./components/dash_driver";
import Dash_Passenger from "./components/dash_passenger";
import Header2 from "./components/header2";
import Ride_Find from "./components/Ride_Find";
import Commute_Driver from "./components/commute_driver";
import Commute_Passenger from "./components/commute_passenger";
import Search_Driver from "./components/Search_Driver";
import Search_Passenger from "./components/Search_Passenger";
import ChatWindow from "./components/chatWindow";
import ChatWindowDriver from "./components/chatWindowDriver";
import Marzun from "./components/marzun"
import Notification from "./components/Notification";
import FAQ from "./components/faq"
import AdminDashboard from "./components/admin";
import AdminPass from "./components/adminPassList";
import AdminDvr from "./components/adminDvrList";
import AdminLogin from "./components/adminLogin";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const App = () => {
  return (
    <div className="landing-page">
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="login" element={<LoginPage/>}/>
        <Route path="signup" element={<SignUp/>}/>
        <Route path="construction" element={<UnderConstruction/>}/>
        <Route path="signup_driver" element={<SignUpDriver/>}/>
        <Route path="signup_passenger" element={<SignUpPassenger/>}/>
        <Route path="profile" element={<Profile/>}/>
        <Route path="logout" element={<LogoutButton/>}/>
        <Route path="findride" element={<FindRide/>}/>
        <Route path="login_driver" element={<LoginDriver/>}/>
        <Route path="login_passenger" element={<LoginPassenger/>}/>
        <Route path="profile_driver" element={<Profile_Driver/>}/>
        <Route path="profile_passenger" element={<Profile_Passenger/>}/>
        <Route path="dash_passenger" element={<Dash_Passenger/>}/>
        <Route path="ride_find" element={<Ride_Find/>}/>
        <Route path="dash_driver" element={<Dash_Driver/>}/>
        <Route path="header2" element={<Header2/>}/>
        <Route path="commute_driver" element={<Commute_Driver/>}/>
        <Route path="commute_passenger" element={<Commute_Passenger/>}/>
        <Route path="search_driver" element={<Search_Driver/>}/>
        <Route path="search_passenger" element={<Search_Passenger/>}/>
        <Route path="chatWindow" element={<ChatWindow/>}/>
        <Route path="chatWindowDriver" element={<ChatWindowDriver/>}/>
        <Route path="faq" element={<FAQ/>}/>
        <Route path="notification" element={<Notification/>}/>
        <Route path="admin" element={<AdminDashboard/>}/>
        <Route path="adminPass" element={<AdminPass/>}/>
        <Route path="adminDvr" element={<AdminDvr/>}/>
        <Route path="adminLogin" element={<AdminLogin/>}/>
        
      </Routes>
      <ToastContainer/>
    </div>
  );
};

export default App;