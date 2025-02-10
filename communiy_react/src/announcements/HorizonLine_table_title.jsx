import React from 'react';

const HorizonLine_table_title = ({ text }) => {
  return (
    <div
      style={{
        width: '100%',
        textAlign: 'center',
        borderBottom: '1px solid #aaa',
        lineHeight: '0.1em',
        margin: '0px 0px 20px 0px',
      }}
    >
      <span
        style={{
          background: '#f0f6f0',
          padding: '0 10px',
          color: 'rgba(0, 0, 0, 0.2)',
        }}
      >
        {text}
      </span>
    </div>
  );
};

export default HorizonLine_table_title;
