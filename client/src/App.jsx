import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginRegister from './pages/LoginRegister';
import NextLogin from './pages/NextLogin';
import Home from './pages/Home';
import Layout from './pages/Layout';
import CreateCampaign from './pages/CreateCampaign';
import DetailedCard from './pages/DetailedCard';
import MyCampaigns from './pages/MyCampaigns';
import UpdateProfile from './pages/UpdateProfile';
import Analytics from './pages/Analytics';
import ProtectedRoute from '../src/Components/ProtectedRoute';
import Payment from './pages/Payment';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route path="/next" element={<NextLogin />} />
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<ProtectedRoute>
            <Home />
          </ProtectedRoute>} />
          <Route path="create_campaign" element={
        <ProtectedRoute>
        <CreateCampaign/>
        </ProtectedRoute>} />
          <Route path="/getCampaign/:id" element={<ProtectedRoute><DetailedCard /></ProtectedRoute>} />  
          <Route path="/myCampaigns/:id" element={<ProtectedRoute><MyCampaigns/></ProtectedRoute>} /> 
          <Route path='/profile' element={<ProtectedRoute><UpdateProfile/></ProtectedRoute>}/>
          <Route path='/analytics' element={<ProtectedRoute><Analytics/></ProtectedRoute>}/>
          <Route path='/payments' element={<ProtectedRoute><Payment/></ProtectedRoute>}/>
        </Route>
        
      </Routes>
    </Router>
  );
};

export default App;
