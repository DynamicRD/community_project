import React, { useState } from 'react';
import { Button, Form, Image, InputGroup, Modal } from 'react-bootstrap';
import MemberReportForm from './MemberReportForm';

export default function MemberProfileView({ show, onHide, member }) {
  const [reportForm, setReportFormOpen] = useState(false);
  if (!member) return null;
  const formOpen = (id) =>{
    setReportFormOpen(true);
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>멤버 프로필 보기</Modal.Title>
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
            <span className='fs-5'>
              닉네임 : <span>{member.nickname}</span>
              <br />
              성별 : <span>{member.gender}</span>
              <br />
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
        <div className="text-end">
          <Button variant="danger" onClick={()=>{formOpen(member.id)}}>신고하기</Button>
        </div>
      </Modal.Body>
      <MemberReportForm show={reportForm} onHide={()=>setReportFormOpen(false)} member={member}/>
    </Modal>
  );
}
