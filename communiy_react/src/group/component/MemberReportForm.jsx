import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useRef } from 'react';
import { Button, Form, Image, InputGroup, Modal } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';

export default function MemberReportForm({ show, onHide, member }) {
  const { isAuthenticated, userData } = useContext(AuthContext);
  const reason = useRef(null);
  if (!member) return null;
  let loading = false;
  if (loading) {
    return <div>loading</div>;
  } else {
    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>멤버 신고하기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
              autoFocus
            >
              <Form.Label>신고 사유를 작성해주세요</Form.Label>
              <Form.Control as="textarea" rows={3} ref={reason} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              // 사용자가 확인을 클릭한 경우에만 신고 처리
              if (confirm('신고하시겠습니까?')) {
                const form = new FormData();
                form.append('reporter_no', userData.no);
                form.append('reported_no', member.NO);
                form.append('reason', reason.current.value);

                // fetch 요청에 FormData를 전달
                fetch('http://localhost:8080/group/memberReport', {
                  method: 'POST',
                  body: form, // FormData 객체를 전송
                })
                  .then((response) => {
                    if (response.ok) {
                      alert('신고가 완료되었습니다.');
                    } else {
                      alert('처리 중 오류가 발생했습니다.');
                    }
                  })
                  .catch((error) => {
                    console.error('Fetch error:', error);
                    alert('서버와의 연결에 문제가 있습니다.');
                  })
                  .finally(() => {
                    onHide(); // 처리 완료 후 모달 닫기
                  });
              }
            }}
          >
            신고하기
          </Button>
          <Button variant="secondary" onClick={onHide}>
            취소하기
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
