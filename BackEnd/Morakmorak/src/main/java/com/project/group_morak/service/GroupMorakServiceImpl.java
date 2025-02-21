package com.project.group_morak.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.group_morak.mapper.GroupMorakMapper;
import com.project.group_morak.model.GroupMorak;
import com.project.mypage.mapper.MypageMapper;
import com.project.mypage.model.Notification;

@Service
public class GroupMorakServiceImpl implements GroupMorakService {
	@Autowired
	private GroupMorakMapper mapper;
	@Autowired
	private MypageMapper mypageMapper;
	
	@Override
	public void insert(Map<String, Object> map) throws Exception {
		mapper.insert(map);
	}

	@Override
	public void insertLeader(Map<String, Object> map) {
		mapper.insertLeader(map);
	}

	@Override
	public List<Map<String, Object>> list(String type) throws Exception {
		return mapper.list(type);
	}

	@Override
	public Map<String, Object> read(String groupNo) {
		return mapper.read(groupNo);
	}

	@Override
	public void update(Map<String, Object> map) {
		mapper.update(map);
	}

	@Override
	public void join(Map<String, Object> map) {
		Notification notification = new Notification();
        int no = (int) map.get("no");
        int groupNo = (int) map.get("group_no");
        String groupName = mypageMapper.selectGroupNameFromGroup(groupNo);
        String nickname = mypageMapper.selectNickNameByNo(no);
        int myNo = mypageMapper.selectNoFromGroup(groupNo);
        notification.setNo(myNo);
        notification.setContent(nickname+"님이 "+groupName+"모임에 신청했습니다");
        mypageMapper.insertNotification(notification);
		mapper.join(map);
	}
	
	@Override
	public void cancelJoin(Map<String, Object> map) {
		mapper.cancelJoin(map);
	}

	public void changeMoney(Map<String, Object> map) {
		mapper.changeMoney(map);
	}
	
	@Override
	public void refundMoney(Map<String, Object> map) {
		mapper.refundMoney(map);
	}

	@Override
	public void insertBasket(Map<String, Object> map) {
		mapper.insertBasket(map);
	}

	@Override
	public List<Map<String, Object>> memberList(String groupNo) {
		return mapper.memberList(groupNo);
	}

	@Override
	public String groupAuth(Map<String, Object> map) {
		return mapper.groupAuth(map);
	}

	@Override
	public void memberStatusUpdate(Map<String, Object> map) {
		Notification notification = new Notification();
        int no = (int) map.get("no");
        int groupNo = (int) map.get("group_no");
        String groupName = mypageMapper.selectGroupNameFromGroup(groupNo);
        String status = (String) map.get("status");
        if(status.equals("MEMBER")) {
        	status = "수락";
        }else if(status.equals("REJECT")) {
        	status = "거절";
        }
        notification.setNo(no);
        notification.setContent("가입 신청한 "+groupName+" 모임에서 "+status+"되었습니다.");
        mypageMapper.insertNotification(notification);
		mapper.memberStatusUpdate(map);
	}

	@Override
	public void memberReport(Map<String, Object> map) {
		mapper.memberReport(map);
	}

	@Override
	public Map<String, Object> countGroupMember(String groupNo) {
		return mapper.countGroupMember(groupNo);
	}
  
	@Override
	public List<GroupMorak> getGroupsByCategory(String category) {
		if(category.equals("all")) {
			return mapper.getGroupsByCategoryAll();
		}
		return mapper.getGroupsByCategory(category);
	}
	
	@Override
	public List<GroupMorak> getGroupsByCategory3(String category) {
		if(category.equals("all")) {
			return mapper.getGroupsByCategoryAll3();
		}
		return mapper.getGroupsByCategory3(category);
	}

	@Override
	public void memberCount(Map<String, Object> map) {
		mapper.memberCount(map);
	}

	@Override
	public void memberCountCancel(Map<String, Object> map) {
		mapper.memberCountCancel(map);
	}

	@Override
	public String checkStartDate(String groupNo) {
		return mapper.checkStartDate(groupNo);
	}

}
