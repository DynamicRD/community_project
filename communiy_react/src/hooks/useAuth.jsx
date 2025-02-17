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
    await axios.get('http://localhost:8080/member/refresh_check', {
      withCredentials: true, // 반드시 추가
    });
    console.log('액세스 토큰 재발급');
    return true;
  } catch (error) {
    console.error('토큰 확인 중 오류 발생:', error);
    return false;
  }
};

const getData = async () => {
  try {
    console.log('실행');
    const response = await axios.get('http://localhost:8080/member/getdata', {
      withCredentials: true,
    });
    console.log('서버 응답:', response.data);
    return response.data.member;
  } catch (error) {
    if (error.response?.status === 401) {
      console.warn('인증되지 않은 사용자 - 사용자 데이터 요청을 중단합니다.');
    } else {
      console.error('사용자 데이터 가져오기 실패:', error);
    }
    return null;
  }
};

// ✅ 권한 체크 및 유저 데이터 관리하는 커스텀 훅 생성
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const fetchAuthData = async () => {
      try {
        const { accessTokenExists, refreshTokenExists } =
          await checkTokenExistence();
        console.log(
          '토큰 존재여부 확인' + accessTokenExists + refreshTokenExists
        );
        if (accessTokenExists) {
          setIsAuthenticated(true);
        } else if (refreshTokenExists) {
          console.log('리프레시 토큰만 존재합니다');
          await checkAndRefreshToken();
          setIsAuthenticated(true);
        } else {
          console.log('토큰 둘다 없습니다');
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('토큰 확인 중 오류 발생:', error);
        setIsAuthenticated(false); // 오류가 발생하면 인증 상태 false로 설정
      } finally {
        setIsLoading(false); // 로딩 상태 끝내기
      }
    };

    fetchAuthData();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!isAuthenticated) return; // 인증되지 않으면 요청 실행 X

      const user = await getData();
      if (user) {
        setUserData(user);
      }
    };

    if (!isLoading) {
      // 로딩 상태가 끝나면 유저 데이터를 가져오도록 설정
      fetchUserData();
    }
  }, [isAuthenticated, isLoading]); // isAuthenticated와 isLoading에 의존성 추가

  return { isAuthenticated, userData, isLoading };
};

export default useAuth;
