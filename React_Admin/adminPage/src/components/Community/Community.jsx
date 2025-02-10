import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  Form,
  InputGroup,
  Button,
  Modal,
  Pagination,
} from 'react-bootstrap';

const communityData = [
  {
    id: 1,
    g_title: 'kpop 작사 모임',
    category: '문화/예술',
    user_max: '12',
    reg_date: '2024-02-09',
    area: '서울',
    type: '정기모임',
  },
  {
    id: 2,
    g_title: 'kpop 작곡 모임',
    category: '문화/예술',
    user_max: '6',
    reg_date: '2024-02-08',
    area: '서울',
    type: '정기모임',
  },
  {
    id: 3,
    g_title: '와인 시음회',
    category: '푸드/드링크',
    user_max: '12',
    reg_date: '2024-02-09',
    area: '인천',
    type: '소모임',
  },
  {
    id: 4,
    g_title: '맛집탐방',
    category: '푸드/드링크',
    user_max: '8',
    reg_date: '2024-02-08',
    area: '경기',
    type: '동행',
  },
  {
    id: 5,
    g_title: '꿈분석 모임',
    category: '교육',
    user_max: '6',
    reg_date: '2024-02-09',
    area: '서울',
    type: '소모임',
  },
  {
    id: 6,
    g_title: '베이킹과 독서',
    category: '취미',
    user_max: '12',
    reg_date: '2024-02-08',
    area: '경기',
    type: '정기모임',
  },
  {
    id: 7,
    g_title: '사랑에 대하여 영화토론',
    category: '문화/예술',
    user_max: '6',
    reg_date: '2024-02-09',
    area: '서울',
    type: '소모임',
  },
  {
    id: 8,
    g_title: '말 습관 고치기 모임',
    category: '교육',
    user_max: '12',
    reg_date: '2024-02-08',
    area: '인천',
    type: '정기모임',
  },
  {
    id: 9,
    g_title: '혼술러 모임',
    category: '푸드/드링크',
    user_max: '6',
    reg_date: '2024-02-09',
    area: '서울',
    type: '동행',
  },
  {
    id: 10,
    g_title: '나에 대해서 알아가기 모임',
    category: '교육',
    user_max: '12',
    reg_date: '2024-02-08',
    area: '경기',
    type: '정기모임',
  },
  {
    id: 11,
    g_title: '같이 스테이크 썰러 가요 모임',
    category: '푸드/드링크',
    user_max: '4',
    reg_date: '2024-02-09',
    area: '서울',
    type: '동행',
  },
];

const Community = () => {
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // ✅ 한 페이지당 5명 표시

  // ✅ 검색 기능 (모임이름, 카테고리, 모임구분, 장소 포함)
  const filteredUsers = communityData.filter((community) =>
    [
      community.g_title,
      community.category,
      community.type,
      community.area,
    ].some((field) => field.toLowerCase().includes(search.toLowerCase()))
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
      <h2>모임 관리</h2>

      {/* 검색 입력창 */}
      <div className="d-flex mb-3">
        <InputGroup className="me-2">
          <Form.Control
            type="text"
            placeholder="모임 검색 (모임이름, 카테고리, 모임구분, 장소)"
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
            <th>모임이름</th>
            <th>카테고리</th>
            <th>참여인원</th>
            <th>모임등록일</th>
            <th>장소</th>
            <th>모임구분</th>
            <th>승인처리</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.length > 0 ? (
            paginatedUsers.map((Community) => (
              <tr key={Community.id}>
                <td>{Community.id}</td>
                <td>
                  <Link
                    to={`/community/${Community.id}`}
                    className="text-decoration-none"
                  >
                    {Community.g_title}
                  </Link>
                </td>
                <td>{Community.category}</td>
                <td>{Community.user_max}</td>
                <td>{Community.reg_date}</td>
                <td>{Community.area}</td>
                <td>{Community.type}</td>
                <td>
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => setSelectedUser(Community)}
                  >
                    승인
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
            <Modal.Title>승인하시겠습니까?</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <div className="d-flex justify-content-center gap-3">
              <Button
                variant="primary"
                className="px-4"
                onClick={() => setSelectedUser(Community)}
              >
                YES
              </Button>
              <Button
                variant="danger"
                className="px-4"
                onClick={() => setSelectedUser(Community)}
              >
                NO
              </Button>
            </div>
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

export default Community;
