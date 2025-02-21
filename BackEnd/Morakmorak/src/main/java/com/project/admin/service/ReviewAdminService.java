package com.project.admin.service;

import java.util.List;

import com.project.admin.model.ReviewAdmin;

public interface ReviewAdminService {
	List<ReviewAdmin> getReviews();
    void toggleBlind(Long no);
    void toggleBlindYN(Long no);

}
