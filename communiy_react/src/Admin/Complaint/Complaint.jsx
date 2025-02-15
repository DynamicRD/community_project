import { useState, useEffect } from 'react';
import {
  Table,
  Form,
  InputGroup,
  Button,
  Pagination,
  Dropdown,
  Modal,
} from 'react-bootstrap';

const reportData = [
  {
    id: 1,
    reporter: '이예찬',
    reported: '차재경',
    reason: '이 사람을 신고합니다.',
    date: '2024. 8. 16.',
    status: '처리전',
  },
  {
    id: 2,
    reporter: '김유신',
    reported: '차재경',
    reason: '이 사람 이상해요',
    date: '2024. 8. 16.',
    status: '경고처리',
  },
  {
    id: 3,
    reporter: '김유신',
    reported: '차인표',
    reason: '이 사람',
    date: '2024. 8. 16.',
    status: '경고처리',
  },
  {
    id: 4,
    reporter: '김유신',
    reported: '이순신',
    reason: '이 사람 이상해요',
    date: '2024. 8. 16.',
    status: '경고처리',
  },
  {
    id: 5,
    reporter: '김유신',
    reported: '최유신',
    reason: '이 사람 이상해요',
    date: '2024. 8. 16.',
    status: '경고처리',
  },
  {
    id: 6,
    reporter: '김유신',
    reported: '박순신',
    reason: '이 사람 이상해요',
    date: '2024. 8. 16.',
    status: '넘어감',
  },
  {
    id: 7,
    reporter: '이예찬',
    reported: '차재경',
    reason: '이 사람을 신고합니다.',
    date: '2024. 8. 16.',
    status: '처리전',
  },
  {
    id: 8,
    reporter: '김유신',
    reported: '차재경',
    reason: '이 사람 이상해요',
    date: '2024. 8. 16.',
    status: '경고처리',
  },
  {
    id: 9,
    reporter: '김유신',
    reported: '차인표',
    reason: '이 사람',
    date: '2024. 8. 16.',
    status: '경고처리',
  },
  {
    id: 10,
    reporter: '김유신',
    reported: '이순신',
    reason: '이 사람 이상해요',
    date: '2024. 8. 16.',
    status: '경고처리',
  },
  {
    id: 11,
    reporter: '김유신',
    reported: '최유신',
    reason: '이 사람 이상해요',
    date: '2024. 8. 16.',
    status: '경고처리',
  },
  {
    id: 12,
    reporter: '김유신',
    reported: '박순신',
    reason: '이 사람 이상해요',
    date: '2024. 8. 16.',
    status: '넘어감',
  },
];

const Complaint = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [reports, setReports] = useState(reportData);
  const [selectedReport, setSelectedReport] = useState(null);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [actionMessage, setActionMessage] = useState('');
  const itemsPerPage = 10;

  // 검색 변경 시 currentPage를 1로 초기화
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const filteredReports = reports.filter(
    (report) =>
      report.reporter.includes(search) ||
      report.reported.includes(search) ||
      report.reason.includes(search)
  );

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedReports = filteredReports.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleAction = (report) => {
    setSelectedReport(report);
  };
  const handleDetail = (report) => {
    setSelectedDetail(report);
  };
  const handleSubmitAction = () => {
    setReports(
      reports.map((r) =>
        r.id === selectedReport.id
          ? { ...r, status: '조치완료', actionMessage }
          : r
      )
    );
    setSelectedReport(null);
    setActionMessage('');
  };

  return (
    <div className="report-management-container p-4 mt-5">
      <h2>신고 관리</h2>

      {/* 검색 입력창 */}
      <div className="d-flex mb-3">
        <InputGroup className="me-2">
          <Form.Control
            type="text"
            placeholder="검색어를 입력하세요"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>
      </div>

      {/* 신고 목록 테이블 */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>번호</th>
            <th>신고자</th>
            <th>신고대상</th>
            <th>신고내용</th>
            <th>신고일</th>
            <th>상태</th>
            <th>조치</th>
            <th>상세정보</th>
          </tr>
        </thead>
        <tbody>
          {paginatedReports.length > 0 ? (
            paginatedReports.map((report) => (
              <tr key={report.id}>
                <td>{report.id}</td>
                <td>{report.reporter}</td>
                <td>{report.reported}</td>
                <td>{report.reason}</td>
                <td>{report.date}</td>
                <td>{report.status}</td>
                <td>
                  <Button
                    size="sm"
                    variant="warning"
                    onClick={() => handleAction(report)}
                  >
                    조치하기
                  </Button>
                </td>
                <td>
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => handleDetail(report)}
                  >
                    상세보기
                  </Button>
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
      {/* 페이징 UI */}
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
      {/* 신고 조치 모달 */}
      {selectedReport && (
        <Modal show onHide={() => setSelectedReport(null)}>
          <Modal.Header closeButton>
            <Modal.Title>신고 조치</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>신고자: {selectedReport.reporter}</p>
            <p>신고대상: {selectedReport.reported}</p>
            <p>신고내용: {selectedReport.reason}</p>
            <p>신고일: {selectedReport.date}</p>
            <p>상태: {selectedReport.status}</p>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="처리 결과 메시지를 입력하세요"
              value={actionMessage}
              onChange={(e) => setActionMessage(e.target.value)}
            />
            <div className="d-flex justify-content-center gap-3 mt-3">
              <Button variant="danger" onClick={handleSubmitAction}>
                경고
              </Button>
              <Button variant="primary" onClick={handleSubmitAction}>
                넘어감
              </Button>
              <Button variant="success" onClick={handleSubmitAction}>
                삭제
              </Button>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setSelectedReport(null)}>
              닫기
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {/* 신고 상세 모달 */}
      {selectedDetail && (
        <Modal show onHide={() => setSelectedDetail(null)}>
          <Modal.Header closeButton>
            <Modal.Title>신고 상세</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>신고자: {selectedDetail.reporter}</p>
            <p>신고대상: {selectedDetail.reported}</p>
            <p>신고내용: {selectedDetail.reason}</p>
            <p>신고일: {selectedDetail.date}</p>
            <p>처리 상태: {selectedDetail.status}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setSelectedDetail(null)}>
              닫기
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Complaint;
