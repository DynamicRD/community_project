import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import {
  Table,
  Form,
  InputGroup,
  Button,
  Pagination,
  Dropdown,
  Modal,
  Container,
} from 'react-bootstrap';

const Complaint = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [actionMessage, setActionMessage] = useState('');
  const [warningMessage, setWarningMessage] = useState('');
  const warningMessageRef = useRef();
  const itemsPerPage = 10;

  const [loading, setLoading] = useState(false);
  const url = 'http://localhost:8080/complaint/list';

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setReports(data);
      })
      .catch((error) => {
        console.error('Error fetching review data:', error);
      })
      .finally(() => {
        setLoading(true);
      });
  }, []);

  // 검색 변경 시 currentPage를 1로 초기화
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const filteredReports = reports.filter(
    (report) =>
      report.REPORTER.includes(search) ||
      report.REPORTED.includes(search) ||
      report.REASON.includes(search)
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

  const handleSubmitAction = async (number, reported_no, value) => {
    setReports(
      reports.map((r) =>
        r.REP_NO === selectedReport.REP_NO
          ? { ...r, REP_STATUS: value, actionMessage }
          : r
      )
    );
    setWarningMessage(warningMessageRef.current.value);
    setSelectedReport(null);
    setActionMessage('');

    const formData = new FormData();
    formData.append('number', Number(number));
    formData.append('reported_no', Number(reported_no));
    switch (value) {
      case 'W':
        try {
          formData.append('type', 'W');
          const response = await axios.post(
            'http://localhost:8080/complaint/status',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          );
          console.log('업로드 성공:', response.data);
        } catch (error) {
          console.error('업로드 실패:', error);
        }
        break;

      case 'P':
        try {
          formData.append('type', 'P');
          const response = await axios.post(
            'http://localhost:8080/complaint/status',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          );
          console.log('업로드 성공:', response.data);
        } catch (error) {
          console.error('업로드 실패:', error);
        }
        break;

      default:
        alert('알 수 없는 오류로 인해 실행이 취소되었습니다');
        break;
    }
    value;
  };

  if (!loading) {
    return (
      <Container className="d-flex justify-content-center">
        <div>
          <span>Loading...</span>
        </div>
      </Container>
    );
  } else {
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
                <tr key={report.REP_NO}>
                  <td>{report.REP_NO}</td>
                  <td>{report.REPORTER}</td>
                  <td>{report.REPORTED}</td>
                  <td>{report.REASON}</td>
                  <td>{report.REP_DATE}</td>
                  <td>
                    {report.REP_STATUS === 'N'
                      ? '처리 전'
                      : report.REP_STATUS === 'P'
                      ? '보류'
                      : report.REP_STATUS === 'W'
                      ? '경고 처리'
                      : '알 수 없음'}
                  </td>
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
              <p>신고자: {selectedReport.REPORTER}</p>
              <p>신고대상: {selectedReport.REPORTED}</p>
              <p>신고내용: {selectedReport.REASON}</p>
              <p>신고일: {selectedReport.REP_DATE}</p>
              {selectedReport.REP_STATUS === 'N'
                ? '처리 전'
                : selectedReport.REP_STATUS === 'P'
                ? '보류'
                : selectedReport.REP_STATUS === 'W'
                ? '경고 처리'
                : '알 수 없음'}
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="처리 결과 메시지를 입력하세요"
                onChange={(e) => setActionMessage(e.target.value)}
                ref={warningMessageRef}
              />
              <div className="d-flex justify-content-center gap-3 mt-3">
                <Button
                  variant="danger"
                  onClick={() =>
                    handleSubmitAction(
                      selectedReport.REP_NO,
                      selectedReport.REPORTED_NO,
                      'W'
                    )
                  }
                >
                  경고
                </Button>
                <Button
                  variant="primary"
                  onClick={() =>
                    handleSubmitAction(
                      selectedReport.REP_NO,
                      selectedReport.REPORTED_NO,
                      'P'
                    )
                  }
                >
                  넘어감
                </Button>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setSelectedReport(null)}
              >
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
              <p>신고자: {selectedDetail.REPORTER}</p>
              <p>신고대상: {selectedDetail.REPORTED}</p>
              <p>신고내용: {selectedDetail.REASON}</p>
              <p>신고일: {selectedDetail.REP_DATE}</p>
              {selectedDetail.REP_STATUS === 'N'
                ? '처리 전'
                : selectedDetail.REP_STATUS === 'P'
                ? '보류'
                : selectedDetail.REP_STATUS === 'W'
                ? '경고 처리'
                : '알 수 없음'}
              <Form.Control
                as="textarea"
                rows={3}
                value={warningMessage}
                readOnly
              />
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setSelectedDetail(null)}
              >
                닫기
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    );
  }
};

export default Complaint;
