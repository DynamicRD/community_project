// src/components/MainContent.jsx
import './dashboard.css';
import PropTypes from 'prop-types'; // ✅ PropTypes 추가
import { Navbar, Form, Dropdown } from 'react-bootstrap';

const Navigation = ({ children }) => {
  return (
    <div className="navigation w-100">
      <Navbar bg="light" expand="lg" className="p-3">
        <Form.Control
          type="text"
          placeholder="Search"
          className="w-25 me-auto"
        />
        <Dropdown>
          <Dropdown.Toggle variant="secondary">Hello, John Doe</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#">Settings</Dropdown.Item>
            <Dropdown.Item href="#">Messages</Dropdown.Item>
            <Dropdown.Item href="#">Sign out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar>
      {children}
    </div>
  );
};

// ✅ PropTypes 정의
Navigation.propTypes = {
  children: PropTypes.node.isRequired, // children이 React 노드여야 하고 필수 항목임을 명시
};

export default Navigation;
