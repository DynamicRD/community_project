import React, { useState, useEffect, useContext } from 'react';
import './GroupList.css';
import { Container, Pagination } from 'react-bootstrap';
import Collapse from 'react-bootstrap/Collapse';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router';
import GroupItem from './component/GroupItem';
import { AuthContext } from '../context/AuthContext'; //

function GroupList({ type }) {
  const [items, setGroupList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const { isAuthenticated, userData } = useContext(AuthContext);

  useEffect(() => {
    fetch(`http://localhost:8080/group/list?type=${type}`)
      .then((res) => res.json())
      .then((data) => {
        setGroupList(data);
        setFilteredItems(data); // 초기 데이터 설정
      });
  }, [type]);

  // 필터링 상태 변수
  const [open, setOpen] = useState(false);
  const [rdo, setRdo] = useState([]);
  const [rdo2, setRdo2] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);
  const [selectOpt, setSelectOpt] = useState('latest');

  // 필터링 로직
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
  }, [rdo, rdo2, searchTerm, items]);

  // 페이지네이션 관련 계산
  const startIndex = (currentPage - 1) * itemsPerPage;
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedReports = filteredItems.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // 카테고리 필터 변경
  const handelCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setRdo((prev) => [...prev, value]);
    } else {
      setRdo((prev) => prev.filter((item) => item !== value));
    }
  };

  // 지역 필터 변경
  const handelAreaChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setRdo2((prev) => [...prev, value]);
    } else {
      setRdo2((prev) => prev.filter((item) => item !== value));
    }
  };

  // 정렬 옵션 변경
  const handelSelectChange = (e) => {
    setSelectOpt(e.target.value);
  };

  // 정렬 기능
  useEffect(() => {
    let sortedItems = [...items]; // filteredItems 대신 items를 사용
    if (selectOpt === 'latest') {
      // 최신 등록 순 정렬
      sortedItems.sort((a, b) => new Date(b.REG_DATE) - new Date(a.REG_DATE));
    } else if (selectOpt === 'start_date') {
      // 시작 날짜 순 정렬
      sortedItems.sort(
        (a, b) => new Date(a.START_DATE) - new Date(b.START_DATE)
      );
    }
    setFilteredItems(sortedItems); // 정렬된 items를 filteredItems에 설정
  }, [selectOpt, items]); // selectOpt나 items가 변경될 때마다 실행

  // 검색 기능
  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = items.filter((item) => {
      const categoryMatch = rdo.length === 0 || rdo.includes(item.CATEGORY);
      const areaMatch = rdo2.length === 0 || rdo2.includes(item.AREA);
      const titleMatch = item.G_TITLE.toLowerCase().includes(
        searchTerm.toLowerCase()
      );
      return categoryMatch && areaMatch && titleMatch;
    });
    setFilteredItems(filtered);
  };

  return (
    <>
      <Link
        to={'/group/regist'}
        style={{ textDecoration: 'none', color: 'inherit' }}
        onClick={(e) => {
          if (!isAuthenticated) {
            e.preventDefault();
            alert('로그인 후 이용 가능합니다.');
            window.location.href = '/login';
          }
        }}
      >
        <div className="group_banner">
          <span>
            모임 개설하러 가기&nbsp;
            <FontAwesomeIcon icon={faArrowRight} />
          </span>
        </div>
      </Link>
      <Container style={{ maxWidth: '85%' }}>
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
                  <input type="checkbox" value="서울" name="area" />
                  &nbsp;서울
                  <input type="checkbox" value="경기" name="area" />
                  &nbsp;경기
                  <input type="checkbox" value="인천" name="area" />
                  &nbsp;인천
                  <input type="checkbox" value="강원" name="area" />
                  &nbsp;강원
                  <input type="checkbox" value="충청" name="area" />
                  &nbsp;충청
                  <input type="checkbox" value="전라" name="area" />
                  &nbsp;전라
                  <input type="checkbox" value="경상" name="area" />
                  &nbsp;경상
                  <input type="checkbox" value="부산" name="area" />
                  &nbsp; 부산
                  <input type="checkbox" value="제주" name="area" />
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
              <option value="start_date">시작 날짜 빠른 순</option>
            </select>
          </div>
          <hr />
          <div>
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {paginatedReports.length > 0 ? (
                paginatedReports.map((item) => (
                  <GroupItem key={item.GROUP_NO} item={item} />
                ))
              ) : (
                <div className="d-flex justify-content-center w-100">
                  <h3 className="no-meetings m-5 group_span">
                    모임이 없습니다.
                  </h3>
                </div>
              )}
            </div>
          </div>
          <Pagination className="justify-content-center">
            <Pagination.Prev
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={currentPage === 1 ? 'disabled' : ''}
            />
            {[...Array(totalPages)].map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage} // 현재 페이지일 때만 active
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={currentPage === totalPages ? 'disabled' : ''}
            />
          </Pagination>
        </div>
      </Container>
    </>
  );
}

export default GroupList;
