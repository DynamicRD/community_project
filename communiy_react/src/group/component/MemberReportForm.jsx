import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Form, Image, InputGroup, Modal } from 'react-bootstrap';

export default function MemberReportForm({ show, onHide, member }) {
  if (!member) return null;

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
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={()=>{
            confirm('신고하시겠습니까?');{
              fetch('http://localhost:8080/member/report', {
                method: 'POST',
              });
              alert('신고가 완료되었습니다.');
              onHide();
            }
          }}>
          신고하기
          </Button>
          <Button variant="secondary" onClick={onHide}>
            취소하기
          </Button>
        </Modal.Footer>
      </Modal>
  );
}
