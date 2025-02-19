package com.project.admin.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.project.admin.model.NoticeAdmin;

@Mapper
public interface NoticeAdminMapper {
    List<NoticeAdmin> getNotices();
    NoticeAdmin getNoticeById(Long noticeNo);
    void addNotice(NoticeAdmin notice);
    void updateNotice(NoticeAdmin notice);
    void deleteNotice(Long noticeNo);
}
