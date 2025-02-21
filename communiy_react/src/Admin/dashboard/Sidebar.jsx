// src/components/Sidebar.jsx
import { Nav } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import './dashboard.css';
const Sidebar = () => {
  return (
    <div className="bg-light sidebar p-3 vh-100">
      <Link className="navbar-brand navbar-logo m-4" to="/">
        모락모樂
      </Link>
      <Nav className="flex-column">
        <br></br>
        <Nav.Link as={NavLink} to="/admin/dashboard" className="active">
          대시보드
        </Nav.Link>
        <Nav.Link as={NavLink} to="/admin/users">
          회원관리
        </Nav.Link>
        <Nav.Link as={NavLink} to="/admin/community">
          모임관리
        </Nav.Link>
        <Nav.Link as={NavLink} to="/admin/complaint">
          신고관리
        </Nav.Link>
        <Nav.Link as={NavLink} to="/admin/board">
          게시판관리
        </Nav.Link>
        <Nav.Link as={NavLink} to="/admin/stats">
          통계관리
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
