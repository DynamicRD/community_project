package com.project.admin.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.admin.model.NoticeAdmin;
import com.project.admin.service.NoticeAdminService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin/notices")
@RequiredArgsConstructor
public class NoticeAdminController {
    private final NoticeAdminService noticeService;

    @GetMapping
    public List<NoticeAdmin> getNotices() {
        return noticeService.getNotices();
    }

    @GetMapping("/{id}")
    public ResponseEntity<NoticeAdmin> getNotice(@PathVariable Long id) {
        return ResponseEntity.ok(noticeService.getNoticeById(id));
    }

    @PostMapping
    public ResponseEntity<Void> addNotice(@RequestBody NoticeAdmin notice) {
        noticeService.addNotice(notice);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateNotice(@PathVariable Long id, @RequestBody NoticeAdmin notice) {
        notice.setId(id);
        noticeService.updateNotice(notice);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotice(@PathVariable Long id) {
        noticeService.deleteNotice(id);
        return ResponseEntity.ok().build();
    }
}