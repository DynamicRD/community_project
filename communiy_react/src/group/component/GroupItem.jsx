import React from 'react';
import { Link } from 'react-router';

export default function GroupItem({ g_id, g_title, comment1, img_url, start_date, category, area }) {
  let loading = false;
  if (loading) {
    return <div>loading</div>;
  } else {
    return (
      <Link to={`/group/detail?g_id=${g_id}`}style={{ textDecoration: 'none', color: 'inherit' }}> 
      <div className="col">
        <div className="card h-100">
          <img src={img_url} className="card-img-top img-fluid" 
          style={{height:"264.83px", width:"394px"}} alt="..." />
          <div className="card-body">
            <h5 className="card-title">모임제목{g_title}</h5>
            <p className="card-text">모임소개{comment1}</p>
            <p className="card-text">카테고리{category}</p>
            <p className="card-text">지역{area}</p>
            <p className="card-text">시작일{start_date}</p>
          </div>
        </div>
      </div>
      </Link>
    );
  }
}
