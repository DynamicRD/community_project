import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Link 컴포넌트를 추가합니다.

export default function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    console.log('ID:', id, 'Password:', password, 'Remember Me:', rememberMe);
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
            <Link to="/find-id" style={{ color: 'blue' }}>
              <img
                src="/images/google.png"
                alt="Google Login"
                style={{ width: '50px', marginRight: '20px' }}
              />
            </Link>
            <Link to="/find-id" style={{ color: 'blue' }}>
              <img
                src="/images/kakao.png"
                alt="Kakao Login"
                style={{ width: '50px' }}
              />
            </Link>
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
