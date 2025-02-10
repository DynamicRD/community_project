// src/components/TransactionsTable.jsx

import { Card, Table, Button } from 'react-bootstrap';
import './dashboard.css';
const orders = [
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
];

const TransactionsTable = () => {
  return (
    <Card>
      <Card.Header>Latest Transactions</Card.Header>
      <Card.Body className="table-responsive">
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
            {orders.map((order, index) => (
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
  );
};

export default TransactionsTable;
