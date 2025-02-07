import { useState } from 'react';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Link 컴포넌트를 추가합니다.

export default function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    console.log('ID:', id, 'Password:', password, 'Remember Me:', rememberMe);
  };

  useEffect(() => {
    // 팝업에서 데이터를 받을 리스너 설정
    const handleMessage = (event) => {
      if (event.origin !== window.location.origin) return; // 보안: 올바른 출처 확인

      const tokenData = event.data;
      if (tokenData && tokenData.code) {
        // 로그인 코드나 토큰을 받은 후 처리
        console.log('Received token data: ', tokenData.code);
        // 예: API 호출로 액세스 토큰을 가져오고 상태 업데이트
      }
    };

    window.addEventListener('message', handleMessage);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);
  const doKakaoLogin = () => {
    const kakaoRestApiKey = import.meta.env.VITE_KAKAO_REST_API_KEY;
    const kakaoRedirectUrl = import.meta.env.VITE_KAKAO_REDIRECT_URL;

    console.log(kakaoRestApiKey);
    console.log(kakaoRedirectUrl);

    const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoRestApiKey}&redirect_uri=${kakaoRedirectUrl}&response_type=code`;

    window.open(kakaoUrl, 'kakao-login', 'width=600,height=600');
  };
  const doGoogleLogin = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const clientPass = import.meta.env.VITE_GOOGLE_CLIENT_PASS;
    const redirectUrl = import.meta.env.VITE_GOOGLE_REDIRECT_URL;

    console.log(clientId);
    console.log(redirectUrl);

    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=code&scope=openid%20profile%20email`;
    //refresh 토큰 발급은 &access_type=offline&prompt=consent추가

    // 팝업 창 띄우기
    window.open(url, 'google-login', 'width=600,height=600');
  };

  return (
    <Container>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            width: '400px',
          }}
        >
          <h2 style={{ textAlign: 'center' }}>회원 로그인</h2>
          <input
            type="text"
            placeholder="아이디를 입력하시오"
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <input
            type="password"
            placeholder="비밀번호를 입력하시오"
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#01ff23d1',
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              cursor: 'pointer',
            }}
          >
            로그인
          </button>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '10px',
            }}
          >
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              style={{ marginRight: '5px' }}
            />
            <span>로그인 상태 유지</span>
          </div>
          <p style={{ textAlign: 'center', marginTop: '10px' }}>
            --소셜 계정으로 간단하게 로그인하세요--
          </p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '10px',
            }}
          >
            <img
              src="/images/google.png"
              alt="Google Login"
              style={{ width: '50px', marginRight: '20px' }}
              onClick={doGoogleLogin}
            />

            <img
              src="/images/kakao.png"
              alt="Kakao Login"
              style={{ width: '50px' }}
              onClick={doKakaoLogin}
            />
          </div>
          <div
            style={{ textAlign: 'center', marginTop: '15px', fontSize: '14px' }}
          >
            <p>
              아이디를 잊어버리셨나요?{' '}
              <Link to="/find-id" style={{ color: 'blue' }}>
                아이디 찾기
              </Link>
              <br />
              비밀번호를 잊어버리셨나요?{' '}
              <Link to="/find-password" style={{ color: 'blue' }}>
                비밀번호 찾기
              </Link>
              <br />
              아직 회원이 아니신가요?{' '}
              <Link to="/signup" style={{ color: 'blue' }}>
                회원가입
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
