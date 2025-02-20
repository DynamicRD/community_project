package com.project.admin.service;

import java.util.List;

import com.project.admin.model.ReviewAdmin;

public interface ReviewAdminService {
	List<ReviewAdmin> getReviews();
    ReviewAdmin getReviewById(Long id);
    void addReview(ReviewAdmin review);
    void updateReview(ReviewAdmin review);
    void deleteReview(Long id);
    void toggleBlind(Long id);

}
