package com.project.admin.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.admin.mapper.NoticeAdminMapper;
import com.project.admin.model.NoticeAdmin;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class NoticeAdminServiceImpl implements NoticeAdminService {
    private final NoticeAdminMapper noticeMapper;

    @Override
    public List<NoticeAdmin> getNotices() {
        return noticeMapper.getNotices();
    }

    @Override
    public NoticeAdmin getNoticeById(Long id) {
        return noticeMapper.getNoticeById(id);
    }

    @Override
    public void addNotice(NoticeAdmin notice) {
        noticeMapper.addNotice(notice);
    }

    @Override
    public void updateNotice(NoticeAdmin notice) {
        noticeMapper.updateNotice(notice);
    }

    @Override
    public void deleteNotice(Long id) {
        noticeMapper.deleteNotice(id);
    }
}
