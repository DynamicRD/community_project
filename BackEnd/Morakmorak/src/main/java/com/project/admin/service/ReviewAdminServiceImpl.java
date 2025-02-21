package com.project.admin.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.admin.mapper.ReviewAdminMapper;
import com.project.admin.model.ReviewAdmin;
import com.project.mypage.mapper.MypageMapper;
import com.project.mypage.model.Notification;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewAdminServiceImpl implements ReviewAdminService {
	@Autowired
	ReviewAdminMapper reviewMapper;
	@Autowired
	MypageMapper mypageMapper;
	
	
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
	    	Notification notification = new Notification();
	    	int mNo = mypageMapper.selectNoByRno(no);
	    	String title = mypageMapper.selectReviewTitleByNo(no);
	    	notification.setNo(mNo);
	    	notification.setContent("리뷰 "+title+"가 블랙처리 됐습니다.");
	    	mypageMapper.insertNotification(notification);
	        reviewMapper.toggleBlindYN(no);
	    }
}
