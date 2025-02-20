import { Container } from 'react-bootstrap';
import './GroupDetail.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import GroupDetailItem from './component/GroupDetailItem';
import GroupDetailButton from './component/GroupDetailButton';

function GroupDetail() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const group_no = queryParams.get('group_no') || ''; // group_no가 없으면 빈 문자열 반환
  const group_nos = group_no ? group_no.split(',') : [];

  const [items, setGroupDetail] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    if (group_nos.length === 0) {
      setLoading(false);
      return;
    }

    setLoading(true); // 데이터 요청 시작
    Promise.all(
      group_nos.map((id) =>
        fetch(`http://localhost:8080/group/detail?group_no=${id}`).then(
          async (res) => {
            if (!res.ok) {
              throw new Error(`HTTP 오류! 상태 코드: ${res.status}`);
            }
            const text = await res.text();
            return text ? JSON.parse(text) : {};
          }
        )
      )
    )
      .then((dataArray) => {
        setGroupDetail(dataArray.flat()); // 배열 평탄화
      })
      .catch((error) => console.error('데이터 로딩 오류:', error))
      .finally(() => setLoading(false)); // 로딩 완료
  }, [group_no]);

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <Container>
      {items.length > 0 ? (
        items.map((item) => <GroupDetailItem key={item.GROUP_NO} item={item} />)
      ) : (
        <div>그룹 정보를 찾을 수 없습니다.</div>
      )}
      <GroupDetailButton group_no={group_no} />
    </Container>
  );
}

export default GroupDetail;
