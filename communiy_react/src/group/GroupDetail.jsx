import { Container } from 'react-bootstrap';
import './GroupDetail.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import GroupDetailItem from './component/GroupDetailItem';
import GroupDetailButton from './component/GroupDetailButton';

function GroupDetail() {
  const location = useLocation();

  // URL에서 쿼리 파라미터를 파싱
  const queryParams = new URLSearchParams(location.search);
  const group_no = queryParams.get('group_no'); // 파라미터 값을 가져옴
  const [items, setGroupDetail] = useState([]);

  useEffect(() => {
    const group_nos = group_no.split(','); // 쉼표로 구분된 문자열이라고 가정
    Promise.all(
      group_nos.map((id) =>
        fetch(`http://localhost:8080/group/detail?group_no=${id}`).then((res) =>
          res.json()
        )
      )
    ).then((dataArray) => {
      setGroupDetail(dataArray);
    });
  }, [group_no]);

  let loading = false;
  if (loading) {
    return <div>loading</div>;
  } else {
    return (
      <Container>
        {items.map((item) => (
          <GroupDetailItem key={item.GROUP_NO} item={item} />
        ))}
        <GroupDetailButton group_no={group_no} />
      </Container>
    );
  }
}

export default GroupDetail;
