import React, { useState, useEffect } from 'react';
import './GroupList.css';
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import GroupItem from './GroupItem';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router';

function GroupList({ type }) {
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
      },
    },
    {
      groupList: {
        g_id: '5',
        g_title: 'Title 5',
        comment1: 'Comment 4',
        category: 'edu',
        area: 'chungcheong',
        reg_date: '2025-01-10',
        star: 1,
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
      },
    },
    {
      groupList: {
        g_id: '7',
        g_title: 'Title 7',
        comment1: 'Comment 4',
        category: 'food',
        area: 'gyeongsang',
        reg_date: '2025-01-30',
        star: 5,
      },
    },
    {
      groupList: {
        g_id: '8',
        g_title: 'Title 8',
        comment1: 'Comment 4',
        category: 'hobby',
        area: 'jeju',
        reg_date: '2025-01-28',
        star: 3,
      },
    },
    {
      groupList: {
        g_id: '9',
        g_title: 'Title 9',
        comment1: 'Comment 4',
        category: 'travel',
        area: 'seoul',
        reg_date: '2025-01-18',
        star: 2,
      },
    },
  ];

  //필터기능
  const [open, setOpen] = useState(false);
  const [rdo, setRdo] = useState([]);
  const [rdo2, setRdo2] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);
  const [selectOpt, setSelectOpt] = useState('latest');

  useEffect(() => {
    const filtered = items.filter(({ groupList }) => {
      const categoryMatch = rdo.length === 0 || rdo.includes(groupList.category);
      const areaMatch = rdo2.length === 0 || rdo2.includes(groupList.area);
      const titleMatch = groupList.g_title.toLowerCase().includes(searchTerm.toLowerCase());
      return categoryMatch && areaMatch && titleMatch;
    });
    setFilteredItems(filtered);
  }, [rdo, rdo2]);

  useEffect(() => {
    let sortedItems = [...filteredItems];
    if (selectOpt === 'latest') {
      sortedItems.sort((a, b) => new Date(b.groupList.reg_date) - new Date(a.groupList.reg_date));
    } else if (selectOpt === 'grade') {
      sortedItems.sort((a, b) => b.groupList.star - a.groupList.star);
    }
    setFilteredItems(sortedItems);
  }, [selectOpt]);

  const handelCategoryChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setRdo((prev) => [...prev, value]);
    } else {
      // 체크박스를 해제했을 때 선택된 값 배열에서 제거
      setRdo((prev) => prev.filter((item) => item !== value));
    }
    console.log('category change');
    console.log(rdo);
  };

  const handelAreaChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setRdo2((prev) => [...prev, value]);
    } else {
      setRdo2((prev) => prev.filter((item) => item !== value));
    }
    console.log('area change');
    console.log(rdo2);
  };

  const handelSelectChange = (e) => {
    setSelectOpt(e.target.value);
    console.log(selectOpt);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = items.filter(({ groupList }) => {
      const categoryMatch = rdo.length === 0 || rdo.includes(groupList.category);
      const areaMatch = rdo2.length === 0 || rdo2.includes(groupList.area);
      const titleMatch = groupList.g_title.toLowerCase().includes(searchTerm.toLowerCase());
      return categoryMatch && areaMatch && titleMatch;
    });
    setFilteredItems(filtered);
  };

  return (
    <>
      <Link to={'/group/regist'} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="group_banner">
          <span>
            모임 개설하러 가기&nbsp;
            <FontAwesomeIcon icon={faArrowRight} />
          </span>
        </div>
      </Link>
      <Container >
        <div className="group_list">
          <h1 className="p-2 group_span">
            {type === 'regular' ? `정기모임` : '동행ㆍ소모임'}
          </h1>
          <div className="filter m-2">
            <button
              className="btn1"
              onClick={() => setOpen(!open)}
              aria-controls="example-collapse-text"
              aria-expanded={open}
            >
              <i className="bi bi-funnel-fill"></i>Filter
            </button>
            <Collapse in={open} className="mt-2">
              <div id="example-collapse-text">
                <h5>카테고리</h5>
                <div onChange={handelCategoryChange}>
                  <input type="checkbox" value="culture" name="category" />
                  &nbsp;문화/예술
                  <input type="checkbox" value="food" name="category" />
                  &nbsp;푸드/드링크
                  <input type="checkbox" value="hobby" name="category" />
                  &nbsp;취미
                  <input type="checkbox" value="travel" name="category" />
                  &nbsp;여행
                  <input type="checkbox" value="edu" name="category" />
                  &nbsp;교육
                </div>
                <h5>지역</h5>
                <div onChange={handelAreaChange}>
                  <input type="checkbox" value="seoul" name="area" />
                  &nbsp;서울
                  <input type="checkbox" value="gyeong-gi" name="area" />
                  &nbsp;경기
                  <input type="checkbox" value="incheon" name="area" />
                  &nbsp;인천
                  <input type="checkbox" value="gangwon" name="area" />
                  &nbsp;강원
                  <input type="checkbox" value="chungcheong" name="area" />
                  &nbsp;충청
                  <input type="checkbox" value="jeolla" name="area" />
                  &nbsp;전라
                  <input type="checkbox" value="gyeongsang" name="area" />
                  &nbsp;경상
                  <input type="checkbox" value="jeju" name="area" />
                  &nbsp;제주
                </div>
              </div>
            </Collapse>
          </div>
          <div className="d-flex justify-content-between">
            <div>
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="검색어를 입력하세요"
                  className="m-2"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn1" type="submit">
                  search
                </button>
              </form>
            </div>
            <select onChange={handelSelectChange}>
              <option value="latest">최신 등록 순</option>
              <option value="grade">별점 순</option>
            </select>
          </div>
          <hr />
          <div>
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {filteredItems.map(({ groupList }) => (
                <GroupItem
                  g_id={groupList.g_id}
                  g_title={groupList.g_title}
                  img_url={groupList.img_url}
                  comment1={groupList.comment1}
                  start_date={groupList.start_date}
                  reg_date={groupList.reg_date}
                  star={groupList.star}
                  key={groupList.g_id}
                />
              ))}
            </div>
          </div>
          <ul className="pagination pagination-sm justify-content-center m-5">
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
    </>
  );
}

export default GroupList;