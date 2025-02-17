import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';

export default function GroupJoinForm({ show, onHide, group_no }) {
  const { isAuthenticated, userData } = useContext(AuthContext);
  const [items, setGroupDetail] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:8080/group/detail?group_no=${group_no}`)
      .then((res) => res.json())
      .then((dataArray) => {
        setGroupDetail(dataArray);
      });
  }, [group_no]);
  const [pr, setPr] = useState();

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>모임 신청하기</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
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
          <p className="text-danger">차감 예정 포인트 {items.PRICE}원</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() => {
            if (confirm('신청하시겠습니까?')) {
              const form = new FormData();
              form.append('no', userData?.no); // 회원 아이디
              form.append('group_no', Number(items.GROUP_NO));
              form.append('price', Number(items.PRICE));
              form.append('status', 'waiting');
              form.append('pr', pr); // 신청 폼
              fetch('http://localhost:8080/group/join', {
                method: 'post',
                body: form,
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error('신청에 실패했습니다. 다시 시도해주세요.');
                  }
                  return response.text();
                })
                .then((message) => {
                  alert(message);
                  onHide(true);
                })
                .catch((error) => {
                  alert(error.message);
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
