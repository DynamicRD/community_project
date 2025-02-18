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

import com.project.admin.model.CommentAdmin;
import com.project.admin.service.CommentAdminService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin/comments")
@RequiredArgsConstructor
public class CommentAdminController {
	private final CommentAdminService commentService;

    @GetMapping
    public List<CommentAdmin> getComments() {
        return commentService.getComments();
    }

    @PostMapping
    public ResponseEntity<Void> addComment(@RequestBody CommentAdmin comment) {
        commentService.addComment(comment);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long id) {
        commentService.deleteComment(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/blind")
    public ResponseEntity<Void> toggleBlind(@PathVariable Long id) {
        commentService.toggleBlind(id);
        return ResponseEntity.ok().build();
    }
}
