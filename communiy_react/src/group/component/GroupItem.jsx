import React from 'react';
import { Link } from 'react-router';

export default function GroupItem({ item }) {
  // 날짜 변환
  const formatDate = (date) => {
    const months = [
      '1월',
      '2월',
      '3월',
      '4월',
      '5월',
      '6월',
      '7월',
      '8월',
      '9월',
      '10월',
      '11월',
      '12월',
    ];

    const month = months[date.getMonth()]; // 0부터 시작하는 월을 얻기 위해 getMonth() 사용
    const day = date.getDate(); // 일자
    return `${month} ${day}일`;
  };
  const startDate = new Date(item.START_DATE);
  const formattedStartDate = formatDate(startDate);
  let loading = false;
  if (loading) {
    return <div>loading</div>;
  } else {
    return (
      <Link
        to={`/group/detail?group_no=${item.GROUP_NO}`}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <div className="col">
          <div className="card">
            <img
              src={`http://localhost:8080/upload/${item.IMG_URL1}`}
              className="card-img-top img-fluid p-3"
              style={{ height: '264.83px', width: '394px' }}
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">
                <strong>{item.GROUP_TITLE}</strong>
                <span></span>
              </h5>
              <p className="card-text">
                {formattedStartDate} / {item.AREA} /{' '}
                {item.CATEGORY === 'culture' && '문화/예술'}
                {item.CATEGORY === 'food' && '푸드/드링크'}
                {item.CATEGORY === 'edu' && '교육'}
                {item.CATEGORY === 'travel' && '여행'}
                {item.CATEGORY === 'hobby' && '취미'}
              </p>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}
