import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/dashboard.jsx';
import UserTable from './components/Users/UserTable.jsx';
import Sidebar from './components/dashboard/Sidebar.jsx';
import Navigation from './components/dashboard/Navigation.jsx';
import Footer from './components/dashboard/Footer.jsx';
import Community from './components/Community/Community.jsx';
import CommunityDetail from './components/Community/CommunityDetail.jsx';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="content-wrapper">
          <Navigation />
          <div className="main-content">
            <Routes>
              <Route path="admin/Dashoboard" element={<Dashboard />} />
              <Route path="admin/users" element={<UserTable />} />
              <Route path="admin/community" element={<Community />} />
              <Route path="admin/community/:id" element={<CommunityDetail />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
