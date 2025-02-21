import React from 'react';
import { Form, Image, InputGroup, Modal } from 'react-bootstrap';

export default function GroupJoinFormView({ show, onHide, selectedMember }) {
  if (!selectedMember) return null;
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 01부터 시작하는 월
    const day = String(date.getDate()).padStart(2, '0'); // 01부터 시작하는 날짜
    return `${year}년 ${month}월 ${day}일`;
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>모임 신청폼</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3>회원정보</h3>
        <div
          className="d-flex 
        align-items-center gap-3"
        >
          <Image
            src="../images/group_leader_profile.jpeg"
            roundedCircle
            style={{ height: '100px', width: '100px' }}
          />
          <div>
            <span>
              닉네임 : <span>{selectedMember.NICKNAME}</span>
              <br />
              성별 : <span>{selectedMember.GENDER}</span>
              <br />
              생년월일 : <span>{formatDate(selectedMember.BIRTH)}</span>
            </span>
          </div>
        </div>
        <hr></hr>
        <h5>자기소개</h5>
        <InputGroup>
          <Form.Control
            as="textarea"
            aria-label="With textarea"
            value={
              // selectedMember.SELF_PR === 'undefined' ||
              // selectedMember?.SELF_PR.trim() === ''
              //   ? '등록된 자기소개가 없습니다.'
              //   : 
                selectedMember.SELF_PR
            }
          />
        </InputGroup>

        <h5>한마디</h5>
        <InputGroup>
          <Form.Control
            as="textarea"
            aria-label="With textarea"
            value={
              selectedMember?.PR === 'undefined' ||
              selectedMember?.PR.trim() === ''
                ? '등록된 글이 없습니다.'
                : selectedMember.PR
            }
          />
        </InputGroup>
      </Modal.Body>
    </Modal>
  );
}
