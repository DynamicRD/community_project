package com.project.favorite.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.favorite.mapper.FavoriteMapper;

@Service
public class FavoriteServiceImpl implements FavoriteService {

	@Autowired
	private FavoriteMapper mapper;

	@Override
	public List<Map<String, Object>> favoriteList(int idx) throws Exception {
		List<Map<String, Object>> result = mapper.favoriteList(idx);
		return result;

	}

	@Override
	public void favoriteUpdateStatus(int idx) throws Exception {
		mapper.favoriteUpdateStatus(idx);

	}
}
