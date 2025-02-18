package com.project.favorite.service;

import java.util.List;
import java.util.Map;

public interface FavoriteService {

	public List<Map<String, Object>> favoriteList(int idx) throws Exception;
	
	public void favoriteUpdateStatus(int idx) throws Exception;
}
