import React, { useRef } from 'react';

import { useNavigate } from 'react-router';

const Announcements_regist = () => {
  const navigate = useNavigate();
  const title = useRef();
  const content = useRef();
  const select = useRef();
  return (
    <div className="user-table-container">
      <input type="text" ref={title} />
      <input type="text" ref={content} />
      <select name="selectType" id="selectType" ref={select}>
        <option value="notice">공지사항</option>
        <option value="faq">FAQ</option>
      </select>
      <button
        onClick={() => {
          const form = new FormData();
          form.append('n_title', title.current.value);
          form.append('content', content.current.value);
          console.log(select.current.value);
          console.log(title.current.value);
          console.log(content.current.value);
          if (select.current.value === 'faq') {
            fetch('http://localhost:8080/announcements/faq/insert', {
              method: 'POST',
              body: form,
            }).then(() => {});
          }
          if (select.current.value === 'notice') {
            fetch('http://localhost:8080/announcements/notice/insert', {
              method: 'POST',
              body: form,
            }).then(() => {});
          }
        }}
      >
        전송하기
      </button>
    </div>
  );
};

export default Announcements_regist;
