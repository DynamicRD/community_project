import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import './LoginPage.css';
import { Link, useNavigate } from 'react-router-dom'; // Link 컴포넌트를 추가합니다.

export default function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async () => {
    console.log('ID:', id, 'Password:', password, 'Remember Me:', rememberMe);

    try {
      const response = await axios.post(
        'http://localhost:8080/member/login',
        {
          id: id, // 백엔드에서 요구하는 필드명 사용
          pw: password, // 백엔드에 맞춰 필드명 변경
        },
        {
          withCredentials: true, // 쿠키 전송 허용
        }
      );

      // 로그인 성공
      if (response.data.success) {
        console.log('로그인 성공');

        // JSON 응답에서 액세스 토큰이 포함되어 있다면 저장
        if (response.data.accessToken) {
          localStorage.setItem('jwtToken', response.data.accessToken);
        }

        // Remember Me 체크 시 로컬 스토리지 저장
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        } else {
          localStorage.removeItem('rememberMe');
        }

        // 페이지 이동 후 새로고침
        navigate('/');
        setTimeout(() => {
          window.location.reload();
        }, 100); // 100ms 후 새로고침 (navigate 적용 후 실행되도록 설정)
      } else {
        alert(response.data.message || '로그인에 실패했습니다.');
      }
    } catch (error) {
      console.error('로그인 실패', error);
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // 기본 Enter 동작(폼 제출) 방지
      handleLogin(); // 로그인 함수 실행
    }
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
          height: '80vh',
        }}
      >
        <div
          style={{
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            width: '400px',
          }}
          className="LoginBg"
        >
          <h2
            style={{ textAlign: 'center', fontWeight: '900' }}
            className="mt-3 mb-4"
          >
            회원 로그인
          </h2>
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
            onKeyDown={handleKeyDown} // 추가
          />

          <input
            type="password"
            placeholder="비밀번호를 입력하시오"
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '20px',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown} // 추가
          />
          <button
            className="buttonLogin"
            onClick={handleLogin} // ✅ 올바르게 수정
            style={{
              width: '100%',
              padding: '10px',
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
              <Link to="/find-id" style={{ textDecoration: 'none' }}>
                <span className="findId">아이디 찾기</span>
              </Link>
              <br />
              비밀번호를 잊어버리셨나요?{' '}
              <Link to="/find-password" style={{ textDecoration: 'none' }}>
                <span className="findId">비밀번호 찾기</span>
              </Link>
              <br />
              아직 회원이 아니신가요?{' '}
              <Link to="/signup" style={{ textDecoration: 'none' }}>
                <span className="findId">회원가입</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
