import React from 'react';
import { Form, Image, InputGroup, Modal } from 'react-bootstrap';

export default function GroupJoinFormView({ show, onHide, member }) {
  if (!member) return null;

  let loading = false;
  if (loading) {
    return <div>loading</div>;
  } else {
    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>멤버 프로필</Modal.Title>
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
                닉네임 : <span>{member.nickname}</span>
                <br />
                성별 : <span>{member.gender}</span>
                <br />
                생년월일 : <span>{member.birth}</span>
                <br />
                연락처 : <span>{member.phone}</span>
              </span>
            </div>
          </div>
          <hr></hr>
          <h5>자기소개</h5>
          <InputGroup>
            <Form.Control
              as="textarea"
              aria-label="With textarea"
              value={member.self_pr}
            />
          </InputGroup>
          <h5>한마디</h5>
          <InputGroup>
            <Form.Control
              as="textarea"
              aria-label="With textarea"
              value={member.group_pr}
            />
          </InputGroup>
        </Modal.Body>
      </Modal>
    );
  }
}
