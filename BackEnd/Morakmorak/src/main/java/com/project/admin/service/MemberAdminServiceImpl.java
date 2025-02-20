package com.project.admin.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.project.admin.mapper.MemberAdminMapper;

@Service
public class MemberAdminServiceImpl implements MemberAdminService {

	private final MemberAdminMapper memberAdminMapper;

	    public MemberAdminServiceImpl(MemberAdminMapper memberAdminMapper) {
	        this.memberAdminMapper = memberAdminMapper;
	    }

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
	        return memberAdminMapper.approveGroup(groupNo) > 0;
	    }
	    
	    @Override
	    public boolean rejectGroup(int groupNo) {
	        return memberAdminMapper.rejectGroup(groupNo) > 0;
	    }
}
