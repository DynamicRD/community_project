import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './WishList.css';

import WishListItem from './WishListItem';

//목업데이터
const items = [
  {
    groupList: {
      g_id: '1',
      g_title: 'Title 1',
      comment1: 'Comment 1',
      img_url: '/images/card01.png',
      category: 'culture',
      area: 'seoul',
      reg_date: '2025-02-01',
      star: 4,
      status: 1,
    },
  },
  {
    groupList: {
      g_id: '2',
      g_title: 'Title 2',
      comment1: 'Comment 2',
      img_url: '/images/slide01.png',
      category: 'food',
      area: 'gyeong-gi',
      reg_date: '2025-01-15',
      star: 5,
      status: 1,
    },
  },
  {
    groupList: {
      g_id: '3',
      g_title: 'Title 3',
      comment1: 'Comment 3',
      img_url: '/images/card01.png',
      category: 'hobby',
      area: 'incheon',
      reg_date: '2025-01-20',
      star: 3,
      status: 1,
    },
  },
  {
    groupList: {
      g_id: '4',
      g_title: 'Title 4',
      comment1: 'Comment 4',
      category: 'travel',
      area: 'gangwon',
      reg_date: '2025-01-25',
      star: 2,
      status: 0,
    },
  },
  {
    groupList: {
      g_id: '5',
      g_title: 'Title 5',
      comment1: 'Comment 4',
      img_url: '/images/card01.png',
      category: 'edu',
      area: 'chungcheong',
      reg_date: '2025-01-10',
      star: 1,
      status: 1,
    },
  },
  {
    groupList: {
      g_id: '6',
      g_title: 'Title 6',
      comment1: 'Comment 4',
      category: 'culture',
      area: 'jeolla',
      reg_date: '2025-01-05',
      star: 4,
      status: 0,
    },
  },
  {
    groupList: {
      g_id: '7',
      g_title: 'Title 7',
      comment1: 'Comment 4',
      img_url: '/images/card01.png',
      category: 'food',
      area: 'gyeongsang',
      reg_date: '2025-01-30',
      star: 5,
      status: 1,
    },
  },
  {
    groupList: {
      g_id: '8',
      g_title: 'Title 8',
      comment1: 'Comment 4',
      category: 'hobby',
      img_url: '/images/card01.png',
      area: 'jeju',
      reg_date: '2025-01-28',
      star: 3,
      status: 1,
    },
  },
  {
    groupList: {
      g_id: '9',
      g_title: 'Title 9',
      comment1: 'Comment 4',
      category: 'travel',
      img_url: '/images/card01.png',
      area: 'seoul',
      reg_date: '2025-01-18',
      star: 2,
      status: 1,
    },
  },
];

export default function WishList() {
  const [filteredItems, setFilteredItems] = useState(items);

  useEffect(() => {
    const filtered = items.filter(({ groupList }) => groupList.status === 1);
    setFilteredItems(filtered);
  }, [items]);

  // 상태가 변경될 때 부모에서 처리할 함수
  const handleStatusChange = (g_id, newStatus) => {
    // 아이템 목록에서 해당 g_id의 아이템을 찾아서 status 값을 업데이트
    setFilteredItems((prevItems) =>
      prevItems.map(({ groupList }) =>
        groupList.g_id === g_id
          ? { ...groupList, status: newStatus }
          : groupList
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
          {filteredItems.map(({ groupList }) => (
            <WishListItem
              g_id={groupList.g_id}
              g_title={groupList.g_title}
              img_url={groupList.img_url}
              comment1={groupList.comment1}
              start_date={groupList.start_date}
              reg_date={groupList.reg_date}
              star={groupList.star}
              status={groupList.status}
              key={groupList.g_id}
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
