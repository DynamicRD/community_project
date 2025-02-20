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
                    {item.START_DATE} / {item.AREA} /{' '}
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
        </div>
      </>
    );
  }
}
