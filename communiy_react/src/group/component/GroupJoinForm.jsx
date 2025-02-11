import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

export default function GroupJoinForm({ show, onHide }) {
  const [pr, setPr] = useState();
  let loading = false;
  if (loading) {
    return <div>loading</div>;
  } else {
    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>모임 신청하기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>한마디를 적어주세요</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                autoFocus
                onChange={(e) => {
                  setPr(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
          <div>
            <p>현재 보유 포인트 10,000원</p>
            <p className="text-danger">차감 예정 포인트 10,000원</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              if (confirm('신청하시겠습니까?')) {
                const form = new FormData();
                form.append('pr', pr.current.value);
                fetch('http://localhost:8080/member/statusUpdate', {
                  method: 'POST',
                  body: form,
                })
                  .then((response) => response.json())
                  .then((data) => {
                    alert(
                      '신청이 완료되었습니다. 모임장의 승인 후 활동이 가능합니다.'
                    );
                  })
                  .catch((error) => {
                    console.error('Error:', error);
                    alert('신청에 실패했습니다. 다시 시도해주세요.');
                  });
              }
            }}
          >
            신청하기
          </Button>
          <Button variant="secondary" onClick={onHide}>
            취소하기
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
