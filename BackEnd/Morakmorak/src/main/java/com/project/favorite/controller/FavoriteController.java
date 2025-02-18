package com.project.favorite.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.favorite.service.FavoriteService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class FavoriteController {

	@Autowired
	private FavoriteService service;

	@GetMapping("/favorites")
	public List<Map<String, Object>> favoriteList() throws Exception {
		return service.favoriteList();
	}
}
