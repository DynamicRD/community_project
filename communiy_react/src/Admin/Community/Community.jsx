import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  Form,
  InputGroup,
  Button,
  Modal,
  Pagination,
} from 'react-bootstrap';

const Community = () => {
  const [communities, setCommunities] = useState([]); // 백엔드에서 가져온 데이터 저장
  const [search, setSearch] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 한 페이지당 10개 표시

  // ✅ 1️⃣ 데이터 불러오기 (백엔드 연동)
  useEffect(() => {
    fetch('http://localhost:8080/admin/community')
      .then((response) => response.json())
      .then((data) => setCommunities(data))
      .catch((error) => console.error('데이터 로드 실패:', error));
  }, []);

  // ✅ 2️⃣ 검색 필터링 (모임이름, 카테고리, 모임구분, 장소 포함)
  const filteredCommunities = communities.filter((community) =>
    [
      community.groupTitle, // group_title
      community.category,
      community.type,
      community.area,
    ].some((field) => field?.toLowerCase().includes(search.toLowerCase()))
  );

  // ✅ 3️⃣ 페이징 처리
  const totalPages = Math.ceil(filteredCommunities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCommunities = filteredCommunities.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // ✅ 4️⃣ 모임 승인 요청
  const handleApprove = async (groupNo) => {
    try {
      const response = await fetch(
        `http://localhost:8080/admin/community/approve/${groupNo}`,
        {
          method: 'POST',
        }
      );

      if (response.ok) {
        alert('모임이 승인되었습니다!');
        window.location.reload();
        setCommunities((prev) =>
          prev.map((c) =>
            c.GROUP_NO === groupNo ? { ...c, APPROVAL: 'Y' } : c
          )
        );
        setSelectedCommunity(null);
      } else {
        alert('승인 실패');
      }
    } catch (error) {
      console.error('승인 오류:', error);
      alert('서버 오류');
    }
  };

  return (
    <div className="user-table-container">
      <h2>모임 관리</h2>

      {/* 🔍 검색 입력창 */}
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

      {/* 📌 모임 목록 테이블 */}
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
          {communities.length > 0 ? (
            communities.map((community) => (
              <tr key={community.GROUP_NO}>
                <td>{community.GROUP_NO}</td>
                <td>
                  <Link
                    to={`/admin/community/${community.GROUP_NO}`}
                    className="text-decoration-none"
                  >
                    {community.GROUP_TITLE}
                  </Link>
                </td>
                <td>{community.CATEGORY}</td>
                <td>{community.USER_MAX}</td>
                <td>{community.REG_DATE}</td>
                <td>{community.AREA}</td>
                <td>{community.TYPE}</td>
                <td>
                  {community.approval === 'Y' ? (
                    <Button size="sm" variant="success" disabled>
                      승인됨
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => {
                        console.log('승인할 community:', community); // ✅ 디버깅
                        setSelectedCommunity(community);
                      }}
                    >
                      승인
                    </Button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                검색 결과가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* 📌 페이징 UI */}
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

      {/* 📌 승인 모달 */}
      {selectedCommunity && (
        <Modal show={true} onHide={() => setSelectedCommunity(null)}>
          <Modal.Header closeButton>
            <Modal.Title>승인하시겠습니까?</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <p>{selectedCommunity.groupTitle} 모임을 승인하시겠습니까?</p>
            <div className="d-flex justify-content-center gap-3">
              <Button
                variant="primary"
                className="px-4"
                onClick={() => {
                  console.log('선택된 community:', selectedCommunity); // ✅ 확인
                  console.log('groupNo 값:', selectedCommunity.GROUP_NO); // ✅ groupNo가 올바른지 확인
                  handleApprove(selectedCommunity.GROUP_NO);
                }}
              >
                YES
              </Button>
              <Button
                variant="danger"
                className="px-4"
                onClick={() => setSelectedCommunity(null)}
              >
                NO
              </Button>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setSelectedCommunity(null)}
            >
              닫기
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Community;
