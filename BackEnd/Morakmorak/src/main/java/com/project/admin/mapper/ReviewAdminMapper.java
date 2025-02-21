package com.project.admin.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.project.admin.model.ReviewAdmin;

@Mapper
public interface ReviewAdminMapper {
	List<ReviewAdmin> getReviews();
    void toggleBlind(Long no);
    void toggleBlindYN(Long no);
}
