import { useEffect, useState } from 'react';
import {
  Table,
  Form,
  InputGroup,
  Button,
  Modal,
  Pagination,
} from 'react-bootstrap';

const UserTable = () => {
  const [usersData, setUsersData] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Spring Boot 서버에서 데이터 가져오기
  useEffect(() => {
    fetch('http://localhost:8080/admin/users')
      .then((response) => response.json())
      .then((data) => setUsersData(data))
      .catch((error) => console.error('데이터 가져오기 실패:', error));
  }, []);

  // 검색 기능 (이름, 이메일, 전화번호 포함) - null 체크 적용
  const filteredUsers = usersData.filter((user) =>
    [user.NAME, user.EMAIL, user.PHONE].some((field) =>
      (field ?? '').toLowerCase().includes(search.toLowerCase())
    )
  );

  // 페이징 처리
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
              <tr key={user.NO}>
                <td>{user.NO}</td>
                <td>{user.NAME}</td>
                <td>{user.EMAIL}</td>
                <td>{user.PHONE}</td>
                <td>{user.REG_DATE}</td>
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

      {/* 페이징 UI 추가 */}
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
              <strong>이름:</strong> {selectedUser.NAME}
            </p>
            <p>
              <strong>이메일:</strong> {selectedUser.EMAIL}
            </p>
            <p>
              <strong>생년월일:</strong> {selectedUser.BIRTH}
            </p>
            <p>
              <strong>전화번호:</strong> {selectedUser.PHONE}
            </p>
            <p>
              <strong>성별:</strong> {selectedUser.GENDER}
            </p>
            <p>
              <strong>한줄 소개:</strong> {selectedUser.SELF_PR}
            </p>
            <p>
              <strong>경고 횟수:</strong> {selectedUser.BLACK}
            </p>
            <p>
              <strong>회원가입일:</strong> {selectedUser.REG_DATE}
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
