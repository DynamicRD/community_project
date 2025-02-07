import { useState } from 'react';
import { Table, Form, InputGroup } from 'react-bootstrap';

const usersData = [
  {
    id: 1,
    name: '김철수',
    email: 'chulsu@example.com',
    status: 'Active',
    joined: '2024-01-15',
  },
  {
    id: 2,
    name: '이영희',
    email: 'younghee@example.com',
    status: 'Inactive',
    joined: '2023-12-10',
  },
  {
    id: 3,
    name: '박민수',
    email: 'minsu@example.com',
    status: 'Active',
    joined: '2024-02-01',
  },
  {
    id: 4,
    name: '정하나',
    email: 'hana@example.com',
    status: 'Active',
    joined: '2024-01-20',
  },
];

const UserTable = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filteredUsers = usersData.filter(
    (user) =>
      (filter === 'All' || user.status === filter) &&
      (user.name.includes(search) || user.email.includes(search))
  );

  return (
    <div className="user-table-container">
      <h2>회원 관리</h2>

      {/* 검색 및 필터 */}
      <div className="d-flex mb-3">
        <InputGroup className="me-2">
          <Form.Control
            type="text"
            placeholder="회원 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>
        <Form.Select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">전체</option>
          <option value="Active">활성</option>
          <option value="Inactive">비활성</option>
        </Form.Select>
      </div>

      {/* 회원 목록 테이블 */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>이름</th>
            <th>이메일</th>
            <th>상태</th>
            <th>가입일</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`status-badge ${user.status.toLowerCase()}`}>
                    {user.status}
                  </span>
                </td>
                <td>{user.joined}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                검색 결과가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default UserTable;
