package com.project.mypage.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.mypage.model.TransactionLog;
import com.project.mypage.service.MypageService;
import com.project.mypage.service.MypageServiceImpl;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/mypage")
@CrossOrigin
public class MypageController {
	@Autowired
	private MypageService service;

    @GetMapping("/transactionHistory")
    public ResponseEntity<List<TransactionLog>> getUserCoinHistory(@RequestParam("no") int no) {
        List<TransactionLog> historyList = service.selectTransactionLog(no);
        return ResponseEntity.ok(historyList);
    }

}
