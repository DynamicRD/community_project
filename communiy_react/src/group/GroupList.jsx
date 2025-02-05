import React, { useState } from 'react';
import './GroupList.css';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import GroupItem from './GroupItem';

function GroupList({groupList}) {
  const [open, setOpen] = useState(false);
  const [items, setGroupList] = useState([]);

  return (
    <Container>
      <div className="group_list">
        <h1 className="p-2">정기모임 전체 보기</h1>
        <div className="filter m-2">
          <Button
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
          >
            Filter
          </Button>
          <Collapse in={open} className='mt-2'>
            <div id="example-collapse-text">
              <h5>카테고리</h5>
              <input type="checkbox" value="culture_art" name="category" />
              &nbsp;문화/예술
              <input type="checkbox" value="food_drink" name="category" />
              &nbsp;푸드/드링크
              <input type="checkbox" value="hobby" name="category" />
              &nbsp;취미
              <input type="checkbox" value="education" name="category" />
              교육
              <h5>지역</h5>
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
          </Collapse>
          
        </div>
        <div className="d-flex justify-content-between">
          <div>
            <form>
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                className="m-2"
              />
              <button className="btn btn-primary">search</button>
            </form>
          </div>
          <select>
            <option value="latest">최신 등록 순</option>
            <option value="grade">별점 순</option>
          </select>
        </div>
        <hr />
        <div>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {items.map(({groupList})=>{
              <GroupItem
                g_title={groupList.g_title}
                comment1={groupList.comment1}
                start_date={groupList.start_date}
                />
            })}
            <div className="col">
              <div className="card">
                <img src="..." className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{groupList[1].g_title}</h5>
                  <p className="card-text">
                  {groupList[1].comment1}
                  </p>
                </div>
              </div>
            </div>
            {/*
            <div className="col">
              <div className="card">
                <img src="..." className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">모임제목</h5>
                  <p className="card-text">
                    This is a longer card with supporting text below as a
                    natural lead-in to additional content.
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <img src="..." className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">모임제목</h5>
                  <p className="card-text">
                    This is a longer card with supporting text below as a
                    natural lead-in to additional content. This content is a
                    little bit longer.
                  </p>
                </div>
              </div>
            </div> */}
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
  );
}

export default GroupList;
