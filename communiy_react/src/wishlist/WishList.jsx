import React, { useState, useEffect, useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './WishList.css';
import { AuthContext } from '../context/AuthContext';

import WishListItem from './WishListItem';
import { useNavigate } from 'react-router';

export default function WishList() {
  const [filteredItems, setFilteredItems] = useState([]);
  const { isAuthenticated, userData } = useContext(AuthContext);
  const [favoriteList, setFavoriteList] = useState([]); // reviewList를 먼저 선언
  const navigate = useNavigate();

  // 리뷰값 DB에서 가져오기
  function getList(url) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setFavoriteList(data);
        console.log(data);
      });
  }

  // 페이지 시작 시 getList 호출
  useEffect(() => {
    if (!userData) return;

    getList(`http://localhost:8080/favorites/${userData?.no}`);
    console.log(userData?.no);
  }, [userData]);

  return (
    <Container>
      {isAuthenticated !== true ? (
        <></>
      ) : (
        <>
          <div className=" d-flex m-5">
            <span
              className="nav_notice"
              style={{ fontSize: '33px', marginLeft: '65px' }}
            >
              찜 목록
            </span>
          </div>
          <div className="wishList">
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {favoriteList.length > 0 ? (
                favoriteList.map((item) => (
                  <WishListItem key={item.BASKET_NO} item={item} />
                ))
              ) : (
                <div className="d-flex justify-content-center w-100">
                  <span className="WishListNo_meetings m-5">
                    찜한 모임이 없습니다.
                  </span>
                </div>
              )}
            </div>
            <ul className="pagination pagination-sm justify-content-center m-4">
              <li className="page-item">
                <a className="page-link" href="#">
                  &lt;
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  &gt;
                </a>
              </li>
            </ul>
          </div>
        </>
      )}
    </Container>
  );
}
