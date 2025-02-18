package com.project.admin.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.admin.mapper.MemberAdminMapper;

@Service
public class MemberAdminServiceImpl implements MemberAdminService {

	private final MemberAdminMapper memberAdminMapper;
		@Autowired
	    public MemberAdminServiceImpl(MemberAdminMapper memberAdminMapper) {
	        this.memberAdminMapper = memberAdminMapper;
	    }

	    @Override
	    public List<Map<String, Object>> getUsers() {
	        return memberAdminMapper.getUsers();
	    }
}
