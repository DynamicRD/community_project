import { useState } from 'react';
import {
  Table,
  Form,
  InputGroup,
  Button,
  Modal,
  Pagination,
} from 'react-bootstrap';

const usersData = [
  {
    id: 1,
    name: '김철수',
    email: 'chulsu@example.com',
    phone: '010-9285-9299',
    reg_date: '2024-01-15',
    birth: '1990-05-21',
    gender: '남자',
    nickname: '철철이',
    self_pr: '안녕하세요! 열심히 배우고 있습니다.',
    black: 0,
    star_sum: '5.0',
  },
  {
    id: 2,
    name: '이영희',
    email: 'younghee@example.com',
    phone: '010-8900-9277',
    reg_date: '2023-12-10',
    birth: '1995-07-12',
    gender: '여자',
    nickname: '영영이',
    self_pr: '프론트엔드 개발자입니다.',
    black: 1,
    star_sum: '4.0',
  },
  {
    id: 3,
    name: '박민수',
    email: 'minsu@example.com',
    phone: '010-3542-6895',
    reg_date: '2024-02-01',
    birth: '1988-09-30',
    gender: '남자',
    nickname: '민수짱',
    self_pr: '백엔드 개발자입니다.',
    black: 0,
    star_sum: '4.8',
  },
  {
    id: 4,
    name: '정하나',
    email: 'hana@example.com',
    phone: '010-4901-5277',
    reg_date: '2024-01-20',
    birth: '1992-03-12',
    gender: '여자',
    nickname: '하나짱',
    self_pr: '풀스택 개발자',
    black: 0,
    star_sum: '5.0',
  },
  {
    id: 5,
    name: '이재훈',
    email: 'jaehoon@example.com',
    phone: '010-1234-5678',
    reg_date: '2024-02-05',
    birth: '1991-07-22',
    gender: '남자',
    nickname: '훈훈이',
    self_pr: 'UI/UX 디자이너',
    black: 0,
    star_sum: '4.9',
  },
  {
    id: 6,
    name: '김유나',
    email: 'yuna@example.com',
    phone: '010-5678-1234',
    reg_date: '2024-02-07',
    birth: '1998-06-15',
    gender: '여자',
    nickname: '유나짱',
    self_pr: 'React 개발자',
    black: 0,
    star_sum: '4.7',
  },
  {
    id: 7,
    name: '강준모',
    email: 'junmo@example.com',
    phone: '010-4142-8990',
    reg_date: '2024-02-03',
    birth: '1995-09-15',
    gender: '남자',
    nickname: '준모짱',
    self_pr: '작곡가',
    black: 0,
    star_sum: '4.5',
  },
  {
    id: 8,
    name: '구름이',
    email: 'gurum@example.com',
    phone: '010-5890-1678',
    reg_date: '2024-12-07',
    birth: '1999-06-18',
    gender: '여자',
    nickname: '구르미미',
    self_pr: '이쁜이',
    black: 0,
    star_sum: '5.0',
  },
  {
    id: 9,
    name: '모택동',
    email: 'mozzang@example.com',
    phone: '010-9672-1567',
    reg_date: '2024-07-09',
    birth: '1988-08-18',
    gender: '남자',
    nickname: '택동모',
    self_pr: '서비스 기획자',
    black: 0,
    star_sum: '5.0',
  },
  {
    id: 10,
    name: '강유미',
    email: 'yumi@example.com',
    phone: '010-5689-1137',
    reg_date: '2024-09-08',
    birth: '1988-09-08',
    gender: '여자',
    nickname: '유미짱',
    self_pr: '디자이너',
    black: 0,
    star_sum: '4.9',
  },
  {
    id: 11,
    name: '김유나',
    email: 'yuna@example.com',
    phone: '010-5678-1234',
    reg_date: '2024-02-07',
    birth: '1998-06-15',
    gender: '여자',
    nickname: '유나짱',
    self_pr: 'React 개발자',
    black: 0,
    star_sum: '4.7',
  },
];

const UserTable = () => {
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // ✅ 한 페이지당 10명 표시

  // ✅ 검색 기능 (이름, 이메일, 전화번호 포함)
  const filteredUsers = usersData.filter((user) =>
    [user.name, user.email, user.phone].some((field) =>
      field.toLowerCase().includes(search.toLowerCase())
    )
  );

  // ✅ 페이징 처리
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="user-table-container">
      <h2>회원 관리</h2>

      {/* 검색 입력창 */}
      <div className="d-flex mb-3">
        <InputGroup className="me-2">
          <Form.Control
            type="text"
            placeholder="회원 검색 (이름, 이메일, 전화번호)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>
      </div>

      {/* 회원 목록 테이블 */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>이름</th>
            <th>이메일</th>
            <th>전화번호</th>
            <th>가입일</th>
            <th>상세정보</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.length > 0 ? (
            paginatedUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.reg_date}</td>
                <td>
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => setSelectedUser(user)}
                  >
                    정보보기
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                검색 결과가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* ✅ 페이징 UI 추가 */}
      <Pagination className="justify-content-center">
        <Pagination.Prev
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        />
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        />
      </Pagination>

      {/* 상세정보 모달 */}
      {selectedUser && (
        <Modal show={true} onHide={() => setSelectedUser(null)}>
          <Modal.Header closeButton>
            <Modal.Title>유저정보</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <strong>이름:</strong> {selectedUser.name}
            </p>
            <p>
              <strong>이메일:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>생년월일:</strong> {selectedUser.birth}
            </p>
            <p>
              <strong>전화번호:</strong> {selectedUser.phone}
            </p>
            <p>
              <strong>성별:</strong> {selectedUser.gender}
            </p>
            <p>
              <strong>닉네임:</strong> {selectedUser.nickname}
            </p>
            <p>
              <strong>한줄 소개:</strong> {selectedUser.self_pr}
            </p>
            <p>
              <strong>경고 횟수:</strong> {selectedUser.black}
            </p>
            <p>
              <strong>회원가입일:</strong> {selectedUser.reg_date}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setSelectedUser(null)}>
              닫기
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default UserTable;
