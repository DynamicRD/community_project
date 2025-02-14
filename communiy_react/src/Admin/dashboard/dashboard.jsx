// src/components/Dashboard.jsx

import { Container, Row, Col, Breadcrumb } from 'react-bootstrap';
import StatCards from './StatCards';
import TransactionsTable from './TransactionsTable';
import TrafficChart from './TrafficChart';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="d-flex">
        <Container fluid className="p-4">
          <Breadcrumb>
            <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>Overview</Breadcrumb.Item>
          </Breadcrumb>
          <h2>Dashboard</h2>
          <p>This is the homepage of a simple admin interface.</p>
          <StatCards />
          <Row>
            <Col xl={8}>
              <TransactionsTable className="h-100" />
            </Col>
            <Col xl={4}>
              <TrafficChart className="h-100" />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;
