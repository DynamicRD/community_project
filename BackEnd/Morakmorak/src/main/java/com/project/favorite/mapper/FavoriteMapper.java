package com.project.favorite.mapper;

import java.util.List;
import java.util.Map;

public interface FavoriteMapper {

	public List<Map<String, Object>> favoriteList(int idx) throws Exception;

	public void favoriteUpdateStatus(int idx) throws Exception;

}
