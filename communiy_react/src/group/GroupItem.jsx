import React from 'react';

export default function GroupItem({ g_title, comment1 }) {
  let loading = false;
  if (loading) {
    return <div>loading</div>;
  } else {
    return (
      <div className="col">
        <div className="card">
          <img src="..." className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{g_title}</h5>
            <p className="card-text">{comment1}</p>
          </div>
        </div>
      </div>
    );
  }
}
