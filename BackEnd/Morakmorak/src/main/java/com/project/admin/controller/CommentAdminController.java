package com.project.admin.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import com.project.admin.model.CommentAdmin;
import com.project.admin.service.CommentAdminService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin/comments")
@RequiredArgsConstructor
public class CommentAdminController {
	private final CommentAdminService commentService;

    @GetMapping("/list")
    public List<CommentAdmin> getComments() {
        return commentService.getComments();
    }

    @PostMapping("/blind")
    public void toggleBlind( @RequestParam(name="no") long no, @RequestParam(name="isblacked") String value) {
      
        System.out.println("no: " + no);
        System.out.println("value: " + value);

        if (value.equals("Y")) {
            commentService.toggleBlindYN(no);
        } else {
            commentService.toggleBlind(no);
        }

    }

}
