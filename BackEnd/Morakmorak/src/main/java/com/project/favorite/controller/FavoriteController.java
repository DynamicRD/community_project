package com.project.favorite.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.project.favorite.service.FavoriteService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class FavoriteController {

	@Autowired
	private FavoriteService service;

	@GetMapping("/favorites/{idx}")
	public List<Map<String, Object>> favoriteList(@PathVariable(name = "idx") int idx) throws Exception {
		List<Map<String, Object>> listMap = service.favoriteList(idx);
		return listMap;
	}

	@GetMapping("/favorites/delete/{idx}")
	public void favoriteUpdateStatus(@PathVariable(name = "idx") int idx) throws Exception {
		service.favoriteUpdateStatus(idx);
	}
}
