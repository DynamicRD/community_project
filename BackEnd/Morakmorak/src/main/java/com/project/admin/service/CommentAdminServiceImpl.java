package com.project.admin.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.admin.mapper.CommentAdminMapper;
import com.project.admin.model.CommentAdmin;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentAdminServiceImpl implements CommentAdminService {
	private final CommentAdminMapper commentMapper;

    @Override
    public List<CommentAdmin> getComments() {
        return commentMapper.getComments();
    }
    @Override
    public void toggleBlind(Long no) {
        commentMapper.toggleBlind(no);
    }
	@Override
	public void toggleBlindYN(Long no) {
		commentMapper.toggleBlindYN(no);
		
	}

}
