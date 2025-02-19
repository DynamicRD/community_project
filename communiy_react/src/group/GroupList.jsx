import React, { useState, useEffect } from 'react';
import './GroupList.css';
import { Container } from 'react-bootstrap';
import Collapse from 'react-bootstrap/Collapse';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router';
import GroupItem from './component/GroupItem';

function GroupList({ type }) {
  const [items, setGroupList] = useState([]);

  useEffect(() => {
    console.log('type:' + type);
    fetch(`http://localhost:8080/group/list?type=${type}`)
      .then((res) => res.json())
      .then((data) => {
        setGroupList(data);
        setFilteredItems(data);
      });
  }, [type]);

  //필터기능
  const [open, setOpen] = useState(false);
  const [rdo, setRdo] = useState([]);
  const [rdo2, setRdo2] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);
  const [selectOpt, setSelectOpt] = useState('latest');

  //필터
  useEffect(() => {
    const filtered = items.filter((item) => {
      const categoryMatch = rdo.length === 0 || rdo.includes(item.CATEGORY);
      const areaMatch = rdo2.length === 0 || rdo2.includes(item.AREA);
      const titleMatch = item.GROUP_TITLE.toLowerCase().includes(
        searchTerm.toLowerCase()
      );
      return categoryMatch && areaMatch && titleMatch;
    });
    setFilteredItems(filtered);
  }, [rdo, rdo2, items]);

  //정렬
  // useEffect(() => {
  //   let sortedItems = [...filteredItems];
  //   if (selectOpt === 'latest') {
  //     sortedItems.sort((a, b) => new Date(b.item.REG_DATE) - new Date(a.item.REG_DATE));
  //   }
  //   // else if (selectOpt === 'grade') {
  //   //   sortedItems.sort((a, b) => b.item.star - a.groupList.star);
  //   // }
  //   setFilteredItems(sortedItems);
  // }, [selectOpt]);

  const handelCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setRdo((prev) => [...prev, value]);
    } else {
      // 체크박스를 해제했을 때 선택된 값 배열에서 제거
      setRdo((prev) => prev.filter((item) => item !== value));
    }
  };

  const handelAreaChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setRdo2((prev) => [...prev, value]);
    } else {
      setRdo2((prev) => prev.filter((item) => item !== value));
    }
  };

  const handelSelectChange = (e) => {
    setSelectOpt(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = items.filter((item) => {
      const categoryMatch = rdo.length === 0 || rdo.includes(item.CATEGORY);
      const areaMatch = rdo2.length === 0 || rdo2.includes(item.AREA);
      const titleMatch = item.G_TITLE.includes(searchTerm.toLowerCase());
      return categoryMatch && areaMatch && titleMatch;
    });
    setFilteredItems(filtered);
  };

  const formatDate = (dateString) => {
    const options = { month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ko-KR', options);
  };

  return (
    <>
      <Link
        to={'/group/regist'}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <div className="group_banner">
          <span>
            모임 개설하러 가기&nbsp;
            <FontAwesomeIcon icon={faArrowRight} />
          </span>
        </div>
      </Link>
      <Container>
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
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <GroupItem key={item.GROUP_NO} item={item} />
                ))
              ) : (
                <div className="d-flex justify-content-center w-100">
                  <h3 className="no-meetings m-5 group_span">모임이 없습니다.</h3>
                </div>
              )}
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
