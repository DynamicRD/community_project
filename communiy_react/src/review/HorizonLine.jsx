import React from 'react';

const HorizonLine = ({ text }) => {
  return (
    <div
      style={{
        width: '99%',
        textAlign: 'center',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        lineHeight: '0.1em',
        margin: '10px',
      }}
    >
      <span style={{ background: '#fff' }}></span>
    </div>
  );
};

export default HorizonLine;
