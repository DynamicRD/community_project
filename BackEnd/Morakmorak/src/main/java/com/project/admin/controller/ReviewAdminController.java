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

import com.project.admin.model.ReviewAdmin;
import com.project.admin.service.ReviewAdminService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin/reviews")
@RequiredArgsConstructor
public class ReviewAdminController {
    private final ReviewAdminService reviewService;

    @GetMapping
    public List<ReviewAdmin> getReviews() {
        return reviewService.getReviews();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReviewAdmin> getReview(@PathVariable Long no) {
        return ResponseEntity.ok(reviewService.getReviewById(no));
    }

    @PostMapping
    public ResponseEntity<Void> addReview(@RequestBody ReviewAdmin review) {
        reviewService.addReview(review);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateReview(@PathVariable Long no, @RequestBody ReviewAdmin review) {
        review.setNo(no);
        reviewService.updateReview(review);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long no) {
        reviewService.deleteReview(no);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/blind")
    public ResponseEntity<Void> toggleBlind(@PathVariable Long no) {
        reviewService.toggleBlind(no);
        return ResponseEntity.ok().build();
    }
}
