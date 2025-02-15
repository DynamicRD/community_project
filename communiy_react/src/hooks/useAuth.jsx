import { useState, useEffect } from 'react';
import axios from 'axios';

const checkTokenExistence = async () => {
  try {
    const response = await axios.get(
      'http://localhost:8080/member/check_tokens',
      {
        withCredentials: true,
      }
    );
    return response.data; // { accessTokenExists: true, refreshTokenExists: true }
  } catch (error) {
    console.error('쿠키 확인 중 오류 발생:', error);
    return { accessTokenExists: false, refreshTokenExists: false };
  }
};

const checkAndRefreshToken = async () => {
  try {
    await axios.get('/member/check_refresh', { withCredentials: true });
    return true;
  } catch (error) {
    console.error('토큰 확인 중 오류 발생:', error);
    return false;
  }
};

const getData = async () => {
  try {
    const response = await axios.get('http://localhost:8080/member/getdata', {
      withCredentials: true,
    });
    return response.data.member;
  } catch (error) {
    console.error('사용자 데이터 가져오기 실패:', error);
    return null;
  }
};

// ✅ 권한 체크 및 유저 데이터 관리하는 커스텀 훅 생성
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchAuthData = async () => {
      try {
        const { accessTokenExists, refreshTokenExists } =
          await checkTokenExistence();

        if (accessTokenExists) {
          setIsAuthenticated(true);
        } else if (refreshTokenExists) {
          await checkAndRefreshToken();
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('토큰 확인 중 오류 발생:', error);
      }
    };

    fetchAuthData();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchUserData = async () => {
        const user = await getData();
        if (user) {
          setUserData(user);
        }
      };
      fetchUserData();
    }
  }, [isAuthenticated]);

  return { isAuthenticated, userData };
};

export default useAuth;
