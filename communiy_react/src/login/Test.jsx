import React, { useEffect, useState } from 'react';

export default function Test() {
  const [tokenData, setTokenData] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const accessToken = queryParams.get('access_token');
    const idToken = queryParams.get('id');

    if (accessToken && idToken) {
      setTokenData({ access_token: accessToken, id: idToken });
    }
  }, []); // 컴포넌트가 처음 렌더링될 때 실행

  return (
    <div>
      <h1>Test Page</h1>
      {tokenData ? (
        <div>
          <p>Access Token: {tokenData.access_token}</p>
          <p>ID Token: {tokenData.id}</p>
        </div>
      ) : (
        <p>No token data received</p>
      )}
    </div>
  );
}
