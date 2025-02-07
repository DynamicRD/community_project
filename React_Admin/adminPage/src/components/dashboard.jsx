import { NavLink } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Breadcrumb,
  Button,
  Dropdown,
  Navbar,
  Nav,
  Form,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './dashboard.css';
import TrafficChart from './TrafficChart'; // Chart.js 차트 컴포넌트 추가

const Dashboard = () => {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="bg-light sidebar p-3 vh-100">
        <h4 className="mb-4">Logo</h4>
        <Nav className="flex-column">
          <Nav.Link as={NavLink} to="/" className="active">
            대시보드
          </Nav.Link>
          <Nav.Link as={NavLink} to="/users">
            회원관리
          </Nav.Link>
          <Nav.Link href="#">모임관리</Nav.Link>
          <Nav.Link href="#">게시판관리</Nav.Link>
          <Nav.Link href="#">통계관리</Nav.Link>
        </Nav>
      </div>

      {/* Main Content */}
      <div className="main-content w-100">
        <Navbar bg="light" expand="lg" className="p-3">
          <Form.Control
            type="text"
            placeholder="Search"
            className="w-25 me-auto"
          />
          <Dropdown>
            <Dropdown.Toggle variant="secondary">
              Hello, John Doe
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#">Settings</Dropdown.Item>
              <Dropdown.Item href="#">Messages</Dropdown.Item>
              <Dropdown.Item href="#">Sign out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar>

        <Container fluid className="p-4">
          <Breadcrumb>
            <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>Overview</Breadcrumb.Item>
          </Breadcrumb>
          <h2>Dashboard</h2>
          <p>This is the homepage of a simple admin interface.</p>

          {/* Stat Cards */}
          <Row className="mb-4">
            {[
              {
                title: 'Customers',
                value: '345k',
                info: '18.2% increase',
                color: 'success',
              },
              {
                title: 'Revenue',
                value: '$2.4k',
                info: '4.6% increase',
                color: 'success',
              },
              {
                title: 'Purchases',
                value: '43',
                info: '2.6% decrease',
                color: 'danger',
              },
              {
                title: 'Traffic',
                value: '64k',
                info: '2.5% increase',
                color: 'success',
              },
            ].map((stat, index) => (
              <Col key={index} md={3}>
                <Card>
                  <Card.Header>{stat.title}</Card.Header>
                  <Card.Body>
                    <h5>{stat.value}</h5>
                    <p className={`text-${stat.color}`}>
                      {stat.info} since last month
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <Row>
            {/* Transactions Table */}
            <Col xl={8}>
              <Card>
                <Card.Header>Latest Transactions</Card.Header>
                <Card.Body>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Order</th>
                        <th>Product</th>
                        <th>Customer</th>
                        <th>Total</th>
                        <th>Date</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          id: '17371705',
                          product: 'Volt Dashboard',
                          customer: 'johndoe@gmail.com',
                          total: '€61.11',
                          date: 'Aug 31 2020',
                        },
                        {
                          id: '17370540',
                          product: 'Pixel UI Kit',
                          customer: 'jacob@company.com',
                          total: '$153.11',
                          date: 'Aug 28 2020',
                        },
                      ].map((order, index) => (
                        <tr key={index}>
                          <td>{order.id}</td>
                          <td>{order.product}</td>
                          <td>{order.customer}</td>
                          <td>{order.total}</td>
                          <td>{order.date}</td>
                          <td>
                            <Button size="sm" variant="primary">
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <Button variant="light" className="w-100">
                    View all
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            {/* Traffic Chart */}
            <Col xl={4}>
              <Card>
                <Card.Header>Traffic last 6 months</Card.Header>
                <Card.Body>
                  <TrafficChart />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <footer className="footer">
          <span>
            Copyright © 2025 <a href="https://themesberg.com">모락모락</a>
          </span>
          <ul className="footer-links">
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms and Conditions</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
