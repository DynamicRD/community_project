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

import com.project.admin.model.FaqAdmin;
import com.project.admin.service.FaqAdminService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin/faqs")
@RequiredArgsConstructor
public class FaqAdminController {
    private final FaqAdminService faqService;

    @GetMapping
    public List<FaqAdmin> getFaqs() {
        return faqService.getFaqs();
    }

    @PostMapping
    public ResponseEntity<Void> addFaq(@RequestBody FaqAdmin faq) {
        faqService.addFaq(faq);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateFaq(@PathVariable Long faqNo, @RequestBody FaqAdmin faq) {
        faq.setFaqNo(faqNo);
        faqService.updateFaq(faq);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFaq(@PathVariable Long faqNo) {
        faqService.deleteFaq(faqNo);
        return ResponseEntity.ok().build();
    }
}