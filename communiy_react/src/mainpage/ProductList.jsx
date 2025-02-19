import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';
import './App.css';

const GroupsList = () => {
  const categories = [
    { key: 'all', name: '전체' },
    { key: 'culture', name: '문화/예술' },
    { key: 'food', name: '푸드/드링크' },
    { key: 'hobby', name: '취미' },
    { key: 'travel', name: '여행' },
    { key: 'edu', name: '교육' },
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchGroups(selectedCategory);
  }, [selectedCategory]);

  const fetchGroups = async (category) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/group/mainselect?category=${category}&limit=6`
      );
      setGroups(response.data);
    } catch (error) {
      console.error('데이터를 불러오는 중 오류 발생:', error);
      setGroups([]);
    }
    setLoading(false);
  };

  return (
    <>
      {/* 카테고리 버튼 */}
      <section className="theme-category text-center my-3">
        {categories.map((category) => (
          <button
            key={category.key}
            className={`btn btn-outline-primary mx-2 ${
              selectedCategory === category.key ? 'active' : ''
            }`}
            onClick={() => setSelectedCategory(category.key)}
          >
            {category.name}
          </button>
        ))}
      </section>

      {/* 모임 목록 */}
      <section className="container my-5">
        <h2 className="h4">인기순</h2>
        {loading ? (
          <p>로딩 중...</p>
        ) : groups.length === 0 ? (
          <p>해당 카테고리의 모임은 개설되지 않았습니다.</p>
        ) : (
          <div className="row">
            {groups.map((group, index) => (
              <div key={index} className="col-6 col-md-2 mb-4">
                <Link
                  to={`/group/detail?group=${group.id}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div className="card">
                    <img
                      src={`http://localhost:8080/upload/${group.image}`}
                      className="card-img-top img-fluid p-3"
                      style={{ height: '180px', objectFit: 'cover' }}
                      alt={group.gTitle}
                    />
                    <div className="card-body text-center">
                      <h6 className="card-title">
                        <strong>{group.gTitle}</strong>
                      </h6>
                      <p className="card-text">
                        {group.startDate} / {group.area}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* 화살표 아이콘 */}
        <div className="d-flex justify-content-end">
          <i className="arrow1 bi bi-arrow-right-circle fs-2"></i>
        </div>
      </section>
    </>
  );
};

export default GroupsList;
