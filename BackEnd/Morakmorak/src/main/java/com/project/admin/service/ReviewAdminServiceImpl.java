package com.project.admin.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.admin.mapper.ReviewAdminMapper;
import com.project.admin.model.ReviewAdmin;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewAdminServiceImpl implements ReviewAdminService {
	private final ReviewAdminMapper reviewMapper;
	 @Override
	    public List<ReviewAdmin> getReviews() {
	        return reviewMapper.getReviews();
	    }

	    @Override
	    public ReviewAdmin getReviewById(Long id) {
	        return reviewMapper.getReviewById(id);
	    }

	    @Override
	    public void addReview(ReviewAdmin review) {
	        reviewMapper.addReview(review);
	    }

	    @Override
	    public void updateReview(ReviewAdmin review) {
	        reviewMapper.updateReview(review);
	    }

	    @Override
	    public void deleteReview(Long id) {
	        reviewMapper.deleteReview(id);
	    }

	    @Override
	    public void toggleBlind(Long id) {
	        reviewMapper.toggleBlind(id);
	    }

}
