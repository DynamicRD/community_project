package com.project.admin.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.admin.mapper.MemberAdminMapper;
import com.project.mypage.mapper.MypageMapper;
import com.project.mypage.model.Notification;

@Service
public class MemberAdminServiceImpl implements MemberAdminService {

    @Autowired
    private MemberAdminMapper memberAdminMapper;
    
    @Autowired
    private MypageMapper mypageMapper;

    @Override
    public List<Map<String, Object>> getUsers() {
        return memberAdminMapper.getUsers();
    }

    @Override
    public List<Map<String, Object>> getAllGroups() {
        return memberAdminMapper.getAllGroups();
    }

    @Override
    public boolean approveGroup(int groupNo) {
        return processGroupApproval(groupNo, true);
    }

    @Override
    public boolean rejectGroup(int groupNo) {
        return processGroupApproval(groupNo, false);
    }

    private boolean processGroupApproval(int groupNo, boolean isApproved) {
    	System.out.println("노티피케이션");
        Notification notification = new Notification();
        int no = mypageMapper.selectNoFromGroup(groupNo);
        String groupName = mypageMapper.selectGroupNameFromGroup(groupNo);
        notification.setNo(no);
        
        if (isApproved) {
            notification.setContent("개설 신청한 " + groupName + " 모임이 승인되었습니다.");
            mypageMapper.insertNotification(notification);
            return memberAdminMapper.approveGroup(groupNo) > 0;
        } else {
            notification.setContent("개설 신청한 " + groupName + " 모임이 거절되었습니다.");
            mypageMapper.insertNotification(notification);
            return memberAdminMapper.rejectGroup(groupNo) > 0;
        }
    }

    @Override
    public List<Map<String, Object>> getProfit() {
        return memberAdminMapper.getProfit();
    }

    @Override
    public List<Map<String, Object>> genderCount() {
        return memberAdminMapper.genderCount();
    }

    @Override
    public List<Map<String, Object>> countVisitGroup() {
        return memberAdminMapper.countVisitGroup();
    }

    @Override
    public List<Map<String, Object>> countAge() {
        return memberAdminMapper.countAge();
    }

    @Override
    public List<Map<String, Object>> selectPopularCategory() {
        return memberAdminMapper.selectPopularCategory();
    }

    @Override
    public List<Map<String, Object>> getCommunityDetail(int groupNo) {
        return memberAdminMapper.getAllGroupsDetail(groupNo);
    }

    @Override
    public List<Map<String, Object>> selectPopularGroup() {
        return memberAdminMapper.selectPopularGroup();
    }
}
