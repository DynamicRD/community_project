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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.admin.model.ReviewAdmin;
import com.project.admin.service.ReviewAdminService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin/reviews")
@RequiredArgsConstructor
public class ReviewAdminController {
    private final ReviewAdminService reviewService;

    @GetMapping("/list")
    public List<ReviewAdmin> getReviews() {
        return reviewService.getReviews();
    }

    @PostMapping("/blind")
    public ResponseEntity<Void> toggleBlind(@RequestParam(name="no") long no ,@RequestParam(name="isblacked") String value) {
        
        if (value.equals("Y")) {
        	reviewService.toggleBlindYN(no);
        } else {
        	reviewService.toggleBlind(no);
        }
        System.out.println(no);
        System.out.println(value);
        return ResponseEntity.ok().build();
    }
}
