import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router';
import './WishList.css';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

export default function WishListItem({ item }) {
  const handleFavoriteClick = () => {
    fetch('http://localhost:8080/favorites/delete/' + item.BASKET_NO)
      .then(() => {})
      .catch((error) => {
        console.error('Error fetching review data:', error);
      })
      .finally(() => {
        window.location.reload();
      });
  };

  let loading = false;
  if (loading) {
    return <div>loading</div>;
  } else {
    return (
      <>
        <div className="card_heartImg col">
          <div className="favorite" onClick={handleFavoriteClick}>
            <FaHeart className="heartIcon" />
          </div>
          <Link
            to={`/group/detail?group_no=${item.GROUP_NO}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div className="col">
              <div className="card h-100">
                <img
                  src={`/images/${item.IMG_URL1}`}
                  className="card-img-top img-fluid"
                  style={{ height: '264.83px', width: '394px' }}
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">{item.GROUP_TITLE}</h5>
                  <p className="card-text">{item.COMMENT1}</p>
                  <p className="card-text">카테고리 {item.CATEGORY}</p>
                  <p className="card-text">{item.AREA}</p>
                  <p className="card-text">시작일 {item.START_DATE}</p>
                  <p className="card-text">정원 {item.USER_MAX}</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </>
    );
  }
}
