import React from 'react';
import { Link } from 'react-router';

export default function GroupItem({item}) {
  let loading = false;
  if (loading) {
    return <div>loading</div>;
  } else {
    return (
      <Link to={`/group/detail?g_id=${item.G_ID}`} style={{ textDecoration: 'none', color: 'inherit' }}> 
        <div className="col">
          <div className="card h-100">
            <img src={item.IMG_URL} className="card-img-top img-fluid" 
              style={{height:"264.83px", width:"394px"}} alt="..." />
            <div className="card-body">
              <h5 className="card-title">{item.G_TITLE}</h5>
              <p className="card-text">{item.COMMENT1}</p>
              <p className="card-text">카테고리 {item.CATEGORY}</p>
              <p className="card-text">{item.AREA}</p>
              <p className="card-text">시작일 {item.START_DATE}</p>
              <p className="card-text">정원 {item.USER_MAX}</p>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}