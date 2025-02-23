package com.project.admin.service;

import java.util.List;

import com.project.admin.model.CommentAdmin;

public interface CommentAdminService {
	List<CommentAdmin> getComments();
    void toggleBlind(Long no);
    void toggleBlindYN(Long no);
	
}
