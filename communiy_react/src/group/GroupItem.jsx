import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router';

export default function GroupItem({ g_id, g_title, comment1, img_url }) {
  let loading = false;
  if (loading) {
    return <div>loading</div>;
  } else {
    return (
      <Link to={`/group/detail?g_id=${g_id}`}style={{ textDecoration: 'none', color: 'inherit' }}> 
      <div className="col">
        <div className="card h-100">
          <img src={img_url} className="card-img-top h-100" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{g_title}</h5>
            <p className="card-text">{comment1}</p>
          </div>
        </div>
      </div>
      </Link>
    );
  }
}
