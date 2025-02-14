import {
  Button,
  Container,
  Form,
  ListGroup,
  Modal,
  Nav,
  Image,
} from 'react-bootstrap';
import './GroupDetail.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar,
  faComments,
  faHeart,
  faList,
  faLocationDot,
  faSackDollar,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import GoogleMap from './component/GoogleMap';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ChatRoom from '../chatroom/Chatroom';
import GroupJoinForm from './component/GroupJoinForm';
import MemberProfileView from './component/MemberProfileView';
import GroupItem from './GroupItem';
import GroupDetailItem from './component/GroupDetailItem';
import GroupDetailButton from './component/GroupDetailButton';

function GroupDetail({ reviewData }) {
  const location = useLocation();

  // URL에서 쿼리 파라미터를 파싱
  const queryParams = new URLSearchParams(location.search);
  const g_id = queryParams.get('g_id'); // 'g_id' 파라미터 값을 가져옴
  const [items, setGroupDetail] = useState([]);

  useEffect(() => {
    const g_ids = g_id.split(','); // g_id가 쉼표로 구분된 문자열이라고 가정
    Promise.all(
      g_ids.map(id =>
        fetch(`http://localhost:8080/group/detail?g_id=${id}`).then(res => res.json())
      )
    ).then(dataArray => {
      setGroupDetail(dataArray);
    });
  }, [g_id]);

  let loading = false;
  if (loading) {
    return <div>loading</div>;
  } else {
    return (
      <Container>
        {items.map((item) => (
          <GroupDetailItem key={item.G_ID} item={item} />
        ))}
        <GroupDetailButton g_id={g_id} />
      </Container>
    );
  }
}

export default GroupDetail;