import React, { useState, useEffect, useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './WishList.css';
import { AuthContext } from '../context/AuthContext';

import WishListItem from './WishListItem';

export default function WishList() {
  const [filteredItems, setFilteredItems] = useState([]);
  const { isAuthenticated, userData } = useContext(AuthContext);
  const [favoriteList, setFavoriteList] = useState([]); // reviewList를 먼저 선언

  useEffect(() => {
    const filtered = favoriteList.filter((groupList) => groupList.STATUS === 1);
    setFilteredItems(filtered);
  }, [favoriteList]);

  // groupedReviews 상태 추가 (바뀐 부분)/ reviewList를 먼저 선언

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
    getList('http://localhost:8080/favorites');
  }, []);

  // 상태가 변경될 때 부모에서 처리할 함수
  const handleStatusChange = (g_id, newStatus) => {
    // 아이템 목록에서 해당 g_id의 아이템을 찾아서 status 값을 업데이트
    setFilteredItems((prevItems) =>
      prevItems.map((object) =>
        object.GROUP_NO === g_id ? { ...object, STATUS: newStatus } : object
      )
    );
  };

  return (
    <Container>
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
          {filteredItems.map((object) => (
            <WishListItem
              g_id={object.BASKET_NO}
              g_title={object.GROUP_TITLE}
              img_url={object.IMG_URL}
              comment1={object.COMMENT1}
              start_date={object.START_DATE}
              reg_date={object.REG_DATE}
              category={object.CATEGORY}
              star={object.star}
              status={object.STATUS}
              key={object.GROUP_ID}
              onStatusChange={handleStatusChange}
            />
          ))}
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
    </Container>
  );
}
