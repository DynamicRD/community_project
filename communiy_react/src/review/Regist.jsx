import React, { useState, useRef, useContext, useEffect } from 'react';
import { Button, Container, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Regist.css';
import HorizonLine from './HorizonLine';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; //
import { FaRegStar } from 'react-icons/fa';

//그룹 명단 가져오는 함수
function useFetch(url) {
  const [completedMeetings, setCompletedMeetings] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCompletedMeetings(data);
        console.log('completedMeetings = ', data);
      })
      .catch((error) => {
        console.error('Error fetching review data:', error);
      })
      .finally(() => {
        setLoading(true);
      });
  }, []);
  return [completedMeetings, loading];
}

export default function Regist() {
  const paths = window.location.href.split('/');
  const url =
    'http://localhost:8080/review/' +
    paths[paths.length - 2] +
    '/' +
    paths[paths.length - 1];

  const [completedMeetings, loading] = useFetch(url);

  const { isAuthenticated, userData } = useContext(AuthContext);
  const navigate = useNavigate();
  const content = useRef();
  const title = useRef();
  const ratingRef = useRef();

  //파일이름 설정
  //이미지 파일 url경로 설정
  const [image, setImage] = useState(null);
  const loadImg = (event) => {
    setImage(event.target.files[0]);
  };

  const uploadImage = async () => {
    if (!image) {
      alert('이미지를 선택하세요.');
      return;
    }

    const formData = new FormData();
    //위에과정에서 지정한 image경로를 해당 백앤드에 전달

    formData.append('image', image);
    formData.append('groupNo', completedMeetings.GROUP_NO);
    formData.append('userNo', userData?.no);
    formData.append('title', title.current.value);
    formData.append('content', content.current.value);
    formData.append('star', ratingRef.current.value); // 예시로 5점

    try {
      const response = await axios.post(
        'http://localhost:8080/review/insert',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('업로드 성공:', response.data);
      // navigate('/review');
    } catch (error) {
      console.error('업로드 실패:', error);
    }
  };

  if (!loading) {
    return <Container>Loading...</Container>;
  } else {
    return (
      <Container>
        {isAuthenticated !== true ? (
          <>
            {alert('로그인 후 이용 바랍니다')}
            {navigate('/login')};
          </>
        ) : (
          <>
            <div className="review_register">
              <div className="board">
                <div className="review_title">
                  <p style={{ fontSize: '25px' }}>
                    <b>리뷰 작성하기</b>
                    <div>
                      <span className="meetingsName">
                        {completedMeetings.GROUP_TITLE}
                      </span>
                    </div>
                  </p>
                </div>
                <HorizonLine />
                <div className="register_title">
                  <div className="board">
                    <p style={{ fontSize: '20px' }}>
                      <input
                        type="text"
                        className="review_input_title mt-4"
                        placeholder="제목"
                        ref={title}
                      />
                    </p>
                    <div className="writer mb-3">
                      <span>{userData?.nickname}</span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div>
                      <select
                        name="rating"
                        id="review_rating"
                        ref={ratingRef}
                        defaultValue={5}
                      >
                        <option value="1">★☆☆☆☆</option>
                        <option value="2">★★☆☆☆</option>
                        <option value="3">★★★☆☆</option>
                        <option value="4">★★★★☆</option>
                        <option value="5">★★★★★</option>
                      </select>
                    </div>
                  </div>
                  <div className="register_body">
                    <div className="mb-2 mt-2">
                      <label htmlFor="content" className="mb-3">
                        <textarea
                          className="form-control content"
                          cols="200"
                          rows="10"
                          id="review_content"
                          name="text"
                          placeholder="내용작성"
                          ref={content}
                        ></textarea>
                      </label>
                    </div>
                    <div className="d-flex  justify-content-between align-items-center">
                      <div className="review_register_button  mb-3">
                        <input
                          type="file"
                          className="file"
                          onChange={(e) => loadImg(e)}
                        />
                      </div>
                      <div>
                        <Button
                          className="review_register_btn ms-3 justify-content-end me-2"
                          onClick={() => {
                            uploadImage();
                          }}
                        >
                          작성
                        </Button>
                        <Button
                          className="review_register_btn"
                          onClick={() => {
                            navigate('/review');
                          }}
                        >
                          목록
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Container>
    );
  }
}
