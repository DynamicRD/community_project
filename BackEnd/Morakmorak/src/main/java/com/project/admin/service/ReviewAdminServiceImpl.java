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
	    public void toggleBlind(Long no) {
	        reviewMapper.toggleBlind(no);
	    }
	    @Override
	    public void toggleBlindYN(Long no) {
	        reviewMapper.toggleBlindYN(no);
	    }
}
