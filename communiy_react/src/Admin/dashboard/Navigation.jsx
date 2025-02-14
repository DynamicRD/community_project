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
// ✅ children을 선택적(`isRequired` 제거)
Navigation.propTypes = {
  children: PropTypes.node,
};

export default Navigation;
