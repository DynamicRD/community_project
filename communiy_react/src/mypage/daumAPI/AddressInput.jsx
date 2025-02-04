/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';

export default function AddressInput({ onComplete }) {
  const [zonecode, setZonecode] = useState(''); // 우편번호
  const [address, setAddress] = useState(''); // 기본 주소
  const [isOpen, setIsOpen] = useState(true); // 팝업 열림 여부

  const themeObj = {
    bgColor: '#FFFFFF',
    pageBgColor: '#FFFFFF',
    postcodeTextColor: '#C05850',
    emphTextColor: '#222222',
  };

  const postCodeStyle = {
    width: '360px',
    height: '480px',
  };

  const completeHandler = (data) => {
    const { address, zonecode } = data;
    setZonecode(zonecode);
    setAddress(address);
    console.log(zonecode);
    // 부모 컴포넌트로 우편번호와 주소를 전달
    onComplete(zonecode, address);
    console.log(zonecode);
    // 주소가 선택된 후 팝업을 닫음
    window.close(); // 팝업 창을 닫음
    console.log(zonecode);
  };

  const closeHandler = (state) => {
    if (state === 'FORCE_CLOSE' || state === 'COMPLETE_CLOSE') {
      setIsOpen(false);
    }
  };

  return (
    <div>
      {isOpen && (
        <div>
          <DaumPostcode
            theme={themeObj}
            style={postCodeStyle}
            onComplete={completeHandler}
            onClose={closeHandler}
          />
        </div>
      )}
    </div>
  );
}
