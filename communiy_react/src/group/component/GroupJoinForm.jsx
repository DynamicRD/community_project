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
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(value);
  };

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
          <p>현재 보유 포인트 {formatCurrency(userData?.money)}원<br/>
          <span className='text-danger'>차감 예정 포인트 {formatCurrency(items.PRICE)}원</span></p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() => {
            if (confirm('신청하시겠습니까?')) {
              const form = new FormData();
              form.append('group_no', Number(items.GROUP_NO));
              form.append('status', 'waiting');
              form.append('no', userData?.no); // 회원 아이디
              form.append('pr', pr); // 신청 폼
              form.append('price', Number(items.PRICE));
              fetch('http://localhost:8080/group/join', {
                method: 'post',
                body: form,
              })
              .then((response) => {
                
                if (!response.ok) {
                  // 응답이 실패하면 JSON 형식으로 오류 메시지를 받음
                  return response.text().then((errorData) => {
                    try {
                      // 서버에서 문자열로 받은 응답을 JSON으로 파싱 시도
                      const parsedError = JSON.parse(errorData);
                      throw new Error(
                        parsedError.message ||
                          '처리에 실패했습니다. 다시 시도해주세요.'
                      );
                    } catch (e) {
                      // JSON 파싱 실패 시 그냥 문자열로 처리
                      throw new Error(
                        errorData ||
                          '처리에 실패했습니다. 다시 시도해주세요.'
                      );
                    }
                  });
                }
                return response.text(); // 정상 응답일 경우
              })
              .then((message) => {
                alert(message); // 성공 시 반환된 메시지
                onHide(true);
              })
              .catch((error) => {
                alert(error.message); // 서버에서 넘긴 오류 메시지
                onHide(true);
              });
            }}}
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
