package com.project.admin.service;

import java.util.List;

import com.project.admin.model.CommentAdmin;

public interface CommentAdminService {
	List<CommentAdmin> getComments();
    void addComment(CommentAdmin comment);
    void deleteComment(Long no);
    void toggleBlind(Long no);
	
}
