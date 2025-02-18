import React, { useState } from 'react';
import { Link } from 'react-router';
import './WishList.css';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

export default function WishListItem({
  g_id,
  g_title,
  comment1,
  img_url,
  start_date,
  category,
  area,
  status,
  onStatusChange, // 부모 컴포넌트에서 전달받은 상태 변경 함수
}) {
  const [statusValue, setStatusValue] = useState(status);

  const handleFavoriteClick = () => {
    const newStatus = statusValue === 0 ? 1 : 0; // 상태를 0이면 1로, 1이면 0으로 토글
    setStatusValue(newStatus); // 로컬 상태 변경
    onStatusChange(g_id, newStatus); // 부모에게 상태 변경 전달
  };

  const handleHeartClick = () => {
    // 하트 아이콘 클릭 시 페이지 새로고침
    window.location.reload();
  };

  let loading = false;
  if (loading) {
    return <div>loading</div>;
  } else {
    return (
      <div className="col">
        <div className="card_heartImg card h-100">
          <div
            className="favorite"
            onClick={(handleFavoriteClick, handleHeartClick)} // //
          >
            {statusValue === 0 ? (
              <FaRegHeart className="heartIcon" />
            ) : (
              <FaHeart className="heartIcon" />
            )}
          </div>
          <Link
            to={`/group/detail?g_id=${g_id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <img
              src="/images/1739754157992_문정배 사진.jpg"
              className="WishListImg card-img-top"
              style={{ height: '264.83px', width: '394px' }}
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">{g_title}</h5>
              {/* <p className="card-text">{comment1}</p> */}
              {/* <p className="card-text">{category}</p> */}
              <p className="card-text">{area}</p>
              <p className="card-text">{start_date}</p>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}
