package com.project.admin.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.project.admin.model.FaqAdmin;

@Mapper
public interface FaqAdminMapper {
	List<FaqAdmin> getFaqs();

	void addFaq(FaqAdmin faq);

	void updateFaq(FaqAdmin faq);

	void deleteFaq(Long faqNo);
}
