import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const KakaoCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');

    if (code) {
      fetch('http://localhost:8080/member/kakao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessToken: code }),
        credentials: 'include',
      })
        .then(() => navigate('/')) // 로그인 성공 후 이동할 페이지
        .catch(console.error);
    }
  }, []);

  return <div>Logging in...</div>;
};

export default KakaoCallback;
