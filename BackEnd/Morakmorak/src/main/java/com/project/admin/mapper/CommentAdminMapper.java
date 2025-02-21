package com.project.admin.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.project.admin.model.CommentAdmin;

@Mapper
public interface CommentAdminMapper {
	List<CommentAdmin> getComments();
    void toggleBlind(Long no);
    void toggleBlindYN(Long no);
}
