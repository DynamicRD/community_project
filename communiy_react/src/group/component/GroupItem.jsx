import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

export default function GroupItem({ item }) {
  const [isClosed, setIsClosed] = useState(false);  // 초기값을 false로 설정

  useEffect(() => {
    // fetch 요청을 비동기로 처리
    const checkIfClosed = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/group/isClosed?group_no=${item.GROUP_NO}`
        );
        const result = await response.json(); // 응답을 JSON으로 파싱
        setIsClosed(result); // 응답 값으로 isClosed 상태 설정
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    checkIfClosed();  // 함수 호출
  }, [item.GROUP_NO]);  // 의존성 배열에 item.GROUP_NO 추가하여 해당 값이 바뀔 때만 실행되도록 설정

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
    const month = months[date.getMonth()];
    const day = date.getDate();
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
          <div
            className="card"
            style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
          >
            <div
              className="thumbnail-container"
              style={{
                position: 'relative',
                overflow: 'hidden',
                flex: '1', // 이미지 영역을 flex로 조정
              }}
            >
              <img
                src={`http://localhost:8080/upload/${item.IMG_URL1}`}
                className="card-img-top img-fluid p-3"
                style={{
                  height: '264.83px',
                  width: '100%', // 100%로 width 맞추기
                  filter: isClosed ? 'brightness(0.6)' : 'none', // 모집 마감되면 어둡게 처리
                  transition: 'filter 0.3s ease',
                }}
                alt="..."
              />
              {isClosed && (
                <div
                  className="closed-badge"
                  style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    backgroundColor: 'rgba(60, 60, 60, 0.8)',
                    color: 'white',
                    padding: '5px 10px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    borderRadius: '5px',
                    zIndex: 10,
                  }}
                >
                  모집 마감
                </div>
              )}
            </div>
            <div
              className="card-body"
              style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
            >
              <h5
                className="card-title"
                style={{
                  flexShrink: 0,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                <strong>{item.GROUP_TITLE}</strong>
              </h5>
              <p className="card-text" style={{ flexGrow: 1 }}>
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
