package com.project.admin.service;

import java.util.List;

import com.project.admin.model.NoticeAdmin;

public interface NoticeAdminService {
	List<NoticeAdmin> getNotices();
    NoticeAdmin getNoticeById(Long id);
    void addNotice(NoticeAdmin notice);
    void updateNotice(NoticeAdmin notice);
    void deleteNotice(Long id);
}
