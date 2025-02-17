package com.project.admin.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.project.admin.model.ReviewAdmin;

@Mapper
public interface ReviewAdminMapper {
	List<ReviewAdmin> getReviews();
    ReviewAdmin getReviewById(Long id);
    void addReview(ReviewAdmin review);
    void updateReview(ReviewAdmin review);
    void deleteReview(Long id);
    void toggleBlind(Long id);
}
